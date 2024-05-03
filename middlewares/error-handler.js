function handleErrors(error, req, res, next) {
  console.log(error);
  if (error.code === 404) {
    return res.render("shared/404");
  }
  res.status(500).render("shared/500");
}

function status404(req, res) {
  res.render("shared/404");
}

module.exports = { status404: status404, handleErrors: handleErrors };
