import * as argon2 from "argon2"
import userModel from "./userModel.js"
import logger from "../logger.js"

const userCreate = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    username,
    avatar,
    password,
    roles
  } = req.body

  try {
    // Create user
    const hashedPassword = await argon2.hash(password)
    const newUser = await userModel.create({ firstName, lastName, email, username, avatar, password: hashedPassword, roles, authStrategy: "local", tokens: [] })
    res.status(200).json({ success: true, user: newUser })
  }
  catch (err) {
    logger.error(err)
    res.status(500).json({ success: false, user: {}, message: "There was an error. 🤬" })
  }
}

export default userCreate