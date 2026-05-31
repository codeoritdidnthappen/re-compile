import mongoose from "mongoose"
import attendanceSchema from "./attendanceSchema.js"

attendanceSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    ret.id = ret._id
    delete ret._id
    delete ret._v
  }
})

const attendanceModel = mongoose.model("attendance", attendanceSchema)

export default attendanceModel