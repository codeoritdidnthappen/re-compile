import "dotenv/config"
import mongoose from "mongoose"
import { faker } from "@faker-js/faker"
import attendanceModel from "./attendance/attendanceModel.js"
import studentModel from "./students/studentModel.js"

// ─── Constants (from generateStudents.js) ────────────────────────────────────

const CLASSES = [
  "Full Stack Development", "Project Management", "Networking",
  "Cybersecurity", "A+ Cores 1 & 2", "Data Analytics"
]
const SKILLS = [
  "HTML", "CSS", "JavaScript", "Python", "React", "Node.js",
  "SQL", "Git", "Linux", "AWS", "Tailwind", "Express.js"
]
const CHARGES = [
  "NARCOTIC DRUG VIOLATION", "AGGRAVATED DUI", "ATTEMPTED AGGRAVATED ASSAULT",
  "AGGRAVATED ASSAULT", "CHILD/ADULT ABUSE", "ATTEMPTED DANGEROUS DRUG VIOLATION",
  "DANGEROUS DRUG VIOLATION", "MANSLAUGHTER", "CONSPIRACY DANGEROUS DRUG VIOLATION",
  "MISCONDUCT INVOLVING WEAPONS", "DRUG PARAPHERNALIA VIOLATION",
  "FAIL TO APPEAR FIRST DEGREE", "KIDNAPPING", "ATTEMPTED ORGANIZED RETAIL THEFT",
  "THEFT", "ATTEMPTED MONEY LAUNDERING", "TAKING IDENTITY OF ANOTHER",
  "ATTEMPTED UNLAWFUL USE OF MEANS OF TRANSPORTATION", "BURGLARY 2ND DEGREE",
  "BURGLARY 3RD DEGREE", "THEFT MEANS OF TRNSPRTATION", "ATTEMPTED SHOPLIFTING",
  "CRIM POSS FORGERY DEVICE"
]
const WORK_PROGRAMS = [
  { name: "Career PATHS", type: "Major Program" },
  { name: "Quality Customer Services", type: "Major Program" },
  { name: "Ashland University (AU) Bachelor's Degree", type: "Major Program" },
  { name: "DUI Tx", type: "Major Program" },
  { name: "Automotve Tech-Basic", type: "Major Program" },
  { name: "Constr-Electrc Basic", type: "Major Program" },
  { name: "MANAGING MONEY", type: "Education" },
  { name: "Conflict Resolution", type: "Education" },
  { name: "New Beginnings Through Peers", type: "Education" },
  { name: "SA Ed-Think Straight", type: "Education" },
  { name: "Domestic Violence", type: "Education" },
  { name: "Cog/Think For A Change", type: "Education" },
  { name: "Changing Offender Behavior", type: "Education" }
]
const REENTRY_SERVICES = [
  "Housing Assistance", "Job Placement", "Mental Health",
  "Substance Abuse", "Family Reunification", "Transportation"
]
const DEGREES = ["GED", "Associate's", "Bachelor's", "Certificate", "High School Diploma"]
const INSTITUTIONS = ["Community College", "State University", "Technical Institute", "Online Program"]
const INDUSTRIES = ["Technology", "Healthcare", "Finance", "Retail", "Construction", "Manufacturing", "Logistics"]
const INTERNSHIP_ORGS = ["Next Chapter", "Emergent Works", "The Fortune Society", "AWS She Builds", "Justice Through Code"]
const STATES = ["AZ", "FL", "MA", "NE", "SC"]

