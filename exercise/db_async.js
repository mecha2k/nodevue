const mysql2 = require("mysql2")
const dotenv = require("dotenv")

dotenv.config({ path: "../.env" })
console.log(process.env.DATABASE)

const mysqlpool = {
  host: "localhost",
  user: process.env.USER,
  password: process.env.PASSWD,
  database: process.env.DATABASE,
  multipleStatements: true,
  waitForConnections: false,
  connectionLimit: 5,
  queueLimit: 0,
  port: 3306
}

function firstQuery() {
  const conn = mysql2.createConnection({
    host: "localhost",
    user: process.env.USER,
    password: process.env.PASSWD,
    database: process.env.DATABASE,
    port: 3306
  })

  sql1 = "SELECT * FROM Club"
  conn.query(sql1, (err, results, fields) => console.log(results, fields))
}

function preparedQuery() {
  const conn = mysql2.createConnection({
    host: "localhost",
    user: process.env.USER,
    password: process.env.PASSWD,
    database: process.env.DATABASE,
    port: 3306
  })

  sql1 = "SELECT * FROM Club WHERE id = ?"
  conn.query(sql1, [3], (err, results) => {
    if (err) console.log(err)
    console.log(results)
  })
}

function connPool() {
  pool = mysql2.createPool(mysqlpool)

  sql1 = "SELECT * FROM Club"
  pool.query(sql1, function (err, rows, fields) {
    if (err) console.log(err)
    console.log(rows, fields)
  })
}

async function promisePoolfunc() {
  const pool = mysql2.createPool(mysqlpool)
  const promisePool = pool.promise()

  sql1 = "SELECT * FROM Club"
  const [rows, fields] = await promisePool.query(sql1)
  console.log(rows[0].createdate)
  pool.end()
}

// firstQuery()
// preparedQuery()
// connPool()
promisePoolfunc()
