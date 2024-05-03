const Product = require("../model/product-model");

function baseHome(req, res) {
  if (req.session.isAdmin) {
    res.redirect("/admin");
    return;
  }
  res.redirect("/home");
}

async function getHome(req, res) {
  let products;
  try {
    products = await Product.findAll();
  } catch (error) {
    return next(error);
  }
  res.render("./customer/home", { products });
}

function status401(req, res) {
  res.render("/shared/401");
}

function status403(req, res) {
  res.render("./shared/403");
}

module.exports = {
  baseHome: baseHome,
  getHome: getHome,
  status401: status401,
  status403: status403,
  status403: status403,
};
