import mongoose from "mongoose"

const Schema = mongoose.Schema

const programSchema = new Schema({
    name: String,
    year: Number,
    abbreviation: String,
    sites: [{
        id:         { type: String, default: "" },
        name:       { type: String, default: "" },
        contract:   { type: String, default: "" },
        instructor: { type: String, default: "" },
        students:   { type: Number, default: 0 },
        archived:   { type: Boolean, default: false }
    }],
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