// Site → state lookup. Partial string match so "Perryville-Complex I" still maps.
const SITE_STATE_MAP = {
  "Perryville": "AZ",
  "Cibola": "AZ",
  "Red Rock": "AZ",
  "Whetstone": "AZ",
  "Douglas": "AZ",
  "FSP": "FL",
  "Lowell": "FL",
  "Wakulla": "FL",
  "NCCI": "MA",
  "SRPC": "MA",
  "Leath": "SC",
  "Broad River": "SC",
  "Omaha": "NE",
  "Lincoln": "NE",
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const randomBool = (p = 0.5) => Math.random() < p
const randomSubset = (arr, min = 1, max = 3) =>
  faker.helpers.arrayElements(arr, randomInt(min, max))

const deriveState = (siteName) => {
  if (!siteName) return faker.helpers.arrayElement(STATES)
  for (const [key, state] of Object.entries(SITE_STATE_MAP)) {
    if (siteName.toLowerCase().includes(key.toLowerCase())) return state
  }
  return faker.helpers.arrayElement(STATES)
}

const buildIncarceration = (future = true) => {
  const sentenceDate = faker.date.between({ from: "2010-01-01", to: "2020-01-01" })
  const intakeDate = new Date(sentenceDate)
  intakeDate.setMonth(intakeDate.getMonth() + randomInt(1, 6))
  const releaseDate = future
    ? new Date(Date.now() + randomInt(180, 1825) * 86_400_000)   // 6 months–5 years out
    : new Date(intakeDate.getFullYear() + randomInt(1, 5), intakeDate.getMonth(), intakeDate.getDate())
  return {
    charges: randomSubset(CHARGES, 1, 3),
    sentenceDate,
    intakeDate,
    releaseDate,
    photoLink: faker.internet.url(),
  }
}

const buildWorkPrograms = () =>
  Array.from({ length: randomInt(1, 4) }, () => {
    const prog = WORK_PROGRAMS[randomInt(0, WORK_PROGRAMS.length - 1)]
    return {
      title: prog.name,
      type: prog.type,
      instructor: faker.person.fullName(),
      institution: faker.company.name(),
    }
  })

const buildJobsAfterRelease = () =>
  Array.from({ length: randomInt(1, 3) }, () => {
    const startDate = faker.date.between({ from: "2020-01-01", to: "2025-01-01" })
    const endDate = randomBool(0.4)
      ? new Date(startDate.getTime() + randomInt(90, 730) * 86_400_000)
      : new Date()
    const isTechJob = randomBool(0.35)
    return {
      jobTitle: faker.person.jobTitle(),
      companyName: faker.company.name(),
      startDate,
      endDate,
      salary: randomInt(28000, 120000),
      industry: isTechJob ? "Technology" : faker.helpers.arrayElement(INDUSTRIES),
      isTechJob,
    }
  })

const buildInternships = () =>
  Array.from({ length: randomInt(1, 2) }, () => {
    const startDate = faker.date.between({ from: "2021-01-01", to: "2025-01-01" })
    const endDate = new Date(startDate)
    endDate.setMonth(endDate.getMonth() + randomInt(3, 6))
    const isTechInternship = randomBool(0.6)
    return {
      institution: faker.helpers.arrayElement(INTERNSHIP_ORGS),
      title: isTechInternship
        ? faker.helpers.arrayElement(CLASSES)
        : faker.person.jobTitle(),
      startDate,
      endDate,
      salary: randomInt(0, 25000),
      isTechInternship,
    }
  })

const buildEducation = () =>
  Array.from({ length: randomInt(1, 2) }, () => ({
    degree: faker.helpers.arrayElement(DEGREES),
    institution: faker.helpers.arrayElement(INSTITUTIONS),
    graduationDate: faker.date.between({ from: "2005-01-01", to: "2023-01-01" }),
  }))

// ─── Main ─────────────────────────────────────────────────────────────────────

const main = async () => {
  const mongodbURI = process.env.MONGODB_URI || ""
  await mongoose.connect(mongodbURI)
  console.log(`Connected to ${mongodbURI}`)

  // ── 1. Load all attendance documents ──────────────────────────────────────
  // .lean() returns raw MongoDB POJOs so non-schema field names (e.g. docNumber
  // from the original Excel import) are visible alongside schema-defined ones.
  const allAttendance = await attendanceModel.find().lean()
  console.log(`Loaded ${allAttendance.length} attendance documents`)

  // ── 2. Collect unique students (key = old docId or docNumber) ─────────────
  // Keep the metadata from the first appearance of each student.
  const uniqueStudents = new Map()

  for (const attDoc of allAttendance) {
    const { site, address } = attDoc.metadata
    // Use cohort from the first classDay entry in this document if available
    const cohort = attDoc.classDays?.[0]?.cohort ?? null

    for (const attStudent of attDoc.students) {
      // Attendance data may store this field as either docId or docNumber
      const oldId = attStudent.docId || attStudent.docNumber
      if (!oldId || uniqueStudents.has(oldId)) continue

      uniqueStudents.set(oldId, {
        firstName: attStudent.firstName || faker.person.firstName(),
        lastName: attStudent.lastName || faker.person.lastName(),
        oldId,
        site: site || "",
        address: address || "",
        cohort,
      })
    }
  }

  console.log(`Found ${uniqueStudents.size} unique students across attendance records`)

  // ── 3. Determine which students are already in the students collection ─────
  // After a prior run the attendance docId will already be the new format and
  // will exist in the students collection — skip those to stay idempotent.
  const existingDocIds = new Set(
    (await studentModel.find({}, { docId: 1 }).lean()).map((s) => s.docId)
  )
  console.log(`Students collection already has ${existingDocIds.size} records`)

  // ── 4. Insert new students and update attendance ───────────────────────────
  let inserted = 0
  let skipped = 0

  for (const [oldId, info] of uniqueStudents) {
    if (existingDocIds.has(oldId)) {
      skipped++
      continue
    }

    const firstName = info.firstName
    const lastName = info.lastName
    const newDocId = `${faker.string.alpha()}${faker.number.int({ min: 1000000, max: 9999999 })}`

    const studentDoc = {
      docId: newDocId,
      firstName,
      middleInitial: faker.string.alpha({ length: 1, casing: "upper" }),
      lastName,
      teachingAssistant: randomBool(0.1),
      location: {
        state: deriveState(info.site),
        address: info.address || faker.location.streetAddress(),
        site: info.site || faker.helpers.arrayElement(["Cibola", "Perryville", "Red Rock", "Whetstone", "FSP", "Lowell", "SRPC", "Wakulla", "NCCI"]),
        unit: faker.helpers.arrayElement(["A", "B", "C", "D", "E"]),
      },
      classes: [{
        startDate: new Date("2025-07-08"),
        endDate: new Date("2026-06-30"),
        cohort: info.cohort ?? randomInt(5, 8),
        title: faker.helpers.arrayElement(CLASSES),
        description: faker.lorem.sentence(),
        skillsLearned: randomSubset(SKILLS, 2, 5),
        modulesCompleted: randomInt(1, 30),
        projectsCompleted: randomInt(1, 10),
      }],
      incarceration: buildIncarceration(true),
      previousIncarceration: randomBool(0.4) ? [buildIncarceration(false)] : [],
      workPrograms: buildWorkPrograms(),
      releaseData: {
        caseManager: faker.person.fullName(),
        receivedLaptop: randomBool(0.7),
        laptopDetails: faker.commerce.productName(),
        receivedPhone: randomBool(0.5),
        phoneDetails: faker.commerce.productName(),
        reentryServices: randomSubset(REENTRY_SERVICES, 1, 4),
      },
      jobsAfterRelease: buildJobsAfterRelease(),
      internshipsOrBootcamps: buildInternships(),
      education: buildEducation(),
      links: {
        linkedin: `https://linkedin.com/in/${firstName.toLowerCase().replace(/\s+/g, "-")}-${lastName.toLowerCase().replace(/\s+/g, "-")}-${randomInt(100, 999)}`,
        github: `https://github.com/${firstName.toLowerCase().replace(/\s+/g, "")}${lastName.toLowerCase().replace(/\s+/g, "")}${randomInt(10, 99)}`,
        resume: faker.internet.url(),
        portfolio: faker.internet.url(),
      },
    }

    await studentModel.create(studentDoc)
    existingDocIds.add(newDocId)
    inserted++

    // Update every attendance doc that references this student's old id.
    // Cover both field names — the schema says docId but Excel imports may have used docNumber.
    await attendanceModel.updateMany(
      { "students.docId": oldId },
      { $set: { "students.$[elem].docId": newDocId } },
      { arrayFilters: [{ "elem.docId": oldId }] }
    )
    await attendanceModel.updateMany(
      { "students.docNumber": oldId },
      { $set: { "students.$[elem].docNumber": newDocId } },
      { arrayFilters: [{ "elem.docNumber": oldId }] }
    )

    if (inserted % 10 === 0) console.log(`  inserted ${inserted}…`)
  }

  console.log(`\nDone. Inserted: ${inserted}  |  Skipped (already existed): ${skipped}`)
  await mongoose.disconnect()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
