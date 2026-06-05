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
    // TODO: encrypt password with argon2
    const newUser = await userModel.create({ firstName, lastName, email, username, avatar, password, roles, authStrategy: "local", tokens: [] })
    res.status(200).json({ success: true, user: newUser })
  }
  catch (err) {
    logger.error(err)
    res.status(500).json({ success: false, user: {}, message: "There was an error. 🤬" })
  }
}

export default userCreate