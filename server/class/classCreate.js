import classModel from "./classModel.js"

const classCreate = async (req, res) => {
  const {
    className,
    classType,
    location,
    complex,
    unit,
    staff,
    currentCohort,
    startDate,
    endDate
  } = req.body

  const newClass = await classModel.create({
    className,
    classType,
    location,
    complex,
    unit,
    staff,
    currentCohort,
    startDate,
    endDate
  })

  res.status(200).json({ success: true, newClass: newClass })
}

export default classCreate
