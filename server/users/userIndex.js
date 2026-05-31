import express from "express"
import passport from "passport"
import userCreate from "./userCreate.js"
import userReadMany from "./userReadMany.js"

const userIndex = express.Router()

// Create
userIndex.post("/", userCreate)
// Get users
userIndex.get("/", passport.authenticate("jwt", { session: false }), userReadMany)

export default userIndex