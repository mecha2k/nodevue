const mysql2 = require("mysql2")
const dotenv = require("dotenv")

dotenv.config({ path: "../.env" })

function simpleQuery(queryfunc) {
  const conn = mysql2.createConnection({
    host: "localhost",
    user: process.env.USER,
    password: process.env.PASSWD,
    database: process.env.DATABASE,
    port: 3306
  })

  queryfunc(conn)
  conn.end()
}

module.exports = { simpleQuery }
