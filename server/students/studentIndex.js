import express from "express"
import passport from "passport"
import studentCreate from "./studentCreate.js"
import studentReadMany from "./studentReadMany.js"
import student90Day from "./student90Day.js"
import studentsCaseManager from "./studentsCaseManager.js"
import studentReadOne from "./studentReadOne.js"
import studentUpdate from "./studentUpdate.js"
import studentDelete from "./studentDelete.js"

const studentIndex = express.Router()

// Create
// studentIndex.post("/", passport.authenticate("jwt", { session: false }), studentCreate)
studentIndex.post("/", studentCreate)
// Read all
studentIndex.get("/", passport.authenticate("jwt", { session: false }), studentReadMany)
// Get students with 90 days or less
studentIndex.get("/90day{/:caseManager}", passport.authenticate("jwt", { session: false }), student90Day)
// Get all students for case maanger
studentIndex.get("/case-manager/:caseManager", passport.authenticate("jwt", { session: false }), studentsCaseManager)
// Read one
studentIndex.get("/:id", passport.authenticate("jwt", { session: false }), studentReadOne)
// Update
studentIndex.put("/:id", passport.authenticate("jwt", { session: false }), studentUpdate)
// Delete
studentIndex.delete("/:id", passport.authenticate("jwt", { session: false }), studentDelete)

export default studentIndex
