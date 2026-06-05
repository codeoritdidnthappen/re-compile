import studentModel from "./studentModel.js"
import logger from "../logger.js"

const laptopsGiven = async (req, res) => {
  const { state, site } = req.params
  const filter = { "releaseData.receivedLaptop": true }
  if (state) filter["location.state"] = { $regex: new RegExp(`^${state}$`, "i") }
  if (site) filter["location.site"] = { $regex: new RegExp(`^${site}$`, "i") }

  try {
    const count = await studentModel.countDocuments(filter)
    res.status(200).json({ success: true, count })
  } catch (err) {
    logger.error(err)
    res.status(500).json({ success: false, count: 0 })
  }
}

export default laptopsGiven
