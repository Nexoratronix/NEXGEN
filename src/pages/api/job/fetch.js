import { connectToDatabase } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { db } = await connectToDatabase();
    const jobs = await db.collection("jobs").find({}).sort({ createdAt: -1 }).toArray();

    // Convert MongoDB ObjectId to string for JSON serialization
    const formattedJobs = jobs.map((job) => ({
      id: job._id.toString(),
      jobId: job.jobId,
      jobDescription: job.jobDescription,
      experience: job.experience,
      companyName: job.companyName,
      jobType: job.jobType,
      salary: job.salary,
      jobDetails: job.jobDetails,
      numberOfOpenings: job.numberOfOpenings,
      jobTimeDate: job.jobTimeDate,
      addclassNameBookmark: job.addclassNameBookmark,
    }));

    return res.status(200).json(formattedJobs);
  } catch (error) {
    console.error("Fetch jobs error:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}