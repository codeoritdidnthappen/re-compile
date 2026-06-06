import passport from "passport"
import { Strategy } from "passport-local"
import * as argon2 from "argon2"
import userModel from "../users/userModel.js"
import logger from "../logger.js"

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await userModel.findOne({ _id: id })
    if (!findUser) {
      throw new Error("Invalid credentials")
    }
    done(null, findUser)
  }
  catch (err) {
    done(err, null)
  }
})

export default passport.use(
  new Strategy({ usernameField: "email" }, async (username, password, done) => {
    try {
      const user = await userModel.findOne({ email: username })
if (!user) {
        // throw new Error("Invalid credentials")
        done(null, null, "Invalid credentials") // Returns 401 Unauthorized
      }
      const isPasswordCorrect = await argon2.verify(user.password, password)
      if (!isPasswordCorrect) {
        // throw new Error("Invalid credentials")
        done(null, null, "Invalid credentials") // Returns 401 Unauthorized
      }
      done(null, user)
    }
    catch (err) {
      logger.error(err)
      done(err, null)
    }
  })
)