import mongoose from "mongoose"

const Schema = mongoose.Schema

const studentSchema = new Schema({
  location: {
    state: { type: String, default: "" },
    address: { type: String, default: "" },
    prisonName: { type: String, default: "" },
    unitName: { type: String, default: "" }
  },
  classesTaken: [
    {
      startDate: { type: Date },
      endDate: { type: Date },
      cohortNumber: { type: Number },
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      skillsLearned: [String],
      modulesCompleted: { type: Number, default: 0 },
      projectsCompleted: { type: Number, default: 0 }
    },
  ],
  becameTA: { type: Boolean, default: false },
  incarceration: [
    {
      charges: [String],
      intakeDate: { type: Date },
      releaseDate: { type: Date },
      photoLink: { type: String, default: "" },
      docId: { type: String, default: "" }
    },
  ],
  prisonClassesAndPrograms: [
    {
      classOrProgram: { type: String, default: "" },
      instructor: { type: String, default: "" },
      institution: { type: String, default: "" }
    },
  ],
  releaseData: {
    caseManager: { type: String, default: "" },
    receivedLaptop: { type: Boolean, default: false },
    laptopDetails: { type: String, default: "" },
    receivedPhone: { type: Boolean, default: false },
    phoneDetails: { type: String, default: "" },
    reentryServices: [String],
  },
  jobsAfterRelease: [
    {
      jobTitle: { type: String, default: "" },
      companyName: { type: String, default: "" },
      startDate: { type: Date },
      endDate: { type: Date },
      salary: { type: Number, default: 0 },
      industry: { type: String, default: "" },
      isTechJob: { type: Boolean, default: false },
    },
  ],
  internshipsOrBootcamps: [
    {
      institution: { type: String, default: "" },
      title: { type: String, default: "" },
      startDate: { type: Date },
      endDate: { type: Date },
      salary: { type: Number, default: 0 },
      isTechInternship: { type: Boolean, default: false },
    },
  ],
  education: [
    {
      degree: { type: String, default: "" },
      institution: { type: String, default: "" },
      graduationDate: { type: Date },
    },
  ],
  links: {
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    resume: { type: String, default: "" },
    portfolio: { type: String, default: "" },
  },
})

export default studentSchema