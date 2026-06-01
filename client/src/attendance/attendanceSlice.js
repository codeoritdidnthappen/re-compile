import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import attendanceService from './attendanceService'

const initialState = {
  loading: false,
  attendance: []
}

export const getAttendance = createAsyncThunk("attendance/getAttendance", async ({ token }) => {
  const response = await attendanceService.getAttendance(token)
  return response.data
})

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get attendance
      .addCase(getAttendance.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getAttendance.fulfilled, (state, action) => {
        state.attendance = action.payload.attendance
        state.loading = false
      })
      .addCase(getAttendance.rejected, (state, action) => {
        console.log("getAttendance.rejected")
        state.loading = false
        // Handle error state
      })


  },
})

export const { } = attendanceSlice.actions
export default attendanceSlice.reducer