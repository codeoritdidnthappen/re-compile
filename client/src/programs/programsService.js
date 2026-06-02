import axios from "axios"
import { server } from "../utils/utils"

const programsService = {
  getPrograms: async (token, year) => {
    return await axios.get(
      `${server}/program/${year}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },
  getProgram: async (token, stateName) => {
    return await axios.get(
      `${server}/program/state/${stateName}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  }
}

export default programsService
