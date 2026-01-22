import User from "../models/User.js";
import Role from "../models/Role.js";

export const assignRoleToUser = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    const { tenantId } = req.user;

    // 1. Validate role belongs to same tenant
    const role = await Role.findOne({ _id: roleId, tenantId });
    if (!role) {
      return res.status(404).json({ message: "Role not found for this tenant" });
    }

    // 2. Find user in same tenant
    const user = await User.findOne({ _id: userId, tenantId });
    if (!user) {
      return res.status(404).json({ message: "User not found for this tenant" });
    }

    // 3. Assign role if not already assigned
    if (!user.roles.includes(roleId)) {
      user.roles.push(roleId);
      await user.save();
    }

    res.json({
      message: "Role assigned to user successfully",
      userId: user._id,
      roles: user.roles
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
