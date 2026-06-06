import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import attendanceService from './attendanceService'

const initialState = {
  loading: false,
  attendanceSummary: null,
  attendance: null,
  months: [],
  weekly: [],
}

export const getAttendanceSummary = createAsyncThunk("attendance/getAttendanceSummary", async ({ token, abbreviation }) => {
  const response = await attendanceService.getAttendanceSummary(token, abbreviation)
  return response.data
})

export const getAttendanceSite = createAsyncThunk("attendance/getAttendanceSite", async ({ token, site, month }) => {
  const response = await attendanceService.getAttendanceSite(token, site, month)
  return response.data
})

export const getWeekly = createAsyncThunk("attendance/getWeekly", async ({ token }) => {
  const response = await attendanceService.getWeekly(token)
  return response.data
})

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get attendance summary
      .addCase(getAttendanceSummary.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getAttendanceSummary.fulfilled, (state, action) => {
        state.attendanceSummary = action.payload.attendance
        state.loading = false
      })
      .addCase(getAttendanceSummary.rejected, (state, action) => {
        // console.log("getAttendanceSummary.rejected", action.error)
        state.loading = false
        // Handle error state
      })

    builder
      // Get attendance by site
      .addCase(getAttendanceSite.pending, (state, action) => {
        state.attendance = null // Reset
        state.loading = true
      })
      .addCase(getAttendanceSite.fulfilled, (state, action) => {
        state.attendance = action.payload.attendance
        state.months = action.payload.months ?? []
        state.loading = false
      })
      .addCase(getAttendanceSite.rejected, (state) => {
        state.loading = false
      })

    builder
      .addCase(getWeekly.pending, (state) => { state.loading = true })
      .addCase(getWeekly.fulfilled, (state, action) => {
        state.weekly = action.payload.weekly
        state.loading = false
      })
      .addCase(getWeekly.rejected, (state) => { state.loading = false })
  },
})

export const { } = attendanceSlice.actions
export default attendanceSlice.reducer