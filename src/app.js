import express from "express"
import authRoutes from "./routes/auth.routes.js";
import reportRoutes from "./routes/report.routes.js";
import permissionRoutes from "./routes/permission.routes.js";
import roleRoutes from "./routes/role.routes.js";
import userRoutes from "./routes/user.routes.js";
import trustRoutes from "./routes/trust.routes.js";

const app=express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/trusts", trustRoutes);

app.get("/", (req, res) => {
  res.send("RBAC Multi-Tenant Backend Running");
});

export default app;