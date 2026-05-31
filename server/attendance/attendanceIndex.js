import express from "express"
import attendanceCreate from "./attendanceCreate.js"
import attendanceReadMany from "./attendanceReadMany.js"

const attendanceIndex = express.Router()

attendanceIndex.post("/", attendanceCreate)
attendanceIndex.get("/", attendanceReadMany)

export default attendanceIndex
