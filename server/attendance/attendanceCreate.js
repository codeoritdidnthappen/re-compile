import attendanceModel from "./attendanceModel.js"
import logger from "../logger.js"

const attendanceCreate = async (req, res) => {
  const { month, metadata, students, classDays } = req.body

  try {
    const computedClassDays = (classDays ?? []).map((day) => {
      const rate =
        !day.attendanceTotal || !day.totalPossibleDaily
          ? 0
          : parseFloat((day.attendanceTotal / day.totalPossibleDaily).toFixed(4))
      return { ...day, attendanceRateDaily: rate }
    })

    const { totalAttendees, totalPossible } = metadata ?? {}
    const attendanceRate =
      !totalAttendees || !totalPossible
        ? 0
        : parseFloat((totalAttendees / totalPossible).toFixed(10))

    const attendance = await attendanceModel.create({
      month,
      metadata: { ...metadata, attendanceRate },
      students,
      classDays: computedClassDays
    })

    res.status(200).json({ success: true, attendance })
  } catch (err) {
    logger.error(err)
    res.status(500).json({ success: false, attendance: [], message: "There was an error. 👹" })
  }
}

export default attendanceCreate
