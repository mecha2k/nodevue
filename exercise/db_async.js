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
  // callback으로 걸려있기 때문에 언제 결과값을 줄지 알 수 없고 함수 내부에서 모든게 처리되어야 한다.
  pool.query(sql1, function (err, rows, fields) {
    if (err) console.log(err)
    console.log(rows[0].name)
  })
  console.log('object')
}

async function promisePoolfunc() {
  const pool = mysql2.createPool(mysqlpool)
  const promisePool = pool.promise()

  sql1 = "SELECT * FROM Club"
  // await (promise.then)로 결과값이 리턴될 때까지 기다리므로 그 다음 작업을 보장할 수 있다.
  const [rows, fields] = await promisePool.query(sql1)
  console.log(rows[0].createdate)
  pool.end()
}

// firstQuery()
// preparedQuery()
connPool()
// promisePoolfunc().then(console.log("success"))
