import express from "express"
import programCreate from "./programCreate.js"
import programReadMany from "./programReadMany.js"
import programReadOne from "./programReadOne.js"
import programReadById from "./programReadById.js"
import programUpdate from "./programUpdate.js"
import programArchive from "./programArchive.js"
import programCompletedCount from "./programCompletedCount.js"
import programAcceptedCount from "./programAcceptedCount.js"
import programJobsCount from "./programJobsCount.js"

const programIndex = express.Router()

programIndex.post("/", programCreate)
programIndex.get("/students/completed{/:state}{/:site}", programCompletedCount)
programIndex.get("/students/accepted{/:state}{/:site}", programAcceptedCount)
programIndex.get("/jobs{/:state}{/:site}", programJobsCount)
programIndex.get("/id/:id", programReadById)
programIndex.get("/state/:stateName", programReadOne)
programIndex.get("/:year", programReadMany)
programIndex.put("/:id/archive", programArchive)
programIndex.put("/:id", programUpdate)

export default programIndex
