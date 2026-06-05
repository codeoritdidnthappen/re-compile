import userModel from "../users/userModel.js"
import logger from "../logger.js"

// TODO: Only remove the one token

const logout = async (req, res) => {
  const { _id } = req.user
  if (!req.user) {
    res.status(401).json({ success: false, message: "Not authenticated." })
  }

  try {
    // Find user in db
    const logoutUser = await userModel.findOneAndUpdate({ _id }, { tokens: [] }, { new: true } )
    logger.debug({ logoutUser }, "logout")
    res.status(200).json({ success: true, message: "Logged out successfully." })
  }
  catch (err) {
    res.status(500).json({ success: false, message: "There was an error." })
  }
}

export default logout