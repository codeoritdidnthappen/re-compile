import jwt from "jsonwebtoken"
import userModel from "../users/userModel.js"
import logger from "../logger.js"

const me = async (req, res, next) => {
  const { id, firstName, lastName, email, username, roles, cart, avatar } = req.user
  try {
    const user = req.user

    if (!user) {
      res.status(401).json({ success: false, user: null })  
    }
    res.status(200).json({ success: true, user: { firstName, lastName, email, username, roles, cart, avatar } })
  }
  catch (err) {
    logger.error(err)
    res.status(500).json({ success: false, message: "There was an error." })
  }
}

export default me