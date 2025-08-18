import { type NextRequest, NextResponse } from "next/server";
import pool from "../../../lib/db";
import { sendOtpSms } from "../../../lib/sms";
import type { OkPacket } from "mysql2"; // ✅ use proper MySQL result type

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export async function POST(req: NextRequest) {
  try {
    const body: { mobile?: string } = await req.json();
    const { mobile } = body;

    if (!mobile) {
      return NextResponse.json({ message: "Mobile number is required" }, { status: 400 });
    }

    const mobileRegex = /^[6-9]\d{9}$/; // Indian mobile number format
    if (!mobileRegex.test(mobile.replace(/^\+91/, ""))) {
      return NextResponse.json(
        { message: "Please enter a valid 10-digit mobile number" },
        { status: 400 }
      );
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    console.log("[v0] Testing database connection...");
    console.log("[v0] DB Config:", {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || "3306",
      user: process.env.DB_USER || "root",
      database: process.env.DB_NAME,
      hasPassword: !!process.env.DB_PASS,
    });

    let connection: Awaited<ReturnType<typeof pool.getConnection>> | null = null;
    let dbStorageSuccess = false;

    try {
      connection = await pool.getConnection();
      console.log("[v0] Database connection acquired successfully");

      await connection.query(`
        CREATE TABLE IF NOT EXISTS otp_codes (
          id INT AUTO_INCREMENT PRIMARY KEY,
          mobile VARCHAR(15) NOT NULL,
          otp VARCHAR(6) NOT NULL,
          expires_at DATETIME NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_mobile (mobile),
          INDEX idx_expires_at (expires_at)
        )
      `);
      console.log("[v0] otp_codes table verified/created");

      await connection.query("DELETE FROM otp_codes WHERE mobile = ?", [mobile]);
      console.log("[v0] Cleared existing OTPs for mobile:", mobile);

      const [result] = await connection.query<OkPacket>(
        "INSERT INTO otp_codes (mobile, otp, expires_at) VALUES (?, ?, ?)",
        [mobile, otp, expiresAt]
      );

      dbStorageSuccess = true;
      console.log("[v0] OTP stored in database successfully:", {
        mobile,
        otp,
        insertId: result.insertId, // ✅ typed, no any
        expiresAt: expiresAt.toISOString(),
      });
    } catch (dbError: unknown) {
      console.error("[v0] Database operation failed:", dbError);
      dbStorageSuccess = false;
    } finally {
      if (connection) {
        connection.release();
        console.log("[v0] Database connection released");
      }
    }

    if (!dbStorageSuccess) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to store OTP in database. Please try again.",
          error:
            process.env.NODE_ENV === "development"
              ? "Database connection or query failed"
              : undefined,
        },
        { status: 500 }
      );
    }

    let smsStatus = false;
    let smsError: string | null = null;

    try {
      smsStatus = await sendOtpSms(mobile, otp);
      console.log("[v0] SMS sending result:", smsStatus);
    } catch (smsErr: unknown) {
      console.error("[v0] SMS sending failed:", smsErr);
      smsError = smsErr instanceof Error ? smsErr.message : String(smsErr);
      // Don't throw error - OTP is already stored in database
    }

    return NextResponse.json({
      success: true,
      message: smsStatus
        ? "OTP sent successfully"
        : "OTP generated and stored. SMS may be delayed - check your phone or try again.",
      debug:
        process.env.NODE_ENV === "development"
          ? {
              otp,
              smsStatus,
              smsError,
              expiresAt: expiresAt.toISOString(),
              dbStored: dbStorageSuccess,
            }
          : undefined,
    });
  } catch (err: unknown) {
    console.error("[v0] API Error:", err);

    let errorMessage = "Unknown error";
    let errorCode = "UNKNOWN";

    if (err instanceof Error) {
      errorMessage = err.message;
      errorCode = (err as { code?: string }).code ?? "UNKNOWN";
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate OTP. Please check database connection.",
        error:
          process.env.NODE_ENV === "development"
            ? {
                message: errorMessage,
                code: errorCode,
                details:
                  "Make sure MySQL server is running and environment variables are set correctly",
              }
            : undefined,
      },
      { status: 500 }
    );
  }
}
