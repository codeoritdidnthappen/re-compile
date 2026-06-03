import grantModel from "./grantModel.js"

const grantReadMany = async (req, res) => {
  try {
    const grants = await grantModel.find().sort({ endDate: 1 })
    res.status(200).json({ success: true, grants })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ success: false, grants: [], message: "There was an error. 🤬" })
  }
}

export default grantReadMany
