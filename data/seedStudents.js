import "dotenv/config"
import axios from "axios"
import { generateStudents } from "./generateStudents.js"

const numberOf = 1
const params = { location: { site: "Perryville", unit: "San Carlos", address: "4059 Main Street", state: "Arizona" }, gender: "female", classes: [{
    startDate: new Date("2025-07-08"),
    endDate: new Date("2026-06-30"),
    cohort: 7,
    title: "Full Stack Development",
    description: "comprehensive training in building complete web applications from start to finish, encompassing both user-facing interfaces, server-side infrastructure and databases, using the MERN stack.",
    skillsLearned: [ "HTML", "CSS", "JavaScript", "React", "Node.js", "Express.js", "MongoDB", "PostgreSQL", "Git", "Tailwind" ],
    modulesCompleted: null,
    projectsCompleted: 19,
  }] }
const students = await generateStudents(numberOf, ...Object.values(params))
// console.log("students", students)

let interval = null
let index = 0

const createStudent = async () => {
  if (index < numberOf) {
    console.log(students[index])
    const response = await axios.post(`${process.env.SERVER_URL}/student`, students[index])
    console.log("response.data", response.data)
    index++
  }
  else {
    clearInterval(interval)
  }
}
interval = setInterval(createStudent, 1000)