import programModel from "./programModel.js"
import logger from "../logger.js"

const programAcceptedCount = async (req, res) => {
  const { state, site } = req.params
  const filter = {}
  if (state) filter["name"] = { $regex: new RegExp(`^${state}$`, "i") }
  if (site) filter["sites.id"] = { $regex: new RegExp(`^${site}$`, "i") }

  try {
    // const count = await programModel.countDocuments(filter)
    const count = await programModel.aggregate([
      { $match: filter },
      { $group: { _id: null, count: { $sum: "$accepted" } } }
    ])
    res.status(200).json({ success: true, count })
  } catch (err) {
    logger.error(err)
    res.status(500).json({ success: false, count: 0 })
  }
}

export default programAcceptedCount
