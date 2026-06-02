import programModel from "./programModel.js"

const programReadMany = async (req, res) => {
  const { year = 2026 } = req.params
  try {
    const programs = await programModel.find({ year }).sort({ name: 1 })
    console.log("programs", programs)
    res.status(200).json({ success: true, programs })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ success: false, attendance: [] })
  }

}

export default programReadMany