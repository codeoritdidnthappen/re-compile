import attendanceModel from "./attendanceModel.js"

const attendanceCreate = async (req, res) => {
  const {
    className,
    classType,
    location,
    cohort,
    classDate,
    session,
    sessionReason,
    attendanceTotal,
    totalStudents,
    totalPossibleDaily,
    attendanceRateDaily,
    students
  } = req.body

  try {

    // Calculate attendanceRateDaily here
    const attendanceRate = attendanceTotal === 0 || totalPossibleDaily === 0 ? 0 : attendanceTotal / totalPossibleDaily

    console.log(attendanceRate, attendanceTotal, totalPossibleDaily)

    const attendance = await attendanceModel.create({
      className,
      classType,
      location,
      cohort,
      classDate,
      session,
      sessionReason,
      attendanceTotal,
      totalStudents,
      totalPossibleDaily,
      attendanceRateDaily: attendanceRate, // Calculated rate
      students
    })

    res.status(200).json({ success: true, attendance: attendance })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ success: false, attendance: [], message: "There was an error. 👹" })
  }
}

export default attendanceCreate
