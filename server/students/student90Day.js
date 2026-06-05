import studentModel from "./studentModel.js"
import logger from "../logger.js"

const student90Day = async (req, res) => {
  const { caseManager = null } = req.params
  try {
    const filter = { "incarceration.releaseDate": { $gt: new Date(), $lt: new Date((new Date()).getTime() + (90 * 24 * 60 * 60 * 1000)) } }
    if (caseManager) filter["releaseData.caseManager"] = caseManager

    const sites = await studentModel.aggregate([
      { $match: filter },
      { $group: { _id: "$location.site", total: { $sum: 1 } } },
      { $project: { _id: 0, site: "$_id", total: 1 } },
      { $sort: { site: 1 } }
    ])
    res.status(200).json({ success: true, sites })
  }
  catch (err) {
    logger.error(err)
    res.status(500).json({ success: false, sites: [], message: "There was an error. 🤬" })
  }
}

export default student90Day
