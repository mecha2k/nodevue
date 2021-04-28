const utils = require("../public/utils")

utils.ogsinfo("https://naver.com", (err, res) => console.log(err, res))

const enc = utils.encrypt("sample text")
console.log("encrypt: ", enc)
console.log("encrypt: ", utils.encrypt("nodeJS"))
console.log("decrypt: ", utils.decrypt(enc))
