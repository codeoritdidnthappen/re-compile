import grantModel from "./grantModel.js"
import logger from "../logger.js"

const grantUpdate = async (req, res) => {
  try {
    const grant = await grantModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!grant) {
      return res.status(404).json({ success: false, grant: {}, message: "Grant not found." })
    }
    res.status(200).json({ success: true, grant })
  }
  catch (err) {
    logger.error(err)
    res.status(500).json({ success: false, grant: {}, message: "There was an error. 🤬" })
  }
}

export default grantUpdate
