import programModel from "../programs/programModel.js"
import logger from "../logger.js"

const siteUpdate = async (req, res) => {
  const { programId, siteId } = req.params
  const { name, contract, instructor, students, archived } = req.body

  try {
    const updated = await programModel.findByIdAndUpdate(
      programId,
      {
        $set: {
          "sites.$[elem].name":       name,
          "sites.$[elem].contract":   contract,
          "sites.$[elem].instructor": instructor,
          "sites.$[elem].students":   students,
          "sites.$[elem].archived":   archived ?? false,
        }
      },
      { new: true, arrayFilters: [{ "elem.id": siteId }] }
    )
    if (!updated) return res.status(404).json({ success: false, message: "Program not found." })

    const site = updated.sites.find(s => s.id === siteId)
    if (!site) return res.status(404).json({ success: false, message: "Site not found." })

    res.status(200).json({ success: true, site })
  } catch (err) {
    logger.error(err)
    res.status(500).json({ success: false, message: "Server error." })
  }
}

export default siteUpdate
