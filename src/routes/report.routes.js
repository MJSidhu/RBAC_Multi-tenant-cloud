import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/rbac.middleware.js";

const router = express.Router();

// GET /api/reports
router.get(
  "/",
  authenticate,
  authorize("report", "read"),
  (req, res) => {
    res.json({
      message: "Report accessed successfully",
      tenantId: req.user.tenantId
    });
  }
);

export default router;
