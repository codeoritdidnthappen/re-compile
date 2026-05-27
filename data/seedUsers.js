import "dotenv/config"
import axios from "axios"
import { generateUsers } from "./generateUsers.js"

const numberOfUsers = 10
const users = generateUsers(numberOfUsers)

let interval = null
let index = 0

const createUser = async () => {
  if (index < numberOfUsers) {
    console.log(users[index])
    const response = await axios.post(`${process.env.SERVER_URL}/user`, users[index])
    console.log("response.data", response.data)
    index++
  }
  else {
    clearInterval(interval)
  }
}
interval = setInterval(createUser, 1000)