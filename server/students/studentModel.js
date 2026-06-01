import mongoose from "mongoose"
import studentSchema from "./studentSchema.js"

studentSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }
})

const studentModel = mongoose.model("students", studentSchema)

export default studentModel