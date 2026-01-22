import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
    email: {
      type: String,
      required: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  },
  { timestamps: true }
);

// composite index → same email allowed in different tenants
userSchema.index({ email: 1, tenantId: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);

export default User;
