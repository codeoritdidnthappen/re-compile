import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import studentService from "./studentService"

const initialState = {
  loading: false,
  students: [],
  sites: null,
  currentStudent: null,
  daysToJobAvg: null
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

export const getDaysToJob = createAsyncThunk("user/getDaysToJob", async ({ token }) => {
  const response = await studentService.getDaysToJob(token)
  return response.data
})

export const createStudent = createAsyncThunk("user/createStudent", async ({ token, studentData }) => {
  const response = await studentService.createStudent(token, studentData)
  return response.data
})

export const updateStudent = createAsyncThunk("user/updateStudent", async ({ token, id, studentData }) => {
  const response = await studentService.updateStudent(token, id, studentData)
  return response.data
})

export const archiveStudent = createAsyncThunk("user/archiveStudent", async ({ token, id }) => {
  const response = await studentService.archiveStudent(token, id)
  return response.data
})

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    clearCurrentStudent: (state) => {
      state.currentStudent = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Get all students
      .addCase(getAllStudents.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllStudents.fulfilled, (state, action) => {
        state.students = action.payload.students
        state.loading = false
      })
      .addCase(getAllStudents.rejected, (state) => {
        state.loading = false
      })

      // Get summary of students with 90 days by case manager
      .addCase(getStudents90Day.pending, (state) => {
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
      })

      // Get all not released students by case manager
      .addCase(getStudentsCaseManager.pending, (state) => {
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

      // Get average days to job after release
      .addCase(getDaysToJob.pending, (state) => {
        state.loading = true
      })
      .addCase(getDaysToJob.fulfilled, (state, action) => {
        console.log("getDaysToJob.fulfilled", action.payload)
        state.daysToJobAvg = parseInt(action.payload.averageDays)
        state.loading = false
      })
      .addCase(getDaysToJob.rejected, (state, action) => {
        console.log("getDaysToJob.rejected", action.error)
        state.loading = false
      })

      // Create student
      .addCase(createStudent.pending, (state) => {
        state.loading = true
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.currentStudent = action.payload.student
        state.loading = false
      })
      .addCase(createStudent.rejected, (state, action) => {
        console.log("createStudent.rejected", action.error)
        state.loading = false
      })

      // Update student
      .addCase(updateStudent.pending, (state) => {
        state.loading = true
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.currentStudent = action.payload.student
        state.loading = false
      })
      .addCase(updateStudent.rejected, (state, action) => {
        console.log("updateStudent.rejected", action.error)
        state.loading = false
      })

      // Archive student
      .addCase(archiveStudent.pending, (state) => {
        state.loading = true
      })
      .addCase(archiveStudent.fulfilled, (state, action) => {
        state.currentStudent = action.payload.student
        state.loading = false
      })
      .addCase(archiveStudent.rejected, (state, action) => {
        console.log("archiveStudent.rejected", action.error)
        state.loading = false
      })
  },
})

export const { clearCurrentStudent } = studentSlice.actions
export default studentSlice.reducer
