import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const {
      name,
      email,
      phonenumber,
      modalAddress,
      service,
      datePickUp,
      dateDelivery,
      message,
    } = data;

    // Replace your transporter code for local testing:
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // Email content
    const mailOptions = {
      from: `"ProLaundry" <${process.env.EMAIL_SERVER_USER}>`, // Sender address
      to: 'freshorappc@gmail.com', // List of receivers (where you want to receive the form data)
      subject: 'New Pickup Scheduled from ProLaundry Website', // Subject line
      html: `
        <h1>New Pickup Request</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phonenumber}</p>
        <p><strong>Address:</strong> ${modalAddress}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Pickup Date:</strong> ${datePickUp}</p>
        <p><strong>Delivery Date:</strong> ${dateDelivery}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // Send the email
    // await transporter.sendMail(mailOptions); // Comment out
    return NextResponse.json({ message: 'Email sent successfully! (mock)' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An error occurred.' }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}