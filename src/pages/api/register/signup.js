

import { connectToDatabase } from "@/lib/db";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const { db } = await connectToDatabase();

    // Check if a user with this email already exists in the users collection
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Delete the OTP from the otps collection (already verified)
    await db.collection("otps").deleteOne({ email });

    // Create the user in the users collection
    const userCount = await db.collection("users").countDocuments();
    const role = userCount === 0 ? "superadmin" : "user";
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.collection("users").insertOne({
      email,
      username,
      password: hashedPassword,
      role,
      otp: "0",
      otpExpiresAt: null,
      refreshToken: "0",
      refreshTokenExpiresAt: null,
      createdAt: new Date(),
    });

    const userId = newUser.insertedId.toString();

    res.status(201).json({ message: "User registered successfully", userId, role });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Failed to register user", error: error.message });
  }
}