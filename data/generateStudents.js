import { faker } from "@faker-js/faker"

const SITES = [ "Cibola", "Perryville", "Red Rock", "Whetstone", "FSP", "Lowell", "SRPC", "Wakulla", "NCCI" ]
const STATES = [ "AZ", "FL", "MA", "NE", "SC" ]
const CLASSES = [ "Full Stack Development", "Project Management", "Networking", "Cybersecurity", "A+ Cores 1 & 2", "Data Analytics" ]
const SKILLS = [ "HTML", "CSS", "JavaScript", "Python", "React", "Node.js", "SQL", "Git", "Linux", "AWS", "Tailwind", "Express.js" ]
const CHARGES = [ "NARCOTIC DRUG VIOLATION", "AGGRAVATED DUI", "ATTEMPTED AGGRAVATED ASSAULT", "AGGRAVATED ASSAULT", "CHILD/ADULT ABUSE", "ATTEMPTED DANGEROUS DRUG VIOLATION", "DANGEROUS DRUG VIOLATION", "MANSLAUGHTER", "CONSPIRACY DANGEROUS DRUG VIOLATION", "MISCONDUCT INVOLVING WEAPONS", "DRUG PARAPHERNALIA VIOLATION", "FAIL TO APPEAR FIRST DEGREE", "KIDNAPPING", "ATTEMPTED ORGANIZED RETAIL THEFT", "THEFT", "ATTEMPTED MONEY LAUNDERING", "TAKING IDENTITY OF ANOTHER", "ATTEMPTED UNLAWFUL USE OF MEANS OF TRANSPORTATION", "BURGLARY 2ND DEGREE", "BURGLARY 3RD DEGREE", "THEFT MEANS OF TRNSPRTATION", "ATTEMPTED SHOPLIFTING", "CRIM POSS FORGERY DEVICE" ]
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
const WORK_PROGRAMS_ED = [
  "Conflict Resolution", "New Beginnings Through Peers", "SA Ed-Think Straight", "Domestic Violence", "Cog/Think For A Change", "Changing Offender Behavior" ]
const REENTRY_SERVICES = [ "Housing Assistance", "Job Placement", "Mental Health", "Substance Abuse", "Family Reunification", "Transportation" ]
const DEGREES = [ "GED", "Associate's", "Bachelor's", "Certificate", "High School Diploma" ]
const INSTITUTIONS = [ "Community College", "State University", "Technical Institute", "Online Program" ]
const INDUSTRIES = [ "Technology", "Healthcare", "Finance", "Retail", "Construction", "Manufacturing", "Logistics" ]
const INTERNSHIPS = [ "Next Chapter", "Emergent Works", "The Fortune Society", "AWS She Builds", "Justice Through Code" ]

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const randomBool = (probability = 0.5) => Math.random() < probability
const randomSubset = (arr, min = 1, max = 3) => faker.helpers.arrayElements(arr, randomInt(min, max))

const generateClassesTaken = () => {
  return Array.from({ length: randomInt(1, 3) }, () => {
    const startDate = faker.date.between({ from: "2022-07-01", to: "2026-07-01" })
    const endDate = new Date(startDate)
    endDate.setMonth(endDate.getMonth() + randomInt(3, 12))
    return {
      startDate,
      endDate,
      cohort: randomInt(1, 20),
      title: faker.helpers.arrayElement(CLASSES),
      description: faker.lorem.sentence(),
      skillsLearned: randomSubset(SKILLS, 2, 5),
      modulesCompleted: randomInt(0, 30),
      projectsCompleted: randomInt(0, 10),
    }
  })
}

const generateIncarceration = () => {
  return Array.from({ length: randomInt(1, 2) }, () => {
    const sentenceDate = faker.date.between({ from: "2010-01-01", to: "2020-01-01" })
    const intakeDate = new Date(sentenceDate)
    intakeDate.setMonth(intakeDate.getMonth() + randomInt(1, 6))
    const releaseDate = new Date(intakeDate)
    releaseDate.setFullYear(releaseDate.getFullYear() + randomInt(1, 8))
    return {
      charges: randomSubset(CHARGES, 1, 3),
      sentenceDate,
      intakeDate,
      releaseDate,
      photoLink: "",
    }
  })
}

