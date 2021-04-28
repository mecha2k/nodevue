const mysql = require("mysql")
const dotenv = require("dotenv")

const app = require("./app")

dotenv.config({ path: ".env" })
console.log(app.get("env"))
console.log(process.env.NODE)
console.log(process.env.NODE_ENV)
console.log(process.env.DATABASE)

const conn = mysql.createConnection({
  host: "localhost",
  user: process.env.USER,
  password: process.env.PASSWD,
  database: process.env.DATABASE,
  port: 3306
})

conn.connect()

conn.query("SELECT * FROM Club", (error, results, fields) => {
  if (error) throw error
  console.log("The solution is: ", results[0].name, fields)
})

conn.end()

const port = process.env["PORT"] || "3000"
app.listen(port, function () {
  console.log("Server App running on port: " + port)
})
