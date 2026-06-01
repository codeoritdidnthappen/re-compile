import studentModel from "./studentModel.js"

const studentReadMany = async (req, res) => {
  try {
    const students = await studentModel.find()
    res.status(200).json({ success: true, students })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ success: false, students: [], message: "There was an error. 🤬" })
  }
}

export default studentReadMany
