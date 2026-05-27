import jwt from "jsonwebtoken"
import userModel from "../users/userModel.js"

const jwtSecret = process.env.JWT_SECRET || "secret"
const tokenExpiration = process.env.TOKEN_EXPIRATION || 60 * 60 * 24 * 1 // 1 day

const cookieOptions = {
  httpOnly: true,
  secure: false,
  signed: true,
  mexAge: tokenExpiration,
  sameSite: "none",
  domain: "localhost",
  path: "/"
}

const createToken = (user) => {
  console.log("createToken user", user)
  return jwt.sign(
    user,
    jwtSecret,
    { expiresIn: tokenExpiration }
  )
}

const login = async (req, res, next) => {
  const { _id } = req.user
  const token = { token: createToken({ _id }) }
  try {
    // Find user in db
    const user = await userModel.findOne({ _id })

    if (user.tokens) {
      user.tokens.push(token)
    }
    else {
      user.tokens = [token]
    }
    user.save()
    res.cookie("token", token, cookieOptions)
    res.status(200).json({ success: true, user: { firstName: user.firstName, lastName: user.lastName, email: user.email, username: user.username, roles: user.roles, avatar: user.avatar }, token: token.token })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: "There was an error." })
  }
}

export default login