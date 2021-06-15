const mysql2 = require("mysql2")

console.log("current database table: ", process.env.DATABASE)

const pool = mysql2.createPool({
  host: "localhost",
  user: process.env.USER,
  password: process.env.PASSWD,
  database: process.env.DATABASE,
  multipleStatements: true,
  waitForConnections: false,
  connectionLimit: 5,
  port: 3306
})

module.exports = pool
