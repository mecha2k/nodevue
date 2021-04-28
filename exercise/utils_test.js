const utils = require("../public/utils")
const pools = require("../public/pools")

// utils.ogsinfo("https://naver.com", (err, res) => console.log(err, res))

const enc = utils.encrypt("nodeJS")
console.log("encrypt: ", enc)
console.log("decrypt: ", utils.decrypt(enc))
console.log("sha256: ", utils.sha256("nodeJS"))

const map = utils.hsmap("key", "name")
console.log("hashmap: ", map.get("key"))

console.log(pools.mysql_db)
