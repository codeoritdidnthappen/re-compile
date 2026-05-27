import { Router } from "express"
import passport from "passport"
import login from "./login.js"
import me from "./me.js"
import logout from "./logout.js"
import update from "./update.js"

const index = Router()

index.post("/login", passport.authenticate("local"), login)
index.get("/me", passport.authenticate("jwt", { session: false }), me)
index.post("/logout", passport.authenticate("jwt", { session: false }), logout)
index.put("/update", passport.authenticate("jwt", { session: false }), update)

export default index