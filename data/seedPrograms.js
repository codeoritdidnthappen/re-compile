import "dotenv/config"
import axios from "axios"
import { generatePrograms } from "./generatePrograms.js"

const numberOf = 1
const states = [
  { name: "Arizona", abbreviation: "AZ" },
  { name: "Florida", abbreviation: "FL" },
  { name: "Massachusetts", abbreviation: "MA" },
  { name: "Nebraska", abbreviation: "NE" },
  { name: "South Carolina", abbreviation: "SC" }
]
// const params = { state: states[index], year: 2026 }
// const programs = await generatePrograms(numberOf, ...Object.values(params))
// console.log("programs", programs)

let interval = null
let index = 1

const createProgram = async () => {
  if (index < states.length) {
    const params = { state: states[index], year: 2026 }
    const program = await generatePrograms(numberOf, ...Object.values(params))
    console.log("program", program)
    const response = await axios.post(`${process.env.SERVER_URL}/program`, program[0])
    console.log("response.data", response.data)
    index++
  }
  else {
    clearInterval(interval)
  }
}

interval = setInterval(createProgram, 1000)