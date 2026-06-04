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
  },
  getCompletedCount: async (token, { state, site } = {}) => {
    const segments = [state, site].filter(Boolean)
    const path = segments.length ? `/${segments.join("/")}` : ""
    return await axios.get(
      `${server}/program/students/completed${path}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },
  getAcceptedCount: async (token, { state, site } = {}) => {
    const segments = [state, site].filter(Boolean)
    const path = segments.length ? `/${segments.join("/")}` : ""
    return await axios.get(
      `${server}/program/students/accepted${path}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },
  getJobsCount: async (token, { state, site } = {}) => {
    const segments = [state, site].filter(Boolean)
    const path = segments.length ? `/${segments.join("/")}` : ""
    return await axios.get(
      `${server}/program/jobs${path}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },
}

export default programsService
