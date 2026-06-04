import "dotenv/config"
import axios from "axios"
import { generateGrantsFromAll } from "./generateGrants.js"

const grants = generateGrantsFromAll()

let interval = null
let index = 0

const createGrant = async () => {
  if (index < grants.length) {
    console.log("Seeding grant:", grants[index].name)
    const response = await axios.post(`${process.env.SERVER_URL}/grant`, grants[index])
    console.log("response.data", response.data)
    index++
  } else {
    clearInterval(interval)
    console.log(`Done. Seeded ${grants.length} grants.`)
  }
}

interval = setInterval(createGrant, 1000)
