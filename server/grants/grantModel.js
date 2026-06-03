import mongoose from "mongoose"
import grantSchema from "./grantSchema.js"

grantSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }
})

const grantModel = mongoose.model("grants", grantSchema)

export default grantModel
