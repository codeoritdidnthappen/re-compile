import programModel from "./programModel.js"
import logger from "../logger.js"

const programReadById = async (req, res) => {
  const { id } = req.params
  try {
    const program = await programModel.findById(id)
    if (!program) return res.status(404).json({ success: false, message: "Program not found." })
    res.status(200).json({ success: true, program })
  } catch (err) {
    logger.error(err)
    res.status(500).json({ success: false, message: "Server error." })
  }
}

export default programReadById
