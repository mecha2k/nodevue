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
  sql2 = "SELECT * FROM Department"
  conn.query(sql1, (err, results, fields) => results.forEach((rows) => console.log(rows)))
  conn.query(sql2, (err, results, fields) => results.forEach((rows) => console.log(rows)))

  conn.end()
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
  console.log("object")
  // callback 함수 리턴 전에 닫아버릴 (pool is closed)🍎🍎🍎 수 있고 결과값을 얻을 수 없다.
  pool.end()
}

async function promisePoolfunc() {
  const pool = mysql2.createPool(mysqlpool)
  const promisePool = pool.promise()

  sql1 = "SELECT * FROM Club"
  // await (promise.then)로 결과값이 리턴될 때까지 기다리므로 그 다음 작업을 보장할 수 있다.
  const [rows, fields] = await promisePool.query(sql1)
  console.log(rows[0].createdate)

  // await로 리턴을 기다린 후 작업을 이어가므로 정상작동한다.
  pool.end()
}

async function promisePoolAllfunc() {
  const pool = mysql2.createPool(mysqlpool)
  const promisePool = pool.promise()

  sql1 = "SELECT * FROM Club"
  sql2 = "SELECT * FROM Department"

  const results = await Promise.all([promisePool.query(sql1), promisePool.query(sql2)])
  results.forEach(([rows, fields]) => console.log(rows))

  pool.end()
}

async function promisePoolAllTransactionfunc() {
  const pool = mysql2.createPool(mysqlpool)
  // const promisePool = pool.promise()

  sql1 = "SELECT * FROM Club"
  sql2 = "SELECT * FROM Department"

  pool.getConnection((err, conn) => {
    if (err) console.log("----------", err)
    conn.beginTransaction((err) => {
      if (err) console.log("----------", err)
      Promise.all([conn.query(sql1), conn.query(sql2)])
        .then((res) => {
          conn.commit()
          res.forEach(([rows, fields]) => console.log(rows))
        })
        .catch((err) => {
          conn.rollback()
        })
    })

    pool.releaseConnection(conn)
  })

  pool.end()
}

// firstQuery()
// preparedQuery()
// connPool()
// promisePoolfunc().then(console.log("success"))
// promisePoolAllfunc().then(console.log("success"))
// promisePoolAllTransactionfunc().then(console.log("success"))

function simpleQuery1(sql) {
  const conn = mysql2.createConnection({
    host: "localhost",
    user: process.env.USER,
    password: process.env.PASSWD,
    database: process.env.DATABASE,
    port: 3306
  })

  conn.query(sql, (err, results, fields) => results.forEach((rows) => console.log(rows)))
  conn.end()
}

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
