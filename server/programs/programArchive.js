import programModel from "./programModel.js"
import logger from "../logger.js"

const programArchive = async (req, res) => {
  const { id } = req.params
  try {
    const updated = await programModel.findByIdAndUpdate(
      id,
      { archived: true },
      { new: true }
    )
    if (!updated) return res.status(404).json({ success: false, message: "Program not found." })
    res.status(200).json({ success: true, program: updated })
  } catch (err) {
    logger.error(err)
    res.status(500).json({ success: false, message: "Server error." })
  }
}

export default programArchive
