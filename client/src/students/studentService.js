import axios from "axios"
import { server } from "../utils/utils"

const studentService = {
  getAllStudents: async (token) => {
    return await axios.get(
      `${server}/student`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },
  getStudents90Day: async (token, caseManager) => {
    let url = `${server}/student/90day`
    if (caseManager) url = `${server}/student/90day/${caseManager}`
    return await axios.get(
      url,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },
  getStudentsCaseManager: async (token, caseManager) => {
    return await axios.get(
      `${server}/student/case-manager/${caseManager}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },
  getStudentById: async (token, id) => {
    return await axios.get(
      `${server}/student/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },
  getDaysToJob: async (token) => {
    return await axios.get(
      `${server}/student/days-to-job`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },
  getLaptopsGiven: async (token, state, site) => {
    let url = `${server}/student/laptops-given`
    if (state) url += `/${state}`
    if (state && site) url += `/${site}`
    return await axios.get(
      url,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },
  createStudent: async (token, studentData) => {
    return await axios.post(
      `${server}/student`,
      studentData,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },
  updateStudent: async (token, id, studentData) => {
    return await axios.put(
      `${server}/student/${id}`,
      studentData,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },
  archiveStudent: async (token, id) => {
    return await axios.put(
      `${server}/student/${id}`,
      { archived: true },
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },
}

export default studentService
