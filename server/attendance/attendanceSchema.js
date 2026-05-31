import mongoose from "mongoose"

const Schema = mongoose.Schema

const attendanceSchema = new Schema({
    className: String,
    classType: String,
    location: { city: String, state: String, zip: String },
    cohort: Number,
    classDate: Date,
    session: Boolean,
    sessionReason: String,
    attendanceTotal: Number,
    totalStudents: Number,
    totalPossibleDaily: Number,
    attendanceRateDaily: Number,
    students: [ {
      docId: String,
      firstName: String,
      lastName: String,
      position: String,
      status: String,
      attendance: {}
    } ]
})

export default attendanceSchema
