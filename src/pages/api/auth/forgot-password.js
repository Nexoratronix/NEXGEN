// import { connectToDatabase } from "@/lib/db";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   const { token, password } = req.body;

//   // Validate input
//   if (!token || !password) {
//     return res.status(400).json({ message: "Token and password are required" });
//   }

//   if (password.length < 6) {
//     return res.status(400).json({ message: "Password must be at least 6 characters long" });
//   }

//   try {
//     // Verify the token
//     const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
//     const { userId, email } = decoded;

//     // Connect to the database
//     const { db } = await connectToDatabase();

//     // Find the reset token in the passwordResetTokens collection
//     const resetToken = await db.collection("passwordResetTokens").findOne({
//       userId,
//       token,
//       tokenExpiresAt: { $gt: new Date() }, // Ensure token hasn't expired
//     });

//     if (!resetToken) {
//       return res.status(400).json({ message: "Invalid or expired reset token" });
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Update the user's password in the users collection
//     await db.collection("users").updateOne(
//       { _id: userId },
//       {
//         $set: {
//           password: hashedPassword,
//         },
//       }
//     );

//     // Delete the used reset token
//     await db.collection("passwordResetTokens").deleteOne({ token });

//     res.status(200).json({ message: "Password reset successfully" });
//   } catch (error) {
//     if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
//       return res.status(400).json({ message: "Invalid or expired reset token" });
//     }
//     console.error("Error in reset-password API:", error.message);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// }
import { connectToDatabase } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/email";

// Simple in-memory rate limiter
const rateLimit = new Map();
const RATE_LIMIT_REQUESTS = 5; // Max requests per window
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes

// Retry logic for MongoDB connection
async function connectWithRetry(maxRetries = 3, retryDelay = 2000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt} to connect to MongoDB...`);
      const { db } = await connectToDatabase();
      console.log("DB connected successfully");
      return db;
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error.message);
      if (attempt === maxRetries) {
        throw new Error("Failed to connect to MongoDB after maximum retries");
      }
      console.log(`Retrying in ${retryDelay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;
  console.log("Received request to /api/auth/forgot-password:", { email });

  // Rate limiting
  const now = Date.now();
  const userRequests = rateLimit.get(email) || { count: 0, startTime: now };
  if (now - userRequests.startTime > RATE_LIMIT_WINDOW) {
    userRequests.count = 0;
    userRequests.startTime = now;
  }
  userRequests.count += 1;
  rateLimit.set(email, userRequests);

  if (userRequests.count > RATE_LIMIT_REQUESTS) {
    console.log("Rate limit exceeded for email:", email);
    return res.status(429).json({ message: "Too many requests. Please try again later." });
  }

  // Validate email
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.log("Validation failed: Invalid email");
    return res.status(400).json({ message: "Please provide a valid email address" });
  }

  try {
    const db = await connectWithRetry();

    const user = await db.collection("users").findOne({ email });
    if (!user) {
      console.log("User not found, returning generic response for security");
      return res.status(400).json({ message: "User with this email does not exist" });
    }

    console.log("Checking for existing OTP...");
    const existingOtp = await db.collection("otps").findOne({ email });
    if (existingOtp) {
      console.log("Existing OTP found, deleting it...");
      await db.collection("otps").deleteOne({ email });
    }

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    await db.collection("otps").insertOne({
      email,
      username: user.name || "User",
      otp: generatedOtp,
      otpExpiresAt: otpExpiry,
      createdAt: new Date(),
      purpose: "password-reset",
    });
    console.log("OTP generated and stored:", generatedOtp);

    console.log("Sending OTP email to:", email);
    await sendPasswordResetEmail(email, generatedOtp, user.name || "User");

    res.status(200).json({ message: "If the email exists, an OTP has been sent." });
  } catch (error) {
    console.error("Error in forgot-password API:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}