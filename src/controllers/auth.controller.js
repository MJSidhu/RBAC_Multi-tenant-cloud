import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Tenant from "../models/Tenant.js";
import User from "../models/User.js";

export const registerTenant = async (req, res) => {
  try {
    const { tenantName, domain, adminName, email, password } = req.body;

    // 1. Create Tenant
    const tenant = await Tenant.create({
      name: tenantName,
      domain
    });

    // 2. Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // 3. Create Admin User
    const adminUser = await User.create({
      tenantId: tenant._id,
      name: adminName,
      email,
      passwordHash,
      roles: [] // roles will be assigned later
    });

    res.status(201).json({
      message: "Tenant and admin user created successfully",
      tenantId: tenant._id,
      adminUserId: adminUser._id
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, tenantId } = req.body;

    const user = await User.findOne({ email, tenantId });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        tenantId: user.tenantId,
        roles: user.roles
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