const generateWorkPrograms = () => {
  return Array.from({ length: randomInt(0, 4) }, () => {
    const program = WORK_PROGRAMS[randomInt(0, WORK_PROGRAMS.length - 1)]
    return {
      title: program.name,
      type: program.type,
      instructor: faker.person.fullName(),
      institution: faker.company.name()
    }
  })
}

const generateJobsAfterRelease = () => {
  Array.from({ length: randomInt(0, 3) }, () => {
    const startDate = faker.date.between({ from: "2020-01-01", to: "2025-01-01" })
    const endDate = randomBool(0.4) ? new Date(startDate.getTime() + randomInt(90, 730) * 86400000) : null
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
}

const generateInternshipsOrBootcamps = () => {
  Array.from({ length: randomInt(0, 2) }, () => {
    const startDate = faker.date.between({ from: "2021-01-01", to: "2025-01-01" })
    const endDate = new Date(startDate)
    endDate.setMonth(endDate.getMonth() + randomInt(3, 6))
    const isTechInternship = randomBool(0.6)
    return {
      institution: faker.company.name(),
      title: isTechInternship ? faker.helpers.arrayElement(CLASSES) : faker.person.jobTitle(),
      startDate,
      endDate,
      salary: randomInt(0, 25000),
      isTechInternship,
    }
  })}

const generateEducation = () => {
  Array.from({ length: randomInt(1, 2) }, () => ({
    degree: faker.helpers.arrayElement(DEGREES),
    institution: faker.helpers.arrayElement(INSTITUTIONS),
    graduationDate: faker.date.between({ from: "2005-01-01", to: "2023-01-01" }),
  }))
}

const generateStudent = (location, gender, classes) => {
  const sex = gender || faker.helpers.arrayElement([ "female", "male"])
  const firstName = faker.person.firstName(sex)
  const lastName = faker.person.lastName(sex)
  const middleInitial = faker.string.alpha({ length: 1, casing: "upper" })
  const hasLinkedin = randomBool(0.5)
  const hasGithub = randomBool(0.6)
  const hasResume = randomBool(0.4)
  const hasPortfolio = randomBool(0.3)

  return {
    docId: `${faker.string.alpha()}${faker.number.int({ min: 1000000, max: 9999999 })}`,
    firstName,
    middleInitial,
    lastName,
    teachingAssistant: randomBool(0.1),
    location: {
      state: location.state || faker.helpers.arrayElement(STATES),
      address: location.address || faker.location.streetAddress(),
      site: location.site || faker.helpers.arrayElement(SITES),
      unit: location.unit || faker.helpers.arrayElement(["A", "B", "C", "D", ""]),
    },
    classesTaken: classes || generateClassesTaken(),
    incarceration: generateIncarceration(),
    workPrograms: generateWorkPrograms(),
    releaseData: {
      caseManager: faker.person.fullName(),
      receivedLaptop: randomBool(0.7),
      laptopDetails: randomBool(0.7) ? faker.commerce.productName() : "",
      receivedPhone: randomBool(0.5),
      phoneDetails: randomBool(0.5) ? faker.commerce.productName() : "",
      reentryServices: randomSubset(REENTRY_SERVICES, 0, 4),
    },
    // jobsAfterRelease: generateJobsAfterRelease(),
    jobsAfterRelease: [],
    // internshipsOrBootcamps: generateInternshipsOrBootcamps(),
    internshipsOrBootcamps: [],
    // education: generateEducation(),
    education: [],
    links: {
      linkedin: hasLinkedin ? `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}-${randomInt(100, 999)}` : "",
      github: hasGithub ? `https://github.com/${firstName.toLowerCase()}${lastName.toLowerCase()}${randomInt(10, 99)}` : "",
      resume: hasResume ? faker.internet.url() : "",
      portfolio: hasPortfolio ? faker.internet.url() : "",
    },
  }
}

export const generateStudents = (length, location, gender, classes) => Array.from({ length }, (_, i) => generateStudent(location, gender, classes))
