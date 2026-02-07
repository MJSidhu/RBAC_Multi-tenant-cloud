import Trust from "../models/Trust.js";

export const createTrust = async (req, res) => {
  try {
    const { targetTenantId, allowedRoles, allowedResources } = req.body;
    const { tenantId } = req.user; // source tenant

    const trust = await Trust.create({
      sourceTenantId: tenantId,
      targetTenantId,
      allowedRoles,
      allowedResources,
      status: "active"
    });

    res.status(201).json(trust);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const revokeTrust = async (req, res) => {
  try {
    const { trustId } = req.params;
    const { tenantId } = req.user; // source tenant

    const trust = await Trust.findOne({
      _id: trustId,
      sourceTenantId: tenantId
    });

    if (!trust) {
      return res.status(404).json({
        message: "Trust not found or not owned by this tenant"
      });
    }

    trust.status = "revoked";
    await trust.save();

    res.json({
      message: "Trust revoked successfully",
      trustId: trust._id,
      status: trust.status
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};