import userModel from "./userModel.js"
import logger from "../logger.js"

const userReadMany = async (req, res) => {
  try {
    // Get all users
    // TODO: Get only logged in users
    const users = await userModel.find({})
    res.status(200).json({ success: true, users })
  }
  catch (err) {
    logger.error(err)
    res.status(500).json({ success: false, users: [], message: "There was an error. 🤬" })
  }
}

export default userReadMany