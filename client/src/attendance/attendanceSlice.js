import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import attendanceService from './attendanceService'

const initialState = {
  loading: false,
  attendance: []
}

export const getAttendanceSummary = createAsyncThunk("attendance/getAttendanceSummary", async ({ token, abbreviation }) => {
  const response = await attendanceService.getAttendanceSummary(token, abbreviation)
  return response.data
})

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get attendance
      .addCase(getAttendanceSummary.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getAttendanceSummary.fulfilled, (state, action) => {
        state.attendance = action.payload.attendance
        state.loading = false
      })
      .addCase(getAttendanceSummary.rejected, (state, action) => {
        console.log("getAttendanceSummary.rejected")
        state.loading = false
        // Handle error state
      })


  },
})

export const { } = attendanceSlice.actions
export default attendanceSlice.reducer