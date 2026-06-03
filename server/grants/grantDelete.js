import grantModel from "./grantModel.js"

const grantDelete = async (req, res) => {
  try {
    const grant = await grantModel.findByIdAndDelete(req.params.id)
    if (!grant) {
      return res.status(404).json({ success: false, message: "Grant not found." })
    }
    res.status(200).json({ success: true, message: "Grant deleted." })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: "There was an error. 🤬" })
  }
}

export default grantDelete
