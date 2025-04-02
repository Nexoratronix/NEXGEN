// import { connectToDatabase } from "@/lib/db";
// import formidable from "formidable";
// import fs from "fs/promises";
// import path from "path";
// import { authMiddleware } from "@/middleware/auth";

// // Disable Next.js body parsing to handle multipart/form-data
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// async function handler(req, res) {
//   console.log("Received request to /api/job/apply");

//   if (req.method !== "POST") {
//     console.log("Method not allowed:", req.method);
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   // Define the upload directory
//   const uploadDir = path.join(process.cwd(), "public/uploads/resumes");

//   // Create the upload directory if it doesn't exist
//   try {
//     await fs.mkdir(uploadDir, { recursive: true });
//     console.log("Upload directory created or already exists:", uploadDir);
//   } catch (error) {
//     console.error("Error creating upload directory:", error.message);
//     return res.status(500).json({ message: "Failed to create upload directory", error: error.message });
//   }

//   // Use formidable to parse the multipart form data
//   const form = formidable({
//     uploadDir: uploadDir,
//     keepExtensions: true,
//     maxFileSize: 5 * 1024 * 1024, // 5MB limit
//   });

//   let fields, files;
//   try {
//     console.log("Parsing form data...");
//     ({ fields, files } = await new Promise((resolve, reject) => {
//       form.parse(req, (err, fields, files) => {
//         if (err) {
//           console.error("Form parsing error:", err.message);
//           console.error("Form parsing stack:", err.stack);
//           reject(err);
//         }
//         console.log("Form parsed successfully:", { fields, files });
//         resolve({ fields, files });
//       });
//     }));
//   } catch (error) {
//     console.error("Error parsing form:", error.message);
//     console.error("Error stack:", error.stack);
//     return res.status(400).json({ message: "Failed to parse form data", error: error.message });
//   }

//   try {
//     // Extract form fields (handle arrays by taking the first value)
//     const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
//     const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;
//     const message = Array.isArray(fields.message) ? fields.message[0] : fields.message;
//     const jobId = Array.isArray(fields.jobId) ? fields.jobId[0] : fields.jobId;
//     // Handle resume as an array and take the first file
//     const resume = Array.isArray(files.resume) ? files.resume[0] : files.resume;
//     console.log("Extracted fields:", { name, email, message, jobId });
//     console.log("Extracted file:", resume);

//     // Validate form fields
//     if (!name || !email || !message || !jobId || !resume) {
//       console.log("Validation failed: Missing fields", { name, email, message, jobId, resume });
//       if (resume?.filepath) {
//         await fs.unlink(resume.filepath);
//       }
//       return res.status(400).json({ message: "All fields are required, including the resume file" });
//     }

//     // Validate the user (from authMiddleware)
//     const user = req.user;
//     console.log("Authenticated user:", user);
//     if (!user) {
//       console.log("User not authenticated");
//       if (resume?.filepath) {
//         await fs.unlink(resume.filepath);
//       }
//       return res.status(401).json({ message: "Unauthorized: User not found" });
//     }

//     // Validate file type
//     console.log("Validating file type...");
//     const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
//     if (!resume.mimetype || !allowedTypes.includes(resume.mimetype)) {
//       console.log("Invalid file type:", resume.mimetype);
//       if (resume?.filepath) {
//         await fs.unlink(resume.filepath);
//       }
//       return res.status(400).json({ message: "Invalid file type. Only PDF, DOC, and DOCX are allowed" });
//     }

//     // Generate a unique filename
//     const timestamp = Date.now();
//     const originalFilename = resume.originalFilename || "resume";
//     const extension = path.extname(originalFilename);
//     const newFilename = `${timestamp}-${user.id}${extension}`;
//     const newFilePath = path.join(process.cwd(), "public/uploads/resumes", newFilename);
//     console.log("Generated new filename:", newFilename);

//     // Rename the uploaded file
//     console.log("Renaming file to:", newFilePath);
//     await fs.rename(resume.filepath, newFilePath);

//     // Save the application to MongoDB
//     console.log("Connecting to database...");
//     const { db } = await connectToDatabase();
//     console.log("Saving application to database...");
//     const application = {
//       userId: user.id,
//       userEmail: user.email,
//       userRole: user.role,
//       jobId: jobId.toString(),
//       name,
//       email,
//       message,
//       resumePath: `/uploads/resumes/${newFilename}`,
//       createdAt: new Date(),
//     };
//     await db.collection("jobApplications").insertOne(application);
//     console.log("Application saved successfully");

