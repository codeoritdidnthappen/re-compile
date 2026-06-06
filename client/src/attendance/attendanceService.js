import axios from "axios"
import { server } from "../utils/utils"

const attendanceService = {
  getAttendanceSummary: async (token, abbreviation) => {
    return await axios.get(
      `${server}/attendance/summary/${abbreviation}`, 
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },
  getAttendanceSite: async (token, site, month) => {
    return await axios.get(
      `${server}/attendance/site/${site}/${month}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },
  getWeekly: async (token) => {
    return await axios.get(
      `${server}/attendance/weekly`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  }
}

export default attendanceService
