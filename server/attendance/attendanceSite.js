import attendanceModel from "./attendanceModel.js"
import logger from "../logger.js"

const attendanceSite = async (req, res) => {
  const { siteId, month } = req.params

  try {
    const filter = {}
    if (siteId) filter["metadata.siteId"] = siteId
    if (month)  filter["month"] = month

    const [attendance, rawMonths] = await Promise.all([
      attendanceModel.findOne(filter),
      attendanceModel.distinct("month", siteId ? { "metadata.siteId": siteId } : {}),
    ])

    const months = rawMonths
      .filter(Boolean)
      .sort((a, b) => new Date(`1 ${a}`) - new Date(`1 ${b}`))

    res.status(200).json({ success: true, attendance, months })
  } catch (err) {
    logger.error(err)
    res.status(500).json({ success: false, attendance: null, months: [] })
  }
}

export default attendanceSite
