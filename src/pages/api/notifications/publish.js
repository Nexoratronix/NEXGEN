import { createClient } from "redis";

const redisPublisher = createClient({
  url: process.env.REDIS_URL,
});

redisPublisher.on("error", (err) => console.error("Redis publisher error:", err));
redisPublisher.connect();

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId, message, type, relatedId } = req.body;
  if (!userId || !message) {
    return res.status(400).json({ error: "Missing userId or message" });
  }

  try {
    const notification = {
      message,
      type: type || "custom",
      recipientId: userId,
      relatedId: relatedId || null,
      isRead: false,
      createdAt: new Date().toISOString(),
      _id: Date.now().toString(), // Match index.js format
    };
    await redisPublisher.publish(`notifications:${userId}`, JSON.stringify(notification));
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error publishing notification:", error);
    res.status(500).json({ error: "Failed to publish notification" });
  }
};

export default handler;