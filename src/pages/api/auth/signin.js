import { connectToDatabase } from "../../../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { serialize } from "cookie";
import { ObjectId } from "mongodb";
import { createClient } from "redis";
import { setSession } from "../../../lib/session";
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const { db } = await connectToDatabase();
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "No user found with this email" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const refreshToken = nanoid(32);
    const refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const accessToken = jwt.sign(
      { id: user._id.toString(), email: user.email, role: user.role, username: user.username, },
      process.env.NEXTAUTH_SECRET,
      { expiresIn: "15m" }
    );

    await db.collection("users").updateOne(
      { _id: new ObjectId(user._id) },
      { $set: { refreshToken, refreshTokenExpiresAt: refreshTokenExpiry } }
    );

    const cookies = [
      serialize("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 15 * 60,
      }),
      serialize("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      }),
    ];
    // Create sign-in notification
    const notification = {
      message: `You have successfully signed in as ${user.role}`,
      type: "sign-in",
      recipientId: user._id.toString(),
      relatedId: null,
      isRead: false,
      createdAt: new Date(),
    };
    const result = await db.collection("notifications").insertOne(notification);

    // Publish to Redis
    const redisPublisher = createClient({ url: process.env.REDIS_URL });
    redisPublisher.on("error", (err) => console.error("Redis publisher error:", err));
    await redisPublisher.connect();
    try {
      await redisPublisher.publish(
        `notifications:${user._id.toString()}`,
        JSON.stringify({
          ...notification,
          _id: result.insertedId.toString(),
        })
      );
    } catch (error) {
      console.warn("Failed to publish notification to Redis:", error);
    } finally {
      await redisPublisher.disconnect();
    }

    res.setHeader("Set-Cookie", cookies);
    return res.status(200).json({
      message: "Sign-in successful",
      accessToken,
      refreshToken,
      role: user.role,
      username: user.username,
      expiresIn: 15 * 60,
    });
  } catch (error) {
    console.error("Sign-in error:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }


}