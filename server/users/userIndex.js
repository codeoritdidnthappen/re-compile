import express from "express"
import passport from "passport"
import userCreate from "./userCreate.js"
import userReadMany from "./userReadMany.js"

const userIndex = express.Router()

// Create
userIndex.post("/", passport.authenticate("jwt", { session: false }), userCreate)
// Get users
userIndex.get("/", passport.authenticate("jwt", { session: false }), userReadMany)

export default userIndex