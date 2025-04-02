import jwt from "jsonwebtoken";

export function authMiddleware(handler) {
  return async (req, res) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.NEXTAUTH_SECRET);
      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}