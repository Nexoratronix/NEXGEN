import { connectToDatabase } from "@/lib/db";
import { sendOTP } from "@/lib/email";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, username } = req.body;
  console.log("Received request:", { email, username });

  if (!email) {
    return res.status(400).json({ message: "Email and username are required" });
  }

  try {
    const { db } = await connectToDatabase();
    console.log("DB connected");

    // Check if a user with this email already exists in the users collection
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Check if an OTP already exists for this email in the otps collection
    const existingOtp = await db.collection("otps").findOne({ email });
    if (existingOtp) {
      // Optionally, you can delete the existing OTP and generate a new one
      await db.collection("otps").deleteOne({ email });
    }

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Insert OTP into the otps collection
    await db.collection("otps").insertOne({
      email,
      username,
      otp: generatedOtp,
      otpExpiresAt: otpExpiry,
      createdAt: new Date(),
    });

    await sendOTP(email, generatedOtp);
    console.log("OTP sent and stored:", generatedOtp);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({ message: "Failed to send OTP", error: error.message });
  }
}