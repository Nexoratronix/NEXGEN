import { authMiddleware } from "@/middleware/auth";

const handler = async (req, res) => {
  
  const { id, email, role } = req.user;
  return res.status(200).json({
    id: req.user.id,
    email: req.user.email,
    role: req.user.role,
    username: req.user.username, 
  });
};

export default authMiddleware(handler);