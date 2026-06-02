import axios from "axios"
import { server } from "../utils/utils"

const attendanceService = {
  getAttendanceSummary: async (token, abbreviation) => {
    return await axios.get(
      `${server}/attendance/summary/${abbreviation}`, 
      { headers: { Authorization: `Bearer ${token}` } }
    )
  }
}

export default attendanceService
