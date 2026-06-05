import grantModel from "./grantModel.js"
import logger from "../logger.js"

const grantReadMany = async (req, res) => {
  try {
    const grants = await grantModel.find().sort({ endDate: 1 })
    res.status(200).json({ success: true, grants })
  }
  catch (err) {
    logger.error(err)
    res.status(500).json({ success: false, grants: [], message: "There was an error. 🤬" })
  }
}

export default grantReadMany
