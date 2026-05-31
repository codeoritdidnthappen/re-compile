import mongoose from "mongoose"

const Schema = mongoose.Schema

const classSchema = new Schema({
    className: String,
    classType: String,
    location: { city: String, state: String, zip: String },
    complex: String,
    unit: String,
    staff: [ {
      role: String,
      firstName: String,
      lastName: String,
      location: { city: String, state: String, zip: String },
      remote: Boolean,
      hybrid: Boolean,
      startDate: Date,
      endDate: Date
    } ],
    currentCohort: Number,
    startDate: Date,
    endDate: Date
})

export default classSchema
