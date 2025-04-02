
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOTP(email, otp) {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Your OTP for NEXGEN Staffing Registration",
    text: `Your OTP is: ${otp}. It expires in 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
}



// New function for password reset email
export const sendPasswordResetEmail = async (email, otp, userName = "User") => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Password Reset OTP - NEXGEN Staffing",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Password Reset Request</h2>
        <p>Hello ${userName},</p>
        <p>We received a request to reset your password for your NEXGEN Staffing account.</p>
        <p>Your OTP is: <strong>${otp}</strong>. It expires in 10 minutes.</p>
        <p>Please go to the reset password page on our website, enter this OTP, and set your new password.</p>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Best regards,<br />The NEXGEN Staffing Team</p>
      </div>
    `,
  };

  try {
    console.log("Attempting to send email to:", email);
    console.log("Mail options:", mailOptions);
    const info = await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${email}. Message ID: ${info.messageId}`);
  } catch (error) {
    console.error("Error sending password reset email:", error.message);
    console.error("Error details:", error);
    throw new Error("Failed to send password reset email");
  }
};