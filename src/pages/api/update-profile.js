import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/lib/db";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.NEXTAUTH_SECRET);
    if (!decoded.id) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    if (decoded.role !== "superadmin") {
      return res.status(403).json({ message: "Only superadmins can update roles" });
    }

    const { userId, newRole } = req.body;
    if (!userId || !newRole || !["user", "admin", "superadmin"].includes(newRole)) {
      return res.status(400).json({ message: "Valid userId and newRole (user, admin, superadmin) are required" });
    }

    const { db } = await connectToDatabase();
    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      { $set: { role: newRole } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Role updated successfully", userId, newRole });
  } catch (error) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}