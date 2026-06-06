import express from "express"
import attendanceCreate from "./attendanceCreate.js"
// import attendanceReadMany from "./attendanceReadMany.js"
import attendanceSite from "./attendanceSite.js"
import attendanceSummary from "./attendanceSummary.js"
import attendanceWeekly from "./attendanceWeekly.js"

const attendanceIndex = express.Router()

attendanceIndex.post("/", attendanceCreate)
// attendanceIndex.get("/", attendanceReadMany)
attendanceIndex.get("/weekly", attendanceWeekly)
attendanceIndex.get("/site/:siteId/:month", attendanceSite)
attendanceIndex.get("/summary/:abbreviation", attendanceSummary)

export default attendanceIndex
