import grantModel from "./grantModel.js"
import logger from "../logger.js"

const grantDelete = async (req, res) => {
  try {
    const grant = await grantModel.findByIdAndDelete(req.params.id)
    if (!grant) {
      return res.status(404).json({ success: false, message: "Grant not found." })
    }
    res.status(200).json({ success: true, message: "Grant deleted." })
  }
  catch (err) {
    logger.error(err)
    res.status(500).json({ success: false, message: "There was an error. 🤬" })
  }
}

export default grantDelete
