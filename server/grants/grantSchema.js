import mongoose from "mongoose"

const Schema = mongoose.Schema

const grantSchema = new Schema({
  name: { type: String, default: "" },
  grantor: {
    organization: { type: String, default: "" },
    contactName: { type: String, default: "" },
    contactTitle: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    website: { type: String, default: "" },
  },
  type: { type: String, enum: ["government", "foundation", "corporate", "individual"], default: "foundation" },
  purpose: { type: String, default: "" },
  amount: { type: Number, default: 0 },
  states: [String],
  startDate: { type: Date },
  endDate: { type: Date },
  status: { type: String, enum: ["active", "pending", "expired", "applied", "rejected"], default: "active" },
  renewalEligible: { type: Boolean, default: false },
  reportingFreq: { type: String, enum: ["monthly", "quarterly", "biannual", "annual", "none"], default: "annual" },
  nextReportDue: { type: Date },
  applicationDeadline: { type: Date },
  notes: { type: String, default: "" },
})

export default grantSchema
