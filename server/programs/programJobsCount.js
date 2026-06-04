import programModel from "./programModel.js"

const programJobsCount = async (req, res) => {
  const { state, site } = req.params
  const filter = {}
  if (state) filter["name"] = { $regex: new RegExp(`^${state}$`, "i") }
  if (site) filter["sites.id"] = { $regex: new RegExp(`^${site}$`, "i") }

  try {
    const count = await programModel.aggregate([
      { $match: filter },
      { $group: { _id: null, count: { $sum: "$jobs" } } }
    ])
    res.status(200).json({ success: true, count })
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, count: 0 })
  }
}

export default programJobsCount
