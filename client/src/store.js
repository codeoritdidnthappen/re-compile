import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth/authSlice"
import userReducer from "./users/userSlice"
import studentReducer from "./students/studentSlice"
import attendanceReducer from "./attendance/attendanceSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    students: studentReducer,
    attendance: attendanceReducer
  },
})