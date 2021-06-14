const dotenv = require("dotenv")
dotenv.config({ path: "../../.env" })

const utils = require("../../controls/utils")
const pools = require("../../controls/dbpool")

// utils.ogsinfo("https://naver.com", (err, res) => console.log(err, res))
console.log(__dirname)

const enc = utils.encrypt("nodeJS")
console.log("encrypt: ", enc)
console.log("decrypt: ", utils.decrypt(enc))
console.log("sha256: ", utils.sha256("nodeJS"))

const map = utils.hsmap("key", "name")
console.log("hashmap: ", map.get("key"))

console.log(pools.mysql_db)
