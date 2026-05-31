import express from "express"
import classCreate from "./classCreate.js"

const classIndex = express.Router()

classIndex.post("/", classCreate)

export default classIndex
