import mongoose from "mongoose";

const trustSchema = new mongoose.Schema(
  {
    sourceTenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true
    },
    targetTenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true
    },
    allowedRoles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    allowedResources: [String],
    status: {
      type: String,
      enum: ["active", "revoked"],
      default: "active"
    }
  },
  { timestamps: true }
);

const Trust = mongoose.model("Trust", trustSchema);

export default Trust;
