import studentModel from "./studentModel.js"

const studentReadOne = async (req, res) => {
  try {
    // Accept either a MongoDB _id or the DOC number (docId field)
    const student = await studentModel.findById(req.params.id).catch(() => null)
      ?? await studentModel.findOne({ docId: req.params.id })
    if (!student) {
      return res.status(404).json({ success: false, student: {}, message: "Student not found." })
    }
    res.status(200).json({ success: true, student })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ success: false, student: {}, message: "There was an error. 🤬" })
  }
}

export default studentReadOne
