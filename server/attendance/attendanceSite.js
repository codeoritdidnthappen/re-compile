import attendanceModel from "./attendanceModel.js"
import logger from "../logger.js"

const attendanceSite = async (req, res) => {
  const { siteId, month } = req.params

  try {
    const filter = {}
    if (siteId)  filter["metadata.siteId"] = siteId
    if (month) filter["month"] = month

    const attendance = await attendanceModel.findOne(filter)

    res.status(200).json({ success: true, attendance })
  } catch (err) {
    logger.error(err)
    res.status(500).json({ success: false, attendance: [] })
  }
}

export default attendanceSite
