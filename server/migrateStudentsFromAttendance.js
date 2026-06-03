import "dotenv/config"
import mongoose from "mongoose"
import attendanceModel from "./attendance/attendanceModel.js"
import studentModel from "./students/studentModel.js"

const generateDocId = () => {
  const letter = String.fromCharCode(97 + Math.floor(Math.random() * 26))
  const num = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000
  return `${letter}${num}`
}

const parseState = (siteId = "") => {
  const prefix = siteId.split("-")[0].toUpperCase()
  const stateMap = { AZ: "AZ", FL: "FL", MA: "MA", NE: "NE", SC: "SC" }
  return stateMap[prefix] || prefix
}

const mongodbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/recompile"
await mongoose.connect(mongodbURI)
console.log("Connected to MongoDB")

const attendances = await attendanceModel.find({})

// Collect unique students from all attendance records, keeping the first-seen site info
const studentMap = new Map() // key: "firstName|lastName"
for (const attendance of attendances) {
  const { site, siteId } = attendance.metadata || {}
  const state = parseState(siteId)
  for (const student of attendance.students) {
    const key = `${student.firstName}|${student.lastName}`
    if (!studentMap.has(key)) {
      studentMap.set(key, {
        firstName: student.firstName,
        lastName: student.lastName,
        status: student.status || "",
        site: site || "",
        state,
      })
    }
  }
}
console.log(`Found ${studentMap.size} unique students in attendances`)

// Map existing students by name so we can reuse their docId
const existingStudents = await studentModel.find({})
const existingByName = new Map()
for (const s of existingStudents) {
  existingByName.set(`${s.firstName}|${s.lastName}`, s)
}

// Build a docId for every attendance student (new docId or existing one)
const docIdByKey = new Map()
const toInsert = []

for (const [key, info] of studentMap) {
  const existing = existingByName.get(key)
  if (existing) {
    docIdByKey.set(key, existing.docId)
  } else {
    const docId = generateDocId()
    docIdByKey.set(key, docId)
    const isTA = info.status.toLowerCase().includes("aide")
    toInsert.push({
      docId,
      firstName: info.firstName,
      middleInitial: "",
      lastName: info.lastName,
      teachingAssistant: isTA,
      location: { state: info.state, address: "", site: info.site, unit: "" },
      classesTaken: [],
      incarceration: [],
      workPrograms: [],
      releaseData: {
        caseManager: "",
        receivedLaptop: false,
        laptopDetails: "",
        receivedPhone: false,
        phoneDetails: "",
        reentryServices: [],
      },
      jobsAfterRelease: [],
      internshipsOrBootcamps: [],
      education: [],
      links: { linkedin: "", github: "", resume: "", portfolio: "" },
    })
  }
}

console.log(`Inserting ${toInsert.length} new students (${existingStudents.length} already existed)...`)
if (toInsert.length > 0) {
  await studentModel.insertMany(toInsert)
  console.log(`Inserted ${toInsert.length} students`)
}

// Update docId on every student subdocument in every attendance record
console.log("Updating attendance student docIds...")
let updatedDocs = 0
let updatedEntries = 0
for (const attendance of attendances) {
  let modified = false
  for (const student of attendance.students) {
    const key = `${student.firstName}|${student.lastName}`
    const docId = docIdByKey.get(key)
    if (docId && student.docId !== docId) {
      student.docId = docId
      modified = true
      updatedEntries++
    }
  }
  if (modified) {
    await attendance.save()
    updatedDocs++
  }
}

console.log(`Updated ${updatedEntries} student entries across ${updatedDocs} attendance documents`)
console.log("Migration complete!")
await mongoose.disconnect()
