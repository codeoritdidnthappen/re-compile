import "dotenv/config"
import express from "express"
import logger from "./logger.js"
import cors from "cors"
import mongoose from "mongoose"
import passport from "passport"
import cookieParser from "cookie-parser"
import session from "express-session"
import "./strategies/local.js"
import "./strategies/jwt.js"
import authIndex from "./auth/index.js"
import userIndex from "./users/userIndex.js"
import studentIndex from "./students/studentIndex.js"
import classIndex from "./class/classIndex.js"
import attendanceIndex from "./attendance/attendanceIndex.js"
import programIndex from "./programs/programIndex.js"
import grantIndex from "./grants/grantIndex.js"
import siteIndex from "./sites/siteIndex.js"

const app = express()
const port = process.env.PORT || 8000
const cookieSecret = process.env.COOKIE_SECRET || "secret"
const sessionSecret = process.env.SESSION_SECRET || "secret"

app.use(express.json())
app.use(cookieParser(cookieSecret))
app.use(cors())
app.disable("x-powered-by")

// Session
app.use(session({ secret: sessionSecret, resave: false,  saveUninitialized: true }))

// Passport config
app.use(passport.initialize())
app.use(passport.session())

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.use("/auth", authIndex)
app.use("/user", userIndex)
app.use("/student", studentIndex)
app.use("/class", classIndex)
app.use("/attendance", attendanceIndex)
app.use("/program", programIndex)
app.use("/grant", grantIndex)
app.use("/site", siteIndex)

try {
  const mongodbURI = process.env.MONGODB_URI || ""
  await mongoose.connect(mongodbURI)
  logger.info(`App connected to database.`)

  app.listen(port, () => {
    logger.info(`App listening on port ${port}`)
  })
}
catch (err) {
  logger.fatal(err, "Failed to start server")
}