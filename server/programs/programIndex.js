import express from "express"
import programCreate from "./programCreate.js"
import programReadMany from "./programReadMany.js"
import programReadOne from "./programReadOne.js"
import programCompletedCount from "./programCompletedCount.js"
import programAcceptedCount from "./programAcceptedCount.js"
import programJobsCount from "./programJobsCount.js"

const programIndex = express.Router()

programIndex.post("/", programCreate)
programIndex.get("/students/completed{/:state}{/:site}", programCompletedCount)
programIndex.get("/students/accepted{/:state}{/:site}", programAcceptedCount)
programIndex.get("/jobs{/:state}{/:site}", programJobsCount)
programIndex.get("/:year", programReadMany)
programIndex.get("/state/:stateName", programReadOne)

export default programIndex
