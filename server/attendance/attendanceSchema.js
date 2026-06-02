import mongoose from "mongoose"

const Schema = mongoose.Schema

const attendanceSchema = new Schema({
    month: String,
    metadata: {
        site: String,
        siteId: String,
        instructor: String,
        teachingAssistant: String,
        supportSpecialist: String,
        crc: String,
        classDays: String,
        classHours: String,
        address: String,
        cityState: String,
        students: Number,
        studentAides: Number,
        studentsAdded: Number,
        studentsDropped: Number,
        totalAttendees: Number,
        totalAbsentees: Number,
        totalPossible: Number,
        attendanceRate: Number
    },
    students: [ {
        lastName: String,
        firstName: String,
        docId: String,
        status: String,
        attendance: Schema.Types.Mixed
    } ],
    classDays: [ {
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
        attendanceRateDaily: Number
    } ]
})

export default attendanceSchema
