import { connectToDatabase } from "@/lib/db";

// Retry logic for MongoDB connection
async function connectWithRetry(maxRetries = 3, retryDelay = 2000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt} to connect to MongoDB...`);
      const { db } = await connectToDatabase();
      console.log("DB connected successfully");
      return db;
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error.message);
      if (attempt === maxRetries) {
        throw new Error("Failed to connect to MongoDB after maximum retries");
      }
      console.log(`Retrying in ${retryDelay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }
  }
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Check user role
    console.log("Checking user role...");
    const roleResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/check-role`, {
      method: "GET",
      headers: {
        cookie: req.headers.cookie || "",
      },
    });
    const roleData = await roleResponse.json();
    console.log("Role check response:", roleData);
    if (!roleResponse.ok || !["superadmin", "admin"].includes(roleData.role)) {
      console.log("User is not authorized. Role:", roleData.role);
      return res.status(403).json({ message: "Unauthorized" });
    }

    const db = await connectWithRetry();
    console.log("Fetching job applications from jobApplications collection...");
    const applications = await db
      .collection("jobApplications")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    console.log("Raw applications from DB:", applications);

    // Fetch job details for each application
    for (let app of applications) {
      console.log(`Fetching job details for jobId: ${app.jobId}`);
      const job = await db.collection("jobs").findOne({ jobId: app.jobId });
      console.log(`Job found for jobId ${app.jobId}:`, job);
      app.jobTitle = job ? job.title : "Unknown Job";
      app.category = job ? job.category : "N/A";
      app.workingHours = job ? job.workingHours : "N/A";
    }

    console.log("Applications with job details:", applications);
    res.status(200).json({ applications });
  } catch (error) {
    console.error("Error fetching job applications:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}