import express from "express"
import passport from "passport"
import siteCreate from "./siteCreate.js"
import siteReadMany from "./siteReadMany.js"
import siteReadOne from "./siteReadOne.js"
import siteUpdate from "./siteUpdate.js"
import siteArchive from "./siteArchive.js"

const siteIndex = express.Router()

const auth = passport.authenticate("jwt", { session: false })

siteIndex.post("/:programId",                    auth, siteCreate)
siteIndex.get("/:programId",                     auth, siteReadMany)
siteIndex.get("/:programId/:siteId",             auth, siteReadOne)
siteIndex.put("/:programId/:siteId/archive",     auth, siteArchive)
siteIndex.put("/:programId/:siteId",             auth, siteUpdate)

export default siteIndex
