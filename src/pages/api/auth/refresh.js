
import { connectToDatabase } from "../../../lib/db";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { ObjectId } from "mongodb";
import { nanoid } from "nanoid";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const refreshToken = req.body.refreshToken || req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token required" });
  }

  try {
    const { db } = await connectToDatabase();
    const user = await db.collection("users").findOne({
      refreshToken,
      refreshTokenExpiresAt: { $gt: new Date() },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid or expired refresh token" });
    }

    const newAccessToken = jwt.sign(
      { id: user._id.toString(), email: user.email, role: user.role },
      process.env.NEXTAUTH_SECRET,
      { expiresIn: "15m" }
    );
    const newRefreshToken = nanoid(32);
    const refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await db.collection("users").updateOne(
      { _id: new ObjectId(user._id) },
      { $set: { refreshToken: newRefreshToken, refreshTokenExpiresAt: refreshTokenExpiry } }
    );

    const cookies = [
      serialize("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 15 * 60,
      }),
      serialize("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      }),
    ];

    res.setHeader("Set-Cookie", cookies);
    return res.status(200).json({
      message: "Token refreshed successfully",
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      expiresIn: 15 * 60,
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    return res.status(500).json({ message: "Failed to refresh token", error: error.message });
  }
}