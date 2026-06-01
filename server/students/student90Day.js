import studentModel from "./studentModel.js"

const student90Day = async (req, res) => {
  try {
    const students = await studentModel.find({ "incarceration.releaseDate": { $gt: new Date() } }).sort({ "incarceration.releaseDate": 1 })
    console.log("students", students)
    res.status(200).json({ success: true, students })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ success: false, students: [], message: "There was an error. 🤬" })
  }
}

export default student90Day
