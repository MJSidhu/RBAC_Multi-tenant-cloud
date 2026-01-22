import express from "express";
import { registerTenant, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register-tenant", registerTenant);
router.post("/login", login);

export default router;
