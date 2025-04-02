import { connectToDatabase } from "@/lib/db";
import { authMiddleware } from "@/middleware/auth";
import { ObjectId } from "mongodb";
import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});
redisClient.connect().catch(console.error);

async function handler(req, res) {
  const { db } = await connectToDatabase();
  const user = req.user;

  if (req.method === "GET") {
    try {
      const cacheKey = `notifications:${user.id}`;
      const cachedNotifications = await redisClient.get(cacheKey);

      if (cachedNotifications) {
        return res.status(200).json({ notifications: JSON.parse(cachedNotifications) });
      }

      const notifications = await db
        .collection("notifications")
        .find({ recipientId: user.id })
        .sort({ createdAt: -1 })
        .toArray();

      await redisClient.setEx(cacheKey, 60, JSON.stringify(notifications));
      res.status(200).json({ notifications });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  } else if (req.method === "POST") {
    try {
      const { message, type, recipientId, relatedId } = req.body;
      const notification = {
        message,
        type,
        recipientId,
        relatedId: relatedId || null,
        isRead: false,
        createdAt: new Date(),
      };
      const result = await db.collection("notifications").insertOne(notification);

      // Publish to Redis channel
      const notificationWithId = {
        ...notification,
        _id: result.insertedId.toString(),
      };
      await global.redisPublisher.publish(
        `notifications:${recipientId}`,
        JSON.stringify(notificationWithId)
      );

      // Invalidate cache
      const cacheKey = `notifications:${recipientId}`;
      await redisClient.del(cacheKey);

      res.status(201).json({ message: "Notification created" });
    } catch (error) {
      res.status(500).json({ message: "Failed to create notification" });
    }
  } else if (req.method === "PUT") {
    try {
      const { notificationId, markAll } = req.body;
      if (markAll) {
        await db.collection("notifications").updateMany(
          { recipientId: user.id, isRead: false },
          { $set: { isRead: true, readAt: new Date() } }
        );
      } else {
        await db.collection("notifications").updateOne(
          { _id: new ObjectId(notificationId), recipientId: user.id },
          { $set: { isRead: true, readAt: new Date() } }
        );
      }

      // Invalidate cache
      const cacheKey = `notifications:${user.id}`;
      await redisClient.del(cacheKey);

      // Fetch updated notifications and publish to Redis
      const updatedNotifications = await db
        .collection("notifications")
        .find({ recipientId: user.id })
        .sort({ createdAt: -1 })
        .toArray();
      await global.redisPublisher.publish(
        `notifications:${user.id}`,
        JSON.stringify({ type: "update", data: updatedNotifications })
      );

      res.status(200).json({ message: "Notification updated" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update notification" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { clearAll } = req.body;
      if (clearAll) {
        await db.collection("notifications").deleteMany({ recipientId: user.id });

        // Invalidate cache
        const cacheKey = `notifications:${user.id}`;
        await redisClient.del(cacheKey);

        // Publish clear event
        await global.redisPublisher.publish(
          `notifications:${user.id}`,
          JSON.stringify({ type: "clear" })
        );

        res.status(200).json({ message: "All notifications cleared" });
      } else {
        res.status(400).json({ message: "Invalid request" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to clear notifications" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export default authMiddleware(handler);