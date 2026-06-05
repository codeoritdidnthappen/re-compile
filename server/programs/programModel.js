import mongoose from "mongoose"
import programSchema from "./programSchema.js"

programSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

const programModel = mongoose.model("program", programSchema)

export default programModel