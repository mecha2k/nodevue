exports.getViews = async function (req, res, next) {
  res.status(200).render("index", { title: "All Tours" })
}
