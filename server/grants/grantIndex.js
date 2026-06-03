import express from "express"
import passport from "passport"
import grantCreate from "./grantCreate.js"
import grantReadMany from "./grantReadMany.js"
import grantReadOne from "./grantReadOne.js"
import grantUpdate from "./grantUpdate.js"
import grantDelete from "./grantDelete.js"

const grantIndex = express.Router()

// Create
grantIndex.post("/", grantCreate)
// Read all
grantIndex.get("/", passport.authenticate("jwt", { session: false }), grantReadMany)
// Read one
grantIndex.get("/:id", passport.authenticate("jwt", { session: false }), grantReadOne)
// Update
grantIndex.put("/:id", passport.authenticate("jwt", { session: false }), grantUpdate)
// Delete
grantIndex.delete("/:id", passport.authenticate("jwt", { session: false }), grantDelete)

export default grantIndex
