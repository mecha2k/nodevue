exports.getallUsers = function (req, res, next) {
  res.status(200).json({ status: "success", message: "getallUsers()" })
}

exports.createUser = function (req, res, next) {
  res.status(200).json({ status: "success", message: "createUser()" })
}
