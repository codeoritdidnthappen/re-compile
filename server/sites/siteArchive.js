import programModel from "../programs/programModel.js"
import logger from "../logger.js"

const siteArchive = async (req, res) => {
  const { programId, siteId } = req.params
  try {
    const updated = await programModel.findByIdAndUpdate(
      programId,
      { $set: { "sites.$[elem].archived": true } },
      { new: true, arrayFilters: [{ "elem.id": siteId }] }
    )
    if (!updated) return res.status(404).json({ success: false, message: "Program not found." })

    const site = updated.sites.find(s => s.id === siteId)
    res.status(200).json({ success: true, site })
  } catch (err) {
    logger.error(err)
    res.status(500).json({ success: false, message: "Server error." })
  }
}

export default siteArchive
