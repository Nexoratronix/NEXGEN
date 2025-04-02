import { connectToDatabase } from "@/lib/db";
import { authMiddleware } from "@/middleware/auth";
import { ObjectId } from "mongodb";

const handler = async (req, res) => {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Check if the user is a superadmin
  if (req.user.role !== "superadmin") {
    return res.status(403).json({ message: "Only superadmins can edit jobs" });
  }

  const { jobId, jobDescription, experience, companyName, jobType, salary, jobDetails, numberOfOpenings, jobTimeDate, id } = req.body;

  if (!id || !jobId || !jobDescription || !experience || !companyName || !jobType || !salary || !jobDetails || !numberOfOpenings || !jobTimeDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const { db } = await connectToDatabase();

    // Check if the new jobId is unique (excluding the current job)
    const existingJob = await db.collection("jobs").findOne({ jobId, _id: { $ne: new ObjectId(id) } });
    if (existingJob) {
      return res.status(400).json({ message: "Job ID already exists" });
    }

    const result = await db.collection("jobs").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          jobId,
          jobDescription,
          experience,
          companyName,
          jobType,
          salary,
          jobDetails,
          numberOfOpenings,
          jobTimeDate,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json({ message: "Job updated successfully", jobId: id });
  } catch (error) {
    console.error("Job edit error:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export default authMiddleware(handler);