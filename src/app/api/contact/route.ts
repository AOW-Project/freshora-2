import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, address, service, date, time, comment } =
      await req.json();

    // Create a test SMTP account from ethereal.email
    const testAccount = await nodemailer.createTestAccount();

    // Create reusable transporter object using the test account SMTP
const transporter = nodemailer.createTransport({
       service: "gmail",                                                                          //lczr wrpu dtld mmht
      auth: {
    user: "mondalrohan201@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD || "lczr wrpu dtld mmht", // store in .env
  },
    });

    // Email HTML for customer
 // Email HTML for customer
const customerEmailHTML = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thanks for Contacting Freshora Laundry</title>
  </head>
  <body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background-color:#f8fafc;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;padding:20px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:white;border-radius:12px;box-shadow:0 4px 6px rgba(0,0,0,0.1);overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:40px 30px;text-align:center;">
                <img 
  src="https://freshoralaundry.com/images/F.png" 
  alt="Freshora Laundry" 
  style="max-width:200px;height:auto;margin-bottom:15px;filter:brightness(0) invert(1);"
/>

                <h1 style="color:white;margin:0;font-size:26px;font-weight:600;">Thanks for Reaching Out!</h1>
                <p style="color:rgba(255,255,255,0.9);margin:10px 0 0 0;font-size:16px;">We’ve received your message</p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:40px 30px;">
                <h2 style="color:#1f2937;margin:0 0 20px 0;font-size:20px;">Hello ${name},</h2>
                <p style="color:#4b5563;line-height:1.6;margin:0 0 20px 0;font-size:16px;">
                  Thank you for contacting <strong>Freshora Laundry</strong>. Our team has received your message and will get back to you as soon as possible.
                </p>

                <div style="background-color:#f9fafb;border-radius:8px;padding:20px;margin:20px 0;">
                  <h3 style="color:#1f2937;margin:0 0 10px 0;font-size:18px;">Your Message</h3>
                  <p style="color:#1f2937;margin:0;font-size:15px;">"${comment || "No message provided"}"</p>
                </div>

                <p style="color:#4b5563;line-height:1.6;margin:20px 0 0 0;font-size:14px;">
                  If your request is urgent, feel free to call us at <strong>+971 50 925 9667</strong> or reply directly to this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color:#f9fafb;padding:25px;text-align:center;border-top:1px solid #e5e7eb;">
                <p style="color:#6b7280;margin:0;font-size:13px;">
                  © 2024 Freshora Laundry<br>
                  Making laundry easy, fresh, and stress-free.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

    // Email HTML for business
// Email HTML for business
const businessEmailHTML = `
  <h2>New Contact Form Submission</h2>
  <p>You have received a new inquiry:</p>
  <ul>
    <li><strong>Name:</strong> ${name}</li>
    <li><strong>Email:</strong> ${email}</li>
    <li><strong>Phone:</strong> ${phone}</li>
    <li><strong>Address:</strong> ${address || "Not provided"}</li>
    <li><strong>Service Interested:</strong> ${service || "General Inquiry"}</li>
    <li><strong>Message:</strong> ${comment || "No message provided"}</li>
  </ul>
`;


    // Send customer confirmation email
await transporter.sendMail({
  from: `"Freshora Laundry" <freshorappc@gmail.com>`,
  to: email, // customer's email
  subject: "Get In Touch - Freshora Laundry",
  html: customerEmailHTML,
})

    // Send business notification email
await transporter.sendMail({
  from: `"Freshora Laundry" <freshorappc@gmail.com>`,
  to: "freshorappc@gmail.com", // business inbox
  subject: `New Pickup Request from ${name}`,
  html: businessEmailHTML,
});

    console.log("Preview URL (Customer):", nodemailer.getTestMessageUrl);
    console.log("Preview URL (Business):", nodemailer.getTestMessageUrl);

    return NextResponse.json({
      success: true,
      message: "Emails sent successfully!",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Email sending error:", error.message);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    } else {
      console.error("Unexpected error:", error);
      return NextResponse.json(
        { success: false, message: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
}

