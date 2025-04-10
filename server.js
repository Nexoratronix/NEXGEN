

const { createServer } = require("http");
const { Server } = require("socket.io");
const next = require("next");
const { createClient } = require("redis");
const { parse } = require("url");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Initialize Redis clients
const redisClient = require("redis").createClient({
  host: "localhost",
  port: 6379,
});

// app.use(
//   session({
//     store: new RedisStore({ client: redisClient }),
//     secret: "your-secret",
//     resave: false,
//     saveUninitialized: false,
//   })
// );
const redisPublisher = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});
const redisSubscriber = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

// Handle Redis connection errors
redisPublisher.on("error", (error) => {
  console.error("Redis publisher error:", error);
});

redisSubscriber.on("error", (error) => {
  console.error("Redis subscriber error:", error);
});

// Wait for Redis connections to be established
const connectRedis = async () => {
  try {
    await redisPublisher.connect();
    console.log("Redis publisher connected successfully");
  } catch (error) {
    console.error("Failed to connect Redis publisher:", error);
    throw error;
  }

  try {
    await redisSubscriber.connect();
    console.log("Redis subscriber connected successfully");
  } catch (error) {
    console.error("Failed to connect Redis subscriber:", error);
    throw error;
  }
};

app.prepare().then(async () => {
  try {
    // Wait for Redis to connect before starting the server
    await connectRedis();

    const server = createServer((req, res) => {
      console.log(`Incoming request: ${req.method} ${req.url}`);
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;
    
      if (pathname.startsWith("/socket.io")) {
        return;
      }
    
      handle(req, res, parsedUrl);
    });

    const io = new Server(server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
      },
      path: "/socket.io",
    });

    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);

      socket.on("join", (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined room`);

        redisSubscriber.subscribe(`notifications:${userId}`, (message) => {
          const notification = JSON.parse(message);
          socket.emit("newNotification", notification);
        });
      });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });

    global.io = io;
    global.redisPublisher = redisPublisher;

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
});

