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
  getProgramById: async (token, id) => {
    return await axios.get(
      `${server}/program/id/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },
  createProgram: async (token, programData) => {
    return await axios.post(
      `${server}/program`,
      programData,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },
  updateProgram: async (token, id, programData) => {
    return await axios.put(
      `${server}/program/${id}`,
      programData,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },
  archiveProgram: async (token, id) => {
    return await axios.put(
      `${server}/program/${id}/archive`,
      {},
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
