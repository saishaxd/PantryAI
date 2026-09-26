import { Router, Request, Response } from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/profile", protect, (req: Request, res: Response) => {
  res.json({
    message: "You can access this protected route!",
    userId: req.userId,
  });
});

export default router;