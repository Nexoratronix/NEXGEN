import { connectToDatabase } from "../../../lib/db";
import { serialize } from "cookie";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    // If no refreshToken is found, still clear the cookies to ensure a clean sign-out
    const cookies = [
      serialize("accessToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 0,
      }),
      serialize("refreshToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 0,
      }),
    ];

    res.setHeader("Set-Cookie", cookies);
    return res.status(200).json({ message: "Sign-out successful (no active session)" });
  }

  try {
    const { db } = await connectToDatabase();

    // Find the user by refreshToken
    const user = await db.collection("users").findOne({ refreshToken });
    if (!user) {
      // If no user is found, still clear the cookies
      const cookies = [
        serialize("accessToken", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          maxAge: 0,
        }),
        serialize("refreshToken", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          maxAge: 0,
        }),
      ];

      res.setHeader("Set-Cookie", cookies);
      return res.status(200).json({ message: "Sign-out successful (invalid session)" });
    }

    // Clear the refresh token in the database
    await db.collection("users").updateOne(
      { _id: new ObjectId(user._id) },
      { $set: { refreshToken: null, refreshTokenExpiresAt: null } }
    );

   
    const cookies = [
      serialize("accessToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 0,
      }),
      serialize("refreshToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 0,
      }),
    ];

    res.setHeader("Set-Cookie", cookies);
    return res.status(200).json({ message: "Sign-out successful" });
  } catch (error) {
    console.error("Sign-out error:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}