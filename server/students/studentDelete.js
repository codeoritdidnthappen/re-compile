import studentModel from "./studentModel.js"

const studentDelete = async (req, res) => {
  try {
    const student = await studentModel.findByIdAndDelete(req.params.id)
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found." })
    }
    res.status(200).json({ success: true, message: "Student deleted." })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: "There was an error. 🤬" })
  }
}

export default studentDelete
