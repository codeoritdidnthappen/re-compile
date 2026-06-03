import axios from "axios"
import { server } from "../utils/utils"

const grantService = {
  getAllGrants: async (token) => {
    return await axios.get(
      `${server}/grant`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },
  getGrantById: async (token, id) => {
    return await axios.get(
      `${server}/grant/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  }
}

export default grantService
