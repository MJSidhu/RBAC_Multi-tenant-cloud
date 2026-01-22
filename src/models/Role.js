import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission"
      }
    ]
  },
  { timestamps: true }
);

// role name unique per tenant
roleSchema.index({ tenantId: 1, name: 1 }, { unique: true });

const Role = mongoose.model("Role", roleSchema);

export default Role;
