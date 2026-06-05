import passport from "passport"
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"
import userModel from "../users/userModel.js"
import logger from "../logger.js"

const jwtSecret = process.env.JWT_SECRET || "secret"

// JWT strategy options
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
  passReqToCallback: true
}

passport.use(
  new JwtStrategy(opts, async (req, jwtPayload, done) => {
    const { _id } = jwtPayload
    try {
      const token = req.headers.authorization.split(" ")[1]

      // Find user based on id in token, and make sure token is in users token list (i.e. logged in)
      // TODO: make sure token is in users token list
      const user = await userModel.findOne({ _id })
      // console.log("jwt user", user)

      if (!user) {
        return done(null, false)
      }
      return done(null, user)
    }
    catch (err) {
      logger.error(err)
      return done(err, null)
    }
  })
)
