import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { assignRoleToUser } from "../controllers/user.controller.js";

const router = express.Router();

// POST /api/users/assign-role
router.post("/assign-role", authenticate, assignRoleToUser);

export default router;
