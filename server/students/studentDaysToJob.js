import studentModel from "./studentModel.js"

const studentDaysToJob = async (req, res) => {
  try {
    const result = await studentModel.aggregate([
      {
        $match: {
          "incarceration.releaseDate": { $exists: true, $ne: null },
          $expr: {
            $anyElementTrue: {
              $map: {
                input: { $ifNull: ["$jobsAfterRelease", []] },
                as: "job",
                in: {
                  $and: [
                    { $ne: ["$$job.startDate", null] },
                    { $gt: ["$$job.startDate", "$incarceration.releaseDate"] }
                  ]
                }
              }
            }
          }
        }
      },
      {
        $addFields: {
          firstJobStartDate: {
            $min: {
              $map: {
                input: {
                  $filter: {
                    input: { $ifNull: ["$jobsAfterRelease", []] },
                    as: "job",
                    cond: {
                      $and: [
                        { $ne: ["$$job.startDate", null] },
                        { $gt: ["$$job.startDate", "$incarceration.releaseDate"] }
                      ]
                    }
                  }
                },
                as: "job",
                in: "$$job.startDate"
              }
            }
          }
        }
      },
      {
        $addFields: {
          daysToFirstJob: {
            $divide: [
              { $subtract: ["$firstJobStartDate", "$incarceration.releaseDate"] },
              86400000
            ]
          }
        }
      },
      {
        $group: {
          _id: null,
          averageDays: { $avg: "$daysToFirstJob" }
        }
      }
    ])
    const averageDays = result.length > 0 ? result[0].averageDays : 0
    res.status(200).json({ success: true, averageDays })
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, averageDays: 0 })
  }
}

export default studentDaysToJob
