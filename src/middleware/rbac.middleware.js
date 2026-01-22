import Role from "../models/Role.js";
import Permission from "../models/Permission.js";

export const authorize = (resource, action) => {
  return async (req, res, next) => {
    try {
      const { tenantId, roles } = req.user;

      // No roles assigned
      if (!roles || roles.length === 0) {
        return res.status(403).json({ message: "Access denied (no roles)" });
      }

      const rolesData = await Role.find({
        _id: { $in: roles },
        tenantId
      }).populate("permissions");

      for (const role of rolesData) {
        for (const perm of role.permissions) {
          if (
            perm.resource === resource &&
            perm.action === action
          ) {
            return next();
          }
        }
      }

      return res.status(403).json({ message: "Access denied" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};
