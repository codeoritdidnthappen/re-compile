import mongoose from "mongoose"

const Schema = mongoose.Schema

const programSchema = new Schema({
    name: String,
    year: Number,
    abbreviation: String,
    applied: Number,
    accepted: Number,
    completed: Number,
    retention: Number,
    attendance: Number,
    jobs: Number,
    techJobs: Number
})

export default programSchema
