import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "GET") {
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

    res.status(200).json({ role: decoded.role });
  } catch (error) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
    console.error("Check role error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}