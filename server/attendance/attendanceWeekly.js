import weeklyModel from "./weeklyModel.js"
import logger from "../logger.js"

const attendanceWeekly = async (req, res) => {
  try {
    const weekly = await weeklyModel.find({}).sort({ "week.startDate": 1 })
    res.status(200).json({ success: true, weekly })
  } catch (err) {
    logger.error(err)
    res.status(500).json({ success: false, weekly: [] })
  }
}

export default attendanceWeekly
