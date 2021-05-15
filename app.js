const express = require("express")
const http = require("http")
const cors = require("cors")
const ejs = require("ejs")
const path = require("path")
const logger = require("morgan")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const compression = require("compression")
const expressLimit = require("express-rate-limit")
const createError = require("http-errors")

const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server, {
  log: false,
  origins: "*:*",
  pingInterval: 3000,
  pingTimeout: 5000
})

const pool = require("./routes/dbpool")
const socketio = require("./routes/socketio")
const apiRouter = require("./routes/apiRouter")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))
app.engine("html", ejs.renderFile)

if (process.env["NODE_ENV"] === "development") app.use(logger("dev"))

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

// socketio(io, false)
apiRouter(app, pool)

app.use((req, res, next) => next(createError(404)))

module.exports = server
