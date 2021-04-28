const mysql = require("mysql")
const dotenv = require("dotenv")
const Promise = require("bluebird")

dotenv.config({ path: ".env" })

const mysqlinfo = {
  host: "localhost",
  user: process.env.USER,
  password: process.env.PASSWD,
  database: process.env.DATABASE,
  multipleStatements: true,
  waitForConnections: false,
  connectionLimit: 5,
  port: 3306
}

Promise.promisifyAll(mysql)
Promise.promisifyAll(require("mysql/lib/Connection").prototype)
Promise.promisifyAll(require("mysql/lib/Pool").prototype)

const Pool = class {
  constructor(dbinfo) {
    this.pool = mysql.createPool(dbinfo || mysqlinfo)
  }
  connect() {
    return this.pool.getConnectionAsync().disposer((conn) => {
      return conn.release()
    })
  }
  end() {
    this.pool.end((err) => {
      console.log("end of pool connections...")
      if (err) console.log("end of pool error occured!")
    })
  }
}

module.exports = { Pool, mysqlinfo }
