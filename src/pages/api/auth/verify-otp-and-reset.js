import { connectToDatabase } from "@/lib/db";
import bcrypt from "bcryptjs";

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

  const { email, otp, password } = req.body;
  console.log("Received request to /api/auth/verify-otp-and-reset:", { email, otp });

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

  // Validate input
  if (!otp ) {
    console.log("Validation failed: Missing fields");
    return res.status(400).json({ message: "OTP" });
  }

  // Stricter password requirements
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    console.log("Validation failed: Password does not meet requirements");
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)",
    });
  }

  try {
    // Connect to the database with retry logic
    const db = await connectWithRetry();

    // Verify the OTP
    console.log("Verifying OTP for email:", email);
    const otpRecord = await db.collection("otps").findOne({
      email,
      otp,
      purpose: "password-reset",
      otpExpiresAt: { $gt: new Date() },
    });

    if (!otpRecord) {
      console.log("OTP verification failed: Invalid or expired OTP");
      return res.status(400).json({ message: "Invalid  or expired OTP" });
    }

    // Find the user
    console.log("Finding user with email:", email);
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      console.log("User not found after OTP verification");
      return res.status(400).json({ message: "User not found" });
    }

    // Hash the new password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("New password hashed");

    // Update the user's password in the users collection
    await db.collection("users").updateOne(
      { email },
      {
        $set: {
          password: hashedPassword,
          updatedAt: new Date(),
        },
      }
    );
    console.log("User password updated in database");

    // Delete the OTP record
    await db.collection("otps").deleteOne({ email, otp, purpose: "password-reset" });
    console.log("OTP record deleted");

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in verify-otp-and-reset API:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}