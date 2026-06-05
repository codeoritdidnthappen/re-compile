import studentModel from "./studentModel.js"
import logger from "../logger.js"

const studentReadMany = async (req, res) => {
  try {
    const students = await studentModel.find()
    res.status(200).json({ success: true, students })
  }
  catch (err) {
    logger.error(err)
    res.status(500).json({ success: false, students: [], message: "There was an error. 🤬" })
  }
}

export default studentReadMany
