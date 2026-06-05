import programModel from "./programModel.js"
import logger from "../logger.js"

// Get programs by state
const programReadOne = async (req, res) => {
  const { stateName } = req.params
  try {
    const program = await programModel.findOne({ name: stateName }) // .sort({ "sites.name": 1 })
    res.status(200).json({ success: true, program })
  }
  catch (err) {
    logger.error(err)
    res.status(500).json({ success: false, attendance: [] })
  }

}

export default programReadOne