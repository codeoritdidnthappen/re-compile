import axios from 'axios'

const authService = {
  login: async (loginForm) => {
    return await axios.post(
      `${import.meta.env.VITE_API_SERVER_URL}/auth/login`, 
      loginForm
    )
  },
  me: async (token) => {
    return await axios.get(
      `${import.meta.env.VITE_API_SERVER_URL}/auth/me`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },
  logout: async (token) => {
    return await axios.post(
      `${import.meta.env.VITE_API_SERVER_URL}/auth/logout`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },
  update: async (product, operation, token) => {
    return await axios.put(
      `${import.meta.env.VITE_API_SERVER_URL}/auth/update`,
      { product, operation },
      { headers: { Authorization: `Bearer ${token}` } }
    )
  }
}

export default authService
