import mongoose from "mongoose"
import programSchema from "./programSchema.js"

programSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    delete ret._id
    delete ret._v
  }
})

const programModel = mongoose.model("program", programSchema)

export default programModel