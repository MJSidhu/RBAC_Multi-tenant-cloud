import Role from "../models/Role.js";

export const createRole = async (req, res) => {
  try {
    const { name } = req.body;
    const { tenantId } = req.user;

    const role = await Role.create({
      tenantId,
      name,
      permissions: []
    });

    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const assignPermissionToRole = async (req, res) => {
  try {
    const { roleId, permissionId } = req.body;
    const { tenantId } = req.user;

    const role = await Role.findOne({ _id: roleId, tenantId });
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    if (!role.permissions.includes(permissionId)) {
      role.permissions.push(permissionId);
      await role.save();
    }

    res.json(role);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
