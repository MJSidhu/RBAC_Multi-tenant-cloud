import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  createRole,
  assignPermissionToRole
} from "../controllers/role.controller.js";

const router = express.Router();

// POST /api/roles
router.post("/", authenticate, createRole);

// POST /api/roles/assign-permission
router.post("/assign-permission", authenticate, assignPermissionToRole);

export default router;
