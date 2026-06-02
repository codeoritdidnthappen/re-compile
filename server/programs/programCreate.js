import programModel from "./programModel.js"

const programCreate = async (req, res) => {
  const {
    name,
    year,
    abbreviation,
    sites,
    applied,
    accepted,
    completed,
    attendance,
    jobs,
    techJobs
  } = req.body

  try {
    const newProgram = await programModel.create({
      name,
      year,
      abbreviation,
      sites,
      applied,
      accepted,
      completed,
      attendance,
      jobs,
      techJobs
    })

    res.status(200).json({ success: true, program: newProgram })
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, program: {}, message: "There was an error. 🤬" })
  }
}

export default programCreate
