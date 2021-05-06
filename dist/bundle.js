/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\")\nconst http = __webpack_require__(/*! http */ \"http\")\nconst { Server } = __webpack_require__(/*! socket.io */ \"socket.io\")\nconst ejs = __webpack_require__(/*! ejs */ \"ejs\")\nconst path = __webpack_require__(/*! path */ \"path\")\n// const logger = require(\"morgan\")\n// const helmet = require(\"helmet\")\n// const cookieParser = require(\"cookie-parser\")\n// const createError = require(\"http-errors\")\n// const expressLimit = require(\"express-rate-limit\")\n// const mongoSanitize = require(\"express-mongo-sanitize\")\n// const compression = require(\"compression\")\n// const xss = require(\"xss-clean\")\n// const hpp = require(\"hpp\")\n\nconst app = express()\nconst server = http.createServer(app)\nconst io = new Server(server, {\n  log: false,\n  origins: \"*:*\",\n  pingInterval: 3000,\n  pingTimeout: 5000\n})\n\n// const viewRouter = require(\"./routes/views\")\nconst pool = __webpack_require__(/*! ./public/dbpool */ \"./public/dbpool.js\")\n\napp.set(\"view engine\", \"ejs\")\napp.set(\"views\", path.join(__dirname, \"views\"))\napp.use(express.static(path.join(__dirname, \"public\")))\napp.engine(\"html\", ejs.renderFile)\n\nio.on(\"connection\", (socket, options) => {\n  socket.emit(\"message\", { msg: \"Welcome Socket.io~\" + socket.id })\n  console.log(`user connected..., socket.id : ${socket.id}, socket.query `, socket.handshake.query)\n\n  socket.on(\"join\", (room, func) => {\n    socket.join(room)\n    io.to(room).emit(`Hello ${room} members`)\n    console.log(\"Joining room : \", room, socket.rooms)\n    func && func()\n  })\n\n  socket.on(\"rooms\", (func) => {\n    console.log(JSON.stringify(socket.rooms))\n    func(JSON.stringify(socket.rooms))\n  })\n\n  socket.on(\"leave\", (data, func) => {\n    socket.leave(data)\n  })\n\n  socket.on(\"message\", (data, func) => {\n    console.log(\"message : \", data.msg, socket.rooms)\n    func(data.msg)\n  })\n\n  socket.on(\n    \"disconnecting\",\n    (data) => console.log(\"user disconnecting...\" + socket.id),\n    socket.rooms\n  )\n  socket.on(\"disconnect\", (data) => console.log(\"user disconnected...\" + socket.id), socket.rooms)\n})\n\n// if (process.env[\"NODE_ENV\"] === \"development\") app.use(logger(\"dev\"))\n\n// app.use(helmet())\n// app.use(express.json({ limit: \"10kb\" }))\n// app.use(compression())\n// app.use(express.urlencoded({ extended: true, limit: \"10kb\" }))\n// app.use(cookieParser())\n// app.use(function (req, res, next) {\n//   req.requestTime = new Date().toISOString()\n//   console.log(\"Hello from the middleware...\")\n//   console.log(req.cookies)\n//   next()\n// })\n\n// app.use(\"/\", viewRouter)\n\n// const mydb = require(\"./public/mysqldb\")\n\n// mydb.simpleQuery(function (conn) {\n//   sql = \"SELECT * FROM Club\"\n//   conn.query(sql, (err, results, fields) => results.forEach((rows) => console.log(rows)))\n// })\n\napp.get(\"/\", (req, res) => {\n  const fs = __webpack_require__(/*! fs */ \"fs\")\n  data = fs.readFileSync(\"./exercise/test.json\", \"utf-8\")\n  console.log(data)\n  console.log(__dirname)\n  data1 = JSON.stringify(__webpack_require__(/*! ./exercise/test.json */ \"./exercise/test.json\"))\n  // res.json(data1)\n  // res.send('Hello node.vue')\n  // res.render('index', {name: 'mecha2k1'})\n  res.render(\"index\")\n})\n\n// http://localhost:3000/test/aaaA@naver.com?nid=123\n// req.body, req.query (url)\napp.get(\"/test/:email\", (req, res) => {\n  email = req.params.email\n  nid = req.query.nid\n  res.send(email + \", id no is \" + nid)\n})\n\napp.get(\"/dbtest\", (req, res) => {\n  sql = \"SELECT * FROM Club\"\n  pool.query(sql, (err, rows, fields) => res.json(rows))\n})\n\nmodule.exports = server\n\n\n//# sourceURL=webpack://nodevue/./app.js?");

/***/ }),

/***/ "./exercise/test.json":
/*!****************************!*\
  !*** ./exercise/test.json ***!
  \****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = JSON.parse('{\"name\":\"mecha2k\",\"mail\":\"mecha2k@gmail.com\",\"site\":\"cnlife.site\"}');\n\n//# sourceURL=webpack://nodevue/./exercise/test.json?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const app = __webpack_require__(/*! ./app */ \"./app.js\")\n\nconst port = process.env.PORT || \"3000\"\napp.listen(port, function () {\n  console.log(\"Server App running on port: \" + port)\n})\n\n\n//# sourceURL=webpack://nodevue/./index.js?");

/***/ }),

/***/ "./public/dbpool.js":
/*!**************************!*\
  !*** ./public/dbpool.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mysql2 = __webpack_require__(/*! mysql2 */ \"mysql2\")\nconst dotenv = __webpack_require__(/*! dotenv */ \"dotenv\")\n\ndotenv.config()\nconsole.log(\"current database table: \", process.env.DATABASE)\n\nconst pool = mysql2.createPool({\n  host: \"localhost\",\n  user: process.env.USER,\n  password: process.env.PASSWD,\n  database: process.env.DATABASE,\n  multipleStatements: true,\n  waitForConnections: false,\n  connectionLimit: 5,\n  port: 3306\n})\n\nmodule.exports = pool\n\n\n//# sourceURL=webpack://nodevue/./public/dbpool.js?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("dotenv");;

/***/ }),

/***/ "ejs":
/*!**********************!*\
  !*** external "ejs" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("ejs");;

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");;

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");;

/***/ }),

/***/ "mysql2":
/*!*************************!*\
  !*** external "mysql2" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("mysql2");;

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");;

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("socket.io");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;