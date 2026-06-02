import mongoose from "mongoose"
import attendanceSummarySchema from "./attendanceSummarySchema.js"

attendanceSummarySchema.set("toJSON", {
  transform: (doc, ret, options) => {
    delete ret._id
    delete ret._v
  }
})

const attendanceSummaryModel = mongoose.model("attendance_summaries", attendanceSummarySchema)

export default attendanceSummaryModel