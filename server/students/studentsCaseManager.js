import studentModel from "./studentModel.js"
import logger from "../logger.js"

const studentsCaseManager = async (req, res) => {
  const { caseManager } = req.params
  try {
    const students = await studentModel.find({ "releaseData.caseManager": caseManager, "incarceration.releaseDate": { $gt: new Date() } }).sort({ "incarceration.releaseDate": 1 })
    res.status(200).json({ success: true, students })
  }
  catch (err) {
    logger.error(err)
    res.status(500).json({ success: false, students: [], message: "There was an error. 🤬" })
  }
}

export default studentsCaseManager
