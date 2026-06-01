import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import studentService from "./studentService"

const initialState = {
  loading: false,
  students: []
}

export const getAllStudents = createAsyncThunk("user/getAllStudents", async (token) => {
  const response = await studentService.getAllStudents(token)
  return response.data
})

export const getStudents90Day = createAsyncThunk("user/getStudents90Day", async (token) => {
  const response = await studentService.getStudents90Day(token)
  return response.data
})

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all students
      .addCase(getAllStudents.pending, (state, action) => {
        // console.log("getAllStudents.pending")
        state.loading = true
      })
      .addCase(getAllStudents.fulfilled, (state, action) => {
        // console.log("getAllStudents.fulfilled", action.payload)
        state.students = action.payload.students
        state.loading = false
      })
      .addCase(getAllStudents.rejected, (state, action) => {
        // console.log("getAllStudents.rejected", action.error)
        state.loading = false
        // Handle error state
      })

      // Get students with 90 days
      .addCase(getStudents90Day.pending, (state, action) => {
        // console.log("getStudents90Day.pending")
        state.loading = true
      })
      .addCase(getStudents90Day.fulfilled, (state, action) => {
        console.log("getStudents90Day.fulfilled", action.payload)
        state.students = action.payload.students
        state.loading = false
      })
      .addCase(getStudents90Day.rejected, (state, action) => {
        console.log("getStudents90Day.rejected", action.error)
        state.loading = false
        // Handle error state
      })


  },
})

export const { } = studentSlice.actions
export default studentSlice.reducer