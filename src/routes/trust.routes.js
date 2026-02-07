import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { createTrust , revokeTrust } from "../controllers/trust.controller.js";

const router = express.Router();

// POST /api/trusts
router.post("/", authenticate, createTrust);
router.patch("/:trustId/revoke", authenticate, revokeTrust);
export default router;
