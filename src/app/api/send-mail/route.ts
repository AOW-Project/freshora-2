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
    const customerEmailHTML = `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Pickup Confirmation - Freshora Laundry</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
                  
                  <!-- Header with Logo -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                      <img 
  src="https://freshoralaundry.com/images/F.png" 
  alt="Freshora Laundry" 
  style="max-width:200px;height:auto;margin-bottom:15px;filter:brightness(0) invert(1);"
/>

                      <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Pickup Confirmed!</h1>
                      <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Your laundry pickup has been scheduled</p>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 22px;">Hello ${name}!</h2>
                      <p style="color: #4b5563; line-height: 1.6; margin: 0 0 25px 0; font-size: 16px;">
                        Thank you for choosing Freshora Laundry! We've received your pickup request and our team will be at your location as scheduled.
                      </p>

                      <!-- Pickup Details -->
                      <div style="background-color: #f9fafb; border-radius: 8px; padding: 25px; margin: 25px 0;">
                        <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px; display: flex; align-items: center;">
                          📅 Service Details
                        </h3>
                        <table width="100%" cellpadding="8" cellspacing="0">
                          <tr>
                            <td style="color: #6b7280; font-weight: 500; width: 120px;">Pickup Date:</td>
                            <td style="color: #1f2937; font-weight: 600;">${date}</td>
                          </tr>
                          <tr>
                            <td style="color: #6b7280; font-weight: 500;">Delivery Date:</td>
                            <td style="color: #1f2937; font-weight: 600;">${time}</td>
                          </tr>
                          <tr>
                            <td style="color: #6b7280; font-weight: 500;">Address:</td>
                            <td style="color: #1f2937; font-weight: 600;">${address}</td>
                          </tr>
                          ${
                            comment
                              ? `
                          <tr>
                            <td style="color: #6b7280; font-weight: 500;">Notes:</td>
                            <td style="color: #1f2937; font-weight: 600;">${comment}</td>
                          </tr>
                          `
                              : ""
                          }
                        </table>
                      </div>

                      <!-- Contact Info -->
                      <div style="background-color: #eff6ff; border-radius: 8px; padding: 20px; margin: 25px 0;">
                        <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px;">Need to make changes?</h3>
                        <p style="color: #1e40af; margin: 0; font-size: 14px;">
                          Call us at <strong>+971 50 925 9667</strong> or email <strong>freshorappc@gmail.com</strong>
                        </p>
                      </div>

                      <p style="color: #4b5563; line-height: 1.6; margin: 20px 0 0 0; font-size: 14px;">
                        We appreciate your business and look forward to providing you with excellent laundry service!
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                      <div style="margin-bottom: 20px;">
                        <a href="#" style="display: inline-block; margin: 0 10px; text-decoration: none;">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="#4b5563">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                          </svg>
                        </a>
                        <a href="#" style="display: inline-block; margin: 0 10px; text-decoration: none;">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="#4b5563">
                            <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                          </svg>
                        </a>
                        <a href="#" style="display: inline-block; margin: 0 10px; text-decoration: none;">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="#4b5563">
                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                          </svg>
                        </a>
                      </div>
                      <p style="color: #6b7280; margin: 0; font-size: 14px;">
                        © 2024 Freshora Laundry. All rights reserved.<br>
                        123 Clean Street, Fresh City, FC 12345
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `

    // Email HTML for business
    const businessEmailHTML = `
      <h2>New Pickup Request</h2>
      <p>New pickup request details:</p>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Address:</strong> ${address}</li>
        <li><strong>Service:</strong> ${service}</li>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Time:</strong> ${time}</li>
      </ul>
    `;

    // Send customer confirmation email
await transporter.sendMail({
  from: `"Freshora Laundry" <freshorappc@gmail.com>`,
  to: email, // customer's email
  subject: "Pickup Confirmation - Freshora Laundry",
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
