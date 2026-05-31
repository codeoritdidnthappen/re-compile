import mongoose from "mongoose"
import classSchema from "./classSchema.js"

classSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    ret.id = ret._id
    delete ret._id
    delete ret._v
  }
})

const classModel = mongoose.model("classes", classSchema)

export default classModel