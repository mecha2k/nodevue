const express = require("express")
const http = require("http")
const cors = require("cors")
const ejs = require("ejs")
const xss = require("xss-clean")
const hpp = require("hpp")
const path = require("path")
const logger = require("morgan")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const compression = require("compression")
const expressLimit = require("express-rate-limit")
const createError = require("http-errors")
const dotenv = require("dotenv")

dotenv.config({ path: "./.env" })

const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server, {
  log: false,
  origins: "*:*",
  pingInterval: 3000,
  pingTimeout: 5000
})

const users = require("./routes/users")
const views = require("./routes/views")
const survey = require("./routes/survey")
const socketio = require("./controls/socketio")
const errorHandler = require("./controls/errors")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))
app.engine("html", ejs.renderFile)

if (process.env["NODE_ENV"] === "development") app.use(logger("dev"))

app.use(xss())
app.use(hpp({ whitelist: ["price", "difficulty"] }))
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(cookieParser())
app.use(express.json({ limit: "10kb" }))
app.use(express.urlencoded({ extended: true, limit: "10kb" }))
app.use(
  "/api/",
  expressLimit({
    max: 100,
    windowMs: 15 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!"
  })
)
app.use(function (req, res, next) {
  req.requestTime = new Date().toISOString()
  console.log("Hello from the middleware...")
  console.log("cookies : ", req.cookies)
  next()
})

socketio(io, false)

app.use("/api/views", views)
app.use("/api/users", users)
app.use("/api/surveys", survey)

app.use((req, res, next) => next(createError(404)))
app.all("*", (req, res, next) => {
  next(new appError(`Can't find ${req.originalUrl} on this server!`, 404))
})
app.use(errorHandler)

module.exports = server
