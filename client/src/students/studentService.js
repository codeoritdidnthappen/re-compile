import axios from "axios"
import { server } from "../utils/utils"

const studentService = {
  getAllStudents: async (token) => {
    return await axios.get(
      `${server}/student`, 
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },
  getStudents90Day: async (token) => {
    return await axios.get(
      `${server}/student/90day`, 
      { headers: { Authorization: `Bearer ${token}` } }
    )
  }
}

export default studentService
