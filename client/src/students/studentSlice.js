import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import studentService from "./studentService"

const initialState = {
  loading: false,
  students: [],
  sites: null,
  currentStudent: null
}

export const getAllStudents = createAsyncThunk("user/getAllStudents", async (token) => {
  const response = await studentService.getAllStudents(token)
  return response.data
})

export const getStudents90Day = createAsyncThunk("user/getStudents90Day", async ({ token, caseManager }) => {
  const response = await studentService.getStudents90Day(token, caseManager)
  return response.data
})

export const getStudentsCaseManager = createAsyncThunk("user/getStudentsCaseManager", async ({ token, caseManager }) => {
  const response = await studentService.getStudentsCaseManager(token, caseManager)
  return response.data
})

export const getStudentById = createAsyncThunk("user/getStudentById", async ({ token, id }) => {
  const response = await studentService.getStudentById(token, id)
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

      // Get summary of students with 90 days by case manager
      .addCase(getStudents90Day.pending, (state, action) => {
        // console.log("getStudents90Day.pending")
        state.loading = true
      })
      .addCase(getStudents90Day.fulfilled, (state, action) => {
        console.log("getStudents90Day.fulfilled", action.payload)
        state.sites = action.payload.sites
        state.loading = false
      })
      .addCase(getStudents90Day.rejected, (state, action) => {
        console.log("getStudents90Day.rejected", action.error)
        state.loading = false
        // Handle error state
      })

      // Get all not released students by case manager
      .addCase(getStudentsCaseManager.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getStudentsCaseManager.fulfilled, (state, action) => {
        state.students = action.payload.students
        state.loading = false
      })
      .addCase(getStudentsCaseManager.rejected, (state, action) => {
        console.log("getStudentsCaseManager.rejected", action.error)
        state.loading = false
      })

      // Get single student by id
      .addCase(getStudentById.pending, (state) => {
        state.loading = true
      })
      .addCase(getStudentById.fulfilled, (state, action) => {
        state.currentStudent = action.payload.student
        state.loading = false
      })
      .addCase(getStudentById.rejected, (state, action) => {
        console.log("getStudentById.rejected", action.error)
        state.loading = false
      })

  },
})

export const { } = studentSlice.actions
export default studentSlice.reducer