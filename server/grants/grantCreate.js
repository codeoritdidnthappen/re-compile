import grantModel from "./grantModel.js"

const grantCreate = async (req, res) => {
  try {
    const grant = new grantModel(req.body)
    await grant.save()
    res.status(201).json({ success: true, grant })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ success: false, grant: {}, message: "There was an error. 🤬" })
  }
}

export default grantCreate
