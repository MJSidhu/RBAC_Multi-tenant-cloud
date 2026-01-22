import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { createPermission } from "../controllers/permission.controller.js";

const router = express.Router();

// POST /api/permissions
router.post("/", authenticate, createPermission);

export default router;

