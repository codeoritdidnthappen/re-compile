import express from "express"
import programCreate from "./programCreate.js"
import programReadMany from "./programReadMany.js"

const programIndex = express.Router()

programIndex.post("/", programCreate)
programIndex.get("/:year", programReadMany)

export default programIndex
