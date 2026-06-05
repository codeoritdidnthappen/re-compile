import programModel from "../programs/programModel.js"
import logger from "../logger.js"

const siteReadOne = async (req, res) => {
  const { programId, siteId } = req.params
  try {
    const program = await programModel.findById(programId)
    if (!program) return res.status(404).json({ success: false, message: "Program not found." })

    const site = program.sites.find(s => s.id === siteId)
    if (!site) return res.status(404).json({ success: false, message: "Site not found." })

    res.status(200).json({ success: true, site })
  } catch (err) {
    logger.error(err)
    res.status(500).json({ success: false, message: "Server error." })
  }
}

export default siteReadOne
