import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true
    },
    resource: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// ensure unique permission per tenant
permissionSchema.index(
  { tenantId: 1, resource: 1, action: 1 },
  { unique: true }
);

const Permission = mongoose.model("Permission", permissionSchema);

export default Permission;
