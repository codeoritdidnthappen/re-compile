import attendanceSummaryModel from "./attendanceSummaryModel.js"

const attendanceSummary = async (req, res) => {
  const { abbreviation } = req.params
  console.log("abbreviation", abbreviation)
  try {
    const attendance = await attendanceSummaryModel.find({ "location.state": abbreviation }).sort({ classDate: 1 })
    console.log("attendance", attendance)
    let attendanceParsed = []
    let dayObject = {}
    for (let i = 0; i < attendance.length; i++) {
      if (i === 0 || attendance[i].classDate.getTime() !== attendance[i-1].classDate.getTime()) {
        if (i !== 0) attendanceParsed.push(dayObject)
        dayObject = {}
        dayObject.name = `${attendance[i].classDate.getMonth() + 1}/${attendance[i].classDate.getDate()}`
        dayObject[attendance[i].className] = attendance[i].attendanceTotal
      }
      else {
        dayObject[attendance[i].className] = attendance[i].attendanceTotal
      }
    }
    attendanceParsed.push(dayObject) // Push last object
    res.status(200).json({ success: true, attendance: attendanceParsed.filter(item => item.Perryville !== 0 || item.Cibola !== 0 || item.Whetstone !== 0 || item.RedRock !== 0) })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ success: false, attendance: [] })
  }

}

export default attendanceSummary