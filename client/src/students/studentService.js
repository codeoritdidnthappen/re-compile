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
  }
}

export default studentService
