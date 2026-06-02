import programModel from "./programModel.js"

// Get programs by state
const programReadOne = async (req, res) => {
  const { stateName } = req.params
  try {
    const program = await programModel.findOne({ name: stateName }) // .sort({ "sites.name": 1 })
    console.log("program", program)
    res.status(200).json({ success: true, program })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ success: false, attendance: [] })
  }

}

export default programReadOne