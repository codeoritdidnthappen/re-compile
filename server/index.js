import "dotenv/config"
import express from "express"
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

try {
  const mongodbURI = process.env.MONGODB_URI || ""
  await mongoose.connect(mongodbURI)
  console.log(`Login app connected to database at ${mongodbURI}`)

  app.listen(port, () => {
    console.log(`Login app listening on port ${port}`)
  })
}
catch (err) {
  console.log(err) // TODO: put safe error message
}