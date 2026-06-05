import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import authService from './authService'

const initialState = {
  loading: true,
  isLoggedIn: false,
  user: {
    id: "",
    firstName: "",  
    lastName: "",
    email: "",  
    username: "",  
    password: "",  
    roles: [],
    tokens: [],
    cart: [],
    checkout: {
      user: {},
      address: {
        street1: "",
        street2: ""
      },
      payment: {
        creditCard: ""
      },
      error: []
    }
  },
  theme: ""
}

export const login = createAsyncThunk("auth/login", async (loginForm) => {
  const response = await authService.login(loginForm)
  return response.data
})

export const me = createAsyncThunk("auth/me", async (token) => {
  const response = await authService.me(token)
  return response.data
})

export const logout = createAsyncThunk("auth/logout", async (token) => {
  const response = await authService.logout(token)
  return response.data
})

export const update = createAsyncThunk("auth/update", async ({ product, operation, token }) => {
  const response = await authService.update(product, operation, token)
  return response.data
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload.loading
    },
    setTheme(state, action) {
      document.body.setAttribute("data-theme", action.payload.theme)
      state.theme = action.payload.theme
      localStorage.setItem("theme", action.payload.theme)
    },
    setCheckoutForm(state, action) {
      state.user.checkout = action.payload.checkout
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state, action) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.isLoggedIn = true
        localStorage.setItem("token", action.payload.token)
        state.loading = false
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        // Handle error state
      })

      // Me (verify logged in user)
      .addCase(me.pending, (state, action) => {
        state.loading = true
      })
      .addCase(me.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.isLoggedIn = true
        state.loading = false
      })
      .addCase(me.rejected, (state, action) => {
        state.loading = false
        // Handle error state
      })

      // Logout
      .addCase(logout.pending, (state, action) => {
        state.loading = true
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false
        state.isLoggedIn = false
        state.user = { id: "", firstName: "", lastName: "", email: "", username: "", password: "", roles: [], tokens: [] }
        localStorage.removeItem("token")
        localStorage.removeItem("location")
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false
        // Handle error state
      })

      // Update (cart)
      .addCase(update.pending, (state, action) => {
        state.loading = true
      })
      .addCase(update.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.loading = false
      })
      .addCase(update.rejected, (state, action) => {
        state.loading = false
        // Handle error state
      })

  },
})

export const { setLoading, setTheme, setCheckoutForm } = authSlice.actions
export default authSlice.reducer