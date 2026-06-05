import programModel from "./programModel.js"
import logger from "../logger.js"

const programReadMany = async (req, res) => {
  const { year = 2026 } = req.params
  try {
    const programs = await programModel.find({ year }).sort({ name: 1 })
    res.status(200).json({ success: true, programs })
  }
  catch (err) {
    logger.error(err)
    res.status(500).json({ success: false, attendance: [] })
  }

}

export default programReadMany