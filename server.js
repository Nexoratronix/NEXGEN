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



// const { createServer } = require("http");
// const { Server } = require("socket.io");
// const { createAdapter } = require("@socket.io/redis-adapter");
// const next = require("next");
// const { createClient } = require("redis");
// const { parse } = require("url");
// const express = require("express");
// const session = require("express-session");
// const RedisStore = require("connect-redis"); // Default export is the constructor

// const dev = process.env.NODE_ENV !== "production";
// const app = next({ dev });
// const handle = app.getRequestHandler();

// // Initialize Redis clients
// const redisClient = createClient({
//   url: process.env.REDIS_URL || "redis://localhost:6379",
// });
// const redisPublisher = createClient({
//   url: process.env.REDIS_URL || "redis://localhost:6379",
// });
// const redisSubscriber = createClient({
//   url: process.env.REDIS_URL || "redis://localhost:6379",
// });

// // Handle Redis connection errors
// redisClient.on("error", (error) => console.error("Redis client error:", error));
// redisPublisher.on("error", (error) => console.error("Redis publisher error:", error));
// redisSubscriber.on("error", (error) => console.error("Redis subscriber error:", error));

// // Connect Redis clients with retry logic for production
// const connectRedisClients = async () => {
//   const connectWithRetry = async (client, name) => {
//     for (let i = 0; i < 5; i++) {
//       try {
//         await client.connect();
//         console.log(`${name} connected successfully`);
//         return;
//       } catch (error) {
//         console.error(`Failed to connect ${name}, attempt ${i + 1}/5:`, error);
//         if (i === 4) throw error;
//         await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1s before retry
//       }
//     }
//   };

//   await connectWithRetry(redisClient, "Redis client");
//   await connectWithRetry(redisPublisher, "Redis publisher");
//   await connectWithRetry(redisSubscriber, "Redis subscriber");
// };

// app.prepare().then(async () => {
//   try {
//     // Connect to Redis
//     await connectRedisClients();

//     // Create Express app
//     const expressApp = express();

//     // Configure session with RedisStore for production
//     expressApp.use(
//       session({
//         store: new RedisStore({
//           client: redisClient,
//           prefix: "session:", // Customize prefix for clarity
//           ttl: 24 * 60 * 60, // 1 day in seconds
//         }),
//         secret: process.env.SESSION_SECRET || "#nvrjknmvo9487fn7bfkhf43njk@vnrs8", // Use env var in production
//         resave: false,
//         saveUninitialized: false,
//         cookie: {
//           secure: process.env.NODE_ENV === "production", // Secure in production (HTTPS)
//           httpOnly: true, // Prevent XSS
//           maxAge: 24 * 60 * 60 * 1000, // 1 day
//         },
//       })
//     );

//     // Create HTTP server with Express
//     const server = createServer(expressApp);

//     // Configure Socket.IO with Redis adapter
//     const io = new Server(server, {
//       cors: {
//         origin: process.env.CORS_ORIGIN || "http://localhost:3000", // Configurable origin
//         methods: ["GET", "POST"],
//         credentials: true,
//       },
//       path: "/socket.io",
//       adapter: createAdapter(redisPublisher, redisSubscriber),
//     });

//     // Socket.IO connection handling
//     io.on("connection", (socket) => {
//       console.log("A user connected:", socket.id);

//       socket.on("join", (userId) => {
//         if (!userId) return console.error("No userId provided");
//         socket.join(userId);
//         console.log(`User ${userId} joined room`);

//         redisSubscriber.subscribe(`notifications:${userId}`, (message) => {
//           try {
//             const notification = JSON.parse(message);
//             socket.emit("newNotification", notification);
//           } catch (error) {
//             console.error("Failed to parse notification:", error);
//           }
//         });
//       });

//       socket.on("disconnect", () => {
//         console.log("User disconnected:", socket.id);
//       });
//     });

//     // Handle Next.js requests
//     expressApp.get("*", (req, res) => {
//       const parsedUrl = parse(req.url, true);
//       return handle(req, res, parsedUrl);
//     });

//     // Attach globals (avoid in production if possible, use a module instead)
//     global.io = io;
//     global.redisPublisher = redisPublisher;

//     // Start server
//     const port = process.env.PORT || 3000;
//     server.listen(port, (err) => {
//       if (err) throw err;
//       console.log(`> Ready on http://localhost:${port}`);
//     });
//   } catch (error) {
//     console.error("Failed to start server:", error);
//     process.exit(1);
//   }
// });

// // Graceful shutdown
// process.on("SIGTERM", async () => {
//   console.log("Shutting down server...");
//   await redisClient.quit();
//   await redisPublisher.quit();
//   await redisSubscriber.quit();
//   process.exit(0);
// });