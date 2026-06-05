import axios from "axios"

const userService = {
  getAllUsers: async (token) => {
    return await axios.get(
      `${import.meta.env.VITE_API_SERVER_URL}/user`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },
  createUser: async (userData) => {
    return await axios.post(
      `${import.meta.env.VITE_API_SERVER_URL}/user`,
      userData
    )
  },
}

export default userService