//     res.status(200).json({ message: "Application submitted successfully" });
//   } catch (error) {
//     console.error("Error submitting application:", error.message);
//     console.error("Stack trace:", error.stack);
//     if (files?.resume?.[0]?.filepath) {
//       try {
//         console.log("Cleaning up uploaded file:", files.resume[0].filepath);
//         await fs.unlink(files.resume[0].filepath);
//       } catch (unlinkError) {
//         console.error("Error deleting file:", unlinkError);
//       }
//     }
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// }

// export default authMiddleware(handler);
import { connectToDatabase } from "@/lib/db";
import formidable from "formidable";
import fs from "fs/promises";
import path from "path";
import { authMiddleware } from "@/middleware/auth";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const uploadDir = path.join(process.cwd(), "public/uploads/resumes");
  await fs.mkdir(uploadDir, { recursive: true });

  const form = formidable({
    uploadDir: uploadDir,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024,
  });

  let fields, files;
  try {
    ({ fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    }));

    const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
    const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;
    const message = Array.isArray(fields.message) ? fields.message[0] : fields.message;
    const jobId = Array.isArray(fields.jobId) ? fields.jobId[0] : fields.jobId;
    const resume = Array.isArray(files.resume) ? files.resume[0] : files.resume;

    if (!name || !email || !message || !jobId || !resume) {
      if (resume?.filepath) await fs.unlink(resume.filepath);
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = req.user;
    if (!user) {
      if (resume?.filepath) await fs.unlink(resume.filepath);
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Validate job exists
    const { db } = await connectToDatabase();
    const job = await db.collection("jobs").findOne({ jobId: jobId });
    if (!job) {
      if (resume?.filepath) await fs.unlink(resume.filepath);
      return res.status(400).json({ message: `Invalid Job ID: ${jobId} not found` });
    }

    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!resume.mimetype || !allowedTypes.includes(resume.mimetype)) {
      if (resume?.filepath) await fs.unlink(resume.filepath);
      return res.status(400).json({ message: "Invalid file type" });
    }

    const timestamp = Date.now();
    const originalFilename = resume.originalFilename || "resume";
    const extension = path.extname(originalFilename);
    const newFilename = `${timestamp}-${user.id}${extension}`;
    const newFilePath = path.join(process.cwd(), "public/uploads/resumes", newFilename);
    await fs.rename(resume.filepath, newFilePath);

    const application = {
      userId: user.id,
      userEmail: user.email,
      userRole: user.role,
      jobId: jobId, // Store the validated jobId
      name,
      email,
      message,
      resumePath: `/uploads/resumes/${newFilename}`,
      createdAt: new Date(),
    };
    
    const result = await db.collection("jobApplications").insertOne(application);

    // User notification with jobId
    const userNotification = {
      message: `You have successfully applied for job (Job ID: ${jobId})`,
      type: "job-application",
      recipientId: user.id,
      relatedId: result.insertedId.toString(),
      jobId: jobId, // Add jobId to notification
      isRead: false,
      createdAt: new Date(),
    };
    const userNotificationResult = await db.collection("notifications").insertOne(userNotification);
    await global.redisPublisher.publish(
      `notifications:${user.id}`,
      JSON.stringify({
        ...userNotification,
        _id: userNotificationResult.insertedId.toString(),
      })
    );

    // Admin notifications with jobId
    const admins = await db.collection("users").find({ role: { $in: ["admin", "superadmin"] } }).toArray();
    const adminNotifications = admins.map(admin => ({
      message: `${name} has applied for job (Job ID: ${jobId})`,
      type: "job-application-admin",
      recipientId: admin._id.toString(),
      relatedId: result.insertedId.toString(),
      jobId: jobId, // Add jobId to notification
      isRead: false,
      createdAt: new Date(),
    }));
    if (adminNotifications.length > 0) {
      const adminNotificationResults = await db.collection("notifications").insertMany(adminNotifications);
      const insertedIds = Object.values(adminNotificationResults.insertedIds);
      for (let i = 0; i < adminNotifications.length; i++) {
        const adminNotification = adminNotifications[i];
        await global.redisPublisher.publish(
          `notifications:${adminNotification.recipientId}`,
          JSON.stringify({
            ...adminNotification,
            _id: insertedIds[i].toString(),
          })
        );
      }
    }

    res.status(200).json({ 
      message: "Application submitted successfully",
      jobId: jobId
    });
  } catch (error) {
    if (files?.resume?.[0]?.filepath) {
      await fs.unlink(files.resume[0].filepath);
    }
    res.status(500).json({ 
      message: "Internal server error", 
      error: error.message 
    });
  }
}

export default authMiddleware(handler);