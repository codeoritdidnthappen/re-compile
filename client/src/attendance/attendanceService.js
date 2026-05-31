import axios from "axios"
import { server } from "../utils/utils"

const attendanceService = {
  getAttendance: async (token) => {
    return await axios.get(
      `${server}/attendance`, 
      { headers: { Authorization: `Bearer ${token}` } }
    )
  }
}

export default attendanceService
