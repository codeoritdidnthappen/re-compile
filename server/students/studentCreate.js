import studentModel from "./studentModel.js"

const studentCreate = async (req, res) => {
  const {
    docId,
    firstName,
    middleInitial,
    lastName,
    teachingAssistant,
    location,
    classesTaken,
    incarceration,
    workPrograms,
    releaseData,
    jobsAfterRelease,
    internshipsOrBootcamps,
    education,
    links
  } = req.body

  try {
    const newStudent = await studentModel.create({
      docId,
      firstName,
      middleInitial,
      lastName,
      teachingAssistant,
      location,
      classesTaken,
      incarceration,
      workPrograms,
      releaseData,
      jobsAfterRelease,
      internshipsOrBootcamps,
      education,
      links
    })
    res.status(200).json({ success: true, student: newStudent })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ success: false, student: {}, message: "There was an error. 🤬" })
  }
}

export default studentCreate
