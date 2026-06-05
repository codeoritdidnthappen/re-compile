import axios from "axios"
import { server } from "../utils/utils"

const sitesService = {
  getSites: async (token, programId) => {
    return await axios.get(
      `${server}/site/${programId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },
  getSite: async (token, programId, siteId) => {
    return await axios.get(
      `${server}/site/${programId}/${siteId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },
  createSite: async (token, programId, siteData) => {
    return await axios.post(
      `${server}/site/${programId}`,
      siteData,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },
  updateSite: async (token, programId, siteId, siteData) => {
    return await axios.put(
      `${server}/site/${programId}/${siteId}`,
      siteData,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },
  archiveSite: async (token, programId, siteId) => {
    return await axios.put(
      `${server}/site/${programId}/${siteId}/archive`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },
}

export default sitesService
