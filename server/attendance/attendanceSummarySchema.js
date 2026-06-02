import mongoose from "mongoose"

const Schema = mongoose.Schema

const attendanceSummarySchema = new Schema({
  className: String,
  classType: String,
  location: {
    city: String,
    state: String,
    zip: String,
  },
  cohort: Number,
  classDate: Date,
  session: Boolean,
  sessionReason: String,
  attendanceTotal: Number,
  totalStudents: Number,
  totalPossibleDaily: Number,
  attendanceRateDaily: Number
})

export default attendanceSummarySchema
