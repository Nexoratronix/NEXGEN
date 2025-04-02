import { connectToDatabase } from "@/lib/db";
import { authMiddleware } from "@/middleware/auth";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Check if the user is a superadmin
  if (req.user.role !== "superadmin") {
    return res.status(403).json({ message: "Only superadmins can post jobs" });
  }

  const { jobId, jobDescription, experience, companyName, jobType, salary, jobDetails, numberOfOpenings, jobTimeDate } = req.body;

  if (!jobId || !jobDescription || !experience || !companyName || !jobType || !salary || !jobDetails || !numberOfOpenings || !jobTimeDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const { db } = await connectToDatabase();

    // Check if jobId already exists
    const existingJob = await db.collection("jobs").findOne({ jobId });
    if (existingJob) {
      return res.status(400).json({ message: "Job ID already exists" });
    }

    const result = await db.collection("jobs").insertOne({
      jobId, // Custom jobId provided by Superadmin
      jobDescription,
      experience,
      companyName,
      jobType,
      salary,
      jobDetails,
      numberOfOpenings,
      jobTimeDate,
      addclassNameBookmark: false, // Default value
      createdAt: new Date(),
    });

    if (result.insertedId) {
      return res.status(201).json({ message: "Job posted successfully", jobId: result.insertedId });
    } else {
      return res.status(500).json({ message: "Failed to post job" });
    }
  } catch (error) {
    console.error("Job post error:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export default authMiddleware(handler);