import Permission from "../models/Permission.js";

export const createPermission = async (req, res) => {
  try {
    const { resource, action } = req.body;
    const { tenantId } = req.user;

    const permission = await Permission.create({
      tenantId,
      resource,
      action
    });

    res.status(201).json(permission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
