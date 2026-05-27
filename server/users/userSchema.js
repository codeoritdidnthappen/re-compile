import mongoose from "mongoose"

const Schema = mongoose.Schema

const userSchema = new Schema({
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  email: { type: String, default: "" },
  username: { type: String, default: "" },
  password: { type: String, default: "" },
  avatar: { type: String, default: "" },
  roles: [ String ],
  authStrategy: { type: String, default: "" },
  tokens: [ { token: String } ]
})

export default userSchema