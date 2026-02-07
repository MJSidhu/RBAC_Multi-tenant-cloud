import Role from "../models/Role.js";
import Trust from "../models/Trust.js";

export const authorize = (resource, action) => {
  return async (req, res, next) => {
    try {
      const { tenantId, roles } = req.user;

      // No roles assigned
      if (!roles || roles.length === 0) {
        return res.status(403).json({ message: "Access denied (no roles)" });
      }
      
      /* ---------- 1. SAME-TENANT CHECK ---------- */
      const roleDocs = await Role.find({
        _id: { $in: roles },
        tenantId
      }).populate("permissions");

      for (const role of roleDocs) {
        for (const perm of role.permissions) {
          if (perm.resource === resource && perm.action === action) {
            return next(); // ✅ same-tenant access
          }
        }
      }

      /* ---------- 2. CROSS-TENANT TRUST CHECK ---------- */
      const trusts = await Trust.find({
        targetTenantId: tenantId,
        status: "active"
      });

      for (const trust of trusts) {
        // role allowed?
        const roleAllowed = roles.some(roleId =>
          trust.allowedRoles.includes(roleId)
        );

        if (
          roleAllowed &&
          trust.allowedResources.includes(resource)
        ) {
          return next(); // ✅ trusted access
        }
      }

      return res.status(403).json({ message: "Access denied" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};
