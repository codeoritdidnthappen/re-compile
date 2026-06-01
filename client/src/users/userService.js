import axios from "axios"

const userService = {
  getAllUsers: async (token) => {
    return await axios.get(
      `${import.meta.env.VITE_API_SERVER_URL}/user`, 
      { headers: { Authorization: `Bearer ${token}` } }
    )
  }
}

export default userService
