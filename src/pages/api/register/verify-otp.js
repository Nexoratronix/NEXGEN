// import { connectToDatabase } from "../../../lib/db";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   const { email, otp } = req.body;

//   if (!otp) {
//     return res.status(400).json({ message: "Email and OTP are required" });
//   }

//   try {
//     const { db } = await connectToDatabase();

//     // Check the OTP in the otps collection
//     const otpDoc = await db.collection("otps").findOne({ email });
//     if (!otpDoc || otpDoc.otp !== otp || !otpDoc.otpExpiresAt || new Date() > new Date(otpDoc.otpExpiresAt)) {
//       return res.status(400).json({ message: "Invalid or expired OTP" });
//     }

//     res.status(200).json({ message: "OTP verified successfully" });
//   } catch (error) {
//     console.error("Verify OTP error:", error);
//     res.status(500).json({ message: "Failed to verify OTP", error: error.message });
//   }
// }
import { connectToDatabase } from "../../../lib/db";

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

  const { email, otp, purpose = "signup" } = req.body;
  console.log("Received request to /api/register/verify-otp:", { email, otp, purpose });

  // Validate input
  if ( !otp) {
    console.log("Validation failed:  OTP are required");
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    // Connect to the database with retry logic
    const db = await connectWithRetry();

    // Check the OTP in the otps collection
    console.log("Verifying OTP for email:", email, "with purpose:", purpose);
    const otpDoc = await db.collection("otps").findOne({
      email,
      otp,
      purpose, 
      otpExpiresAt: { $gt: new Date() }, 
    });

    if (!otp ) {
      console.log("OTP verification failed: Invalid or expired OTP");
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // For signup, we just verify the OTP and let the frontend proceed with registration
    res.status(200).json({ message: "OTP verified successfully", purpose });
  } catch (error) {
    console.error("Verify OTP error:", error.message);
    res.status(500).json({ message: "Failed to verify OTP", error: error.message });
  }
}