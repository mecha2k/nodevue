const express = require("express")
const ejs = require("ejs")
const path = require("path")
const logger = require("morgan")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
// const createError = require("http-errors")
// const expressLimit = require("express-rate-limit")
// const mongoSanitize = require("express-mongo-sanitize")
const compression = require("compression")
// const xss = require("xss-clean")
// const hpp = require("hpp")

const viewRouter = require("./routes/views")

const app = express()

app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))

// if (process.env["NODE_ENV"] === "development") app.use(logger("dev"))

// app.use(helmet())
// app.use(express.json({ limit: "10kb" }))
// app.use(compression())
// app.use(express.urlencoded({ extended: true, limit: "10kb" }))
// app.use(cookieParser())
// app.use(function (req, res, next) {
//   req.requestTime = new Date().toISOString()
//   console.log("Hello from the middleware...")
//   console.log(req.cookies)
//   next()
// })

// app.use("/", viewRouter)

// const mydb = require("./public/mysqldb")

// mydb.simpleQuery(function (conn) {
//   sql = "SELECT * FROM Club"
//   conn.query(sql, (err, results, fields) => results.forEach((rows) => console.log(rows)))
// })

app.get("/", (req, res) => {
  return "asdfas;gjalsgkj"
})

module.exports = app
