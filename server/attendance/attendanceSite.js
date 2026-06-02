import attendanceModel from "./attendanceModel.js"

const attendanceSite = async (req, res) => {
  const { site, month } = req.query

  try {
    const filter = {}
    if (site)  filter["metadata.site"] = site
    if (month) filter["month"] = month

    const attendance = await attendanceModel.find(filter)

    res.status(200).json({ success: true, attendance })
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, attendance: [] })
  }
}

export default attendanceSite
