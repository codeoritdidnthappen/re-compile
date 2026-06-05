import programModel from "../programs/programModel.js"
import logger from "../logger.js"

const siteReadMany = async (req, res) => {
  const { programId } = req.params
  try {
    const program = await programModel.findById(programId)
    if (!program) return res.status(404).json({ success: false, message: "Program not found." })

    const sites = program.sites.filter(s => !s.archived)
    res.status(200).json({ success: true, sites })
  } catch (err) {
    logger.error(err)
    res.status(500).json({ success: false, message: "Server error." })
  }
}

export default siteReadMany
