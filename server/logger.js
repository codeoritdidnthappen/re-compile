import pino from "pino"

const isDev = process.env.NODE_ENV !== "production"
const level = process.env.LOG_LEVEL || (isDev ? "debug" : "info")

const logger = pino({
  level,

  redact: [
    "req.headers.authorization",
    "req.headers.cookie",
    "password",
    "token"
  ],
  
  ...(isDev && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard",
        ignore: "pid,hostname",
      },
    },
  }),
})

export default logger
