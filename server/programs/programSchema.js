import mongoose from "mongoose"

const Schema = mongoose.Schema

const programSchema = new Schema({
    name: String,
    year: Number,
    abbreviation: String,
    sites: [],
    applied: Number,
    accepted: Number,
    completed: Number,
    retention: Number,
    attendance: Number,
    jobs: Number,
    techJobs: Number,
    archived: { type: Boolean, default: false }
})

export default programSchema
