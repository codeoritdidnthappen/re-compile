import grantModel from "./grantModel.js"

const grantReadOne = async (req, res) => {
  try {
    const grant = await grantModel.findById(req.params.id)
    if (!grant) {
      return res.status(404).json({ success: false, grant: {}, message: "Grant not found." })
    }
    res.status(200).json({ success: true, grant })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ success: false, grant: {}, message: "There was an error. 🤬" })
  }
}

export default grantReadOne
