import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    domain: {
      type: String,
      unique: true
    }
  },
  { timestamps: true }
);

const Tenant = mongoose.model("Tenant", tenantSchema);

export default Tenant;
