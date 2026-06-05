import grantModel from "./grantModel.js"
import logger from "../logger.js"

const grantCreate = async (req, res) => {
  try {
    const grant = new grantModel(req.body)
    await grant.save()
    res.status(201).json({ success: true, grant })
  }
  catch (err) {
    logger.error(err)
    res.status(500).json({ success: false, grant: {}, message: "There was an error. 🤬" })
  }
}

export default grantCreate
