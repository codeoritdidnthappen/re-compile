import programModel from "../programs/programModel.js"
import logger from "../logger.js"

const siteCreate = async (req, res) => {
  const { programId } = req.params
  const { name, contract, instructor, students } = req.body

  try {
    const program = await programModel.findById(programId)
    if (!program) return res.status(404).json({ success: false, message: "Program not found." })

    const duplicate = program.sites.some(
      s => !s.archived && s.name.toLowerCase() === name.toLowerCase()
    )
    if (duplicate) return res.status(409).json({ success: false, message: "A site with that name already exists in this program." })

    const id = `${program.abbreviation.toLowerCase()}-${name.toLowerCase().replace(/\s+/g, "-")}`

    const updated = await programModel.findByIdAndUpdate(
      programId,
      { $push: { sites: { id, name, contract, instructor, students: students ?? 0, archived: false } } },
      { new: true }
    )

    const site = updated.sites.find(s => s.id === id)
    res.status(200).json({ success: true, site })
  } catch (err) {
    logger.error(err)
    res.status(500).json({ success: false, message: "Server error." })
  }
}

export default siteCreate
