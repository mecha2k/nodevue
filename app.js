const express = require("express")
const http = require("http")
const ejs = require("ejs")
const path = require("path")
// const logger = require("morgan")
// const helmet = require("helmet")
// const cookieParser = require("cookie-parser")
// const createError = require("http-errors")
// const expressLimit = require("express-rate-limit")
// const mongoSanitize = require("express-mongo-sanitize")
// const compression = require("compression")
// const xss = require("xss-clean")
// const hpp = require("hpp")

const app = express()
const server = http.createServer(app)
const options = {
  log: false,
  origins: "*:*",
  pingInterval: 3000,
  pingTimeout: 5000
}
const io = require("socket.io")(server, options)

const pool = require("./public/dbpool")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))
app.engine("html", ejs.renderFile)

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin)
  res.header("Access-Control-Allow-Credentials", "true")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization")
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS")

  if (req.method === "OPTIONS") res.status(200).end()
  else next()
})

// io.on("connection", (socket, options) => {
//   socket.emit("message", {msg: "Welcome Socket.io~" + socket.id})
//   console.log(`user connected..., socket.id : ${socket.id}, socket.query `, socket.handshake.query)
//
//   socket.on("join", (room, func) => {
//     socket.join(room)
//     io.to(room).emit(`Hello ${room} members`)
//     console.log("Joining room : ", room, socket.rooms)
//     func && func()
//   })
//
//   socket.on("rooms", (func) => {
//     console.log(JSON.stringify(socket.rooms))
//     func(JSON.stringify(socket.rooms))
//   })
//
//   socket.on("leave", (data, func) => {
//     socket.leave(data)
//   })
//
//   socket.on("message", (data, func) => {
//     console.log("message : ", data.msg, socket.rooms)
//     func(data.msg)
//   })
//
//   socket.on(
//     "disconnecting",
//     (data) => console.log("user disconnecting..." + socket.id),
//     socket.rooms
//   )
//   socket.on("disconnect", (data) => console.log("user disconnected..." + socket.id), socket.rooms)
// })

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
  const fs = require("fs")
  const data = fs.readFileSync("./exercise/test.json", "utf-8")
  console.log(data)
  console.log(__dirname)
  let data1 = JSON.stringify(require("./exercise/test.json"))
  // res.json(data1)
  // res.send('Hello node.vue')
  // res.render('index', {name: 'mecha2k1'})
  res.render("index")
})

// http://localhost:3000/test/aaaA@naver.com?nid=123
// req.body, req.query (url)
app.get("/test/:email", (req, res) => {
  let email = req.params.email
  let nid = req.query.nid
  res.send(email + ", id no is " + nid)
})

app.get("/dbtest", (req, res) => {
  let sql = "SELECT * FROM Club"
  pool.query(sql, (err, rows, fields) => res.json(rows))
})

app.get("/api/school/:addr", (req, res) => {
  let addr = req.params.addr
  let sql = "SELECT * FROM Student WHERE address = ? LIMIT 3"
  pool.query(sql, [addr], (err, rows, fields) => res.json(rows))
})

module.exports = server
