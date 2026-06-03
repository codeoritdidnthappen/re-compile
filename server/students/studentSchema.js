import mongoose from "mongoose"

const Schema = mongoose.Schema

const studentSchema = new Schema({
  docId: { type: String, default: "" },
  firstName: { type: String, default: "" },
  middleInitial: { type: String, default: "" },
  lastName: { type: String, default: "" },
  teachingAssistant: { type: Boolean, default: false },
  location: {
    state: { type: String, default: "" },
    address: { type: String, default: "" },
    site: { type: String, default: "" },
    unit: { type: String, default: "" }
  },
  classes: [
    {
      startDate: { type: Date },
      endDate: { type: Date },
      cohort: { type: Number },
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      skillsLearned: [ String ],
      modulesCompleted: { type: Number, default: 0 },
      projectsCompleted: { type: Number, default: 0 }
    },
  ],
  incarceration: {
    charges: [String],
    sentenceDate: { type: Date },
    intakeDate: { type: Date },
    releaseDate: { type: Date },
    photoLink: { type: String, default: "" }
  },
  previousIncarceration: [
    {
      charges: [String],
      sentenceDate: { type: Date },
      intakeDate: { type: Date },
      releaseDate: { type: Date },
      photoLink: { type: String, default: "" }
    },
  ],
  workPrograms: [
    {
      title: { type: String, default: "" },
      type: { type: String, default: "" },
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