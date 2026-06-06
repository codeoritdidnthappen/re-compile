import mongoose from "mongoose"

const weeklySchema = new mongoose.Schema({
  week: {
    startDate: String,
    endDate: String,
    data: [mongoose.Schema.Types.Mixed]
  }
})

export default mongoose.model("weekly", weeklySchema)
