import programModel from "./programModel.js"
import logger from "../logger.js"

const programUpdate = async (req, res) => {
  const { id } = req.params
  const { name, year, abbreviation, sites, applied, accepted, completed, retention, attendance, jobs, techJobs } = req.body
  try {
    const updated = await programModel.findByIdAndUpdate(
      id,
      { name, year, abbreviation, sites, applied, accepted, completed, retention, attendance, jobs, techJobs },
      { new: true }
    )
    if (!updated) return res.status(404).json({ success: false, message: "Program not found." })
    res.status(200).json({ success: true, program: updated })
  } catch (err) {
    logger.error(err)
    res.status(500).json({ success: false, message: "Server error." })
  }
}

export default programUpdate
