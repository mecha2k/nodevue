const Promise = require("bluebird")

const Pool = require("../public/pools")
const pool = new Pool.Pool()

const sql1 = "SELECT * FROM Club"
Promise.using(pool.connect(), (conn) => {
  conn.queryAscync(sql1).then(console.log).catch(console.log)
  console.log("sql query 1 = ", res.affectedRows)
  pool.end()
})
