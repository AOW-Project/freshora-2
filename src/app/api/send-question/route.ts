import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, question } = await req.json();

    if (!name || !email || !phone || !question) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
    }

    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "freshorappc@gmail.com",  // your email
        pass: process.env.EMAIL_PASS || "ykbl euac vysy dpta", // app password
      },
    });

    // Mail content
await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_TO || process.env.EMAIL_USER || "freshorappc@gmail.com", // ✅ fallback
  subject: "New Question from Website",
  text: `
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Question: ${question}
  `,
});


    return NextResponse.json({ success: true, message: "Question sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 });
  }
}
