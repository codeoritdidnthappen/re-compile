import express from "express"
import programCreate from "./programCreate.js"
import programReadMany from "./programReadMany.js"
import programReadOne from "./programReadOne.js"

const programIndex = express.Router()

programIndex.post("/", programCreate)
programIndex.get("/:year", programReadMany)
programIndex.get("/state/:stateName", programReadOne)

export default programIndex
