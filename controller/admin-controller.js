const Order = require("../model/order-model");
const Product = require("../model/product-model");
const getProductData = require("../util/productData");

async function getManageProducts(req, res) {
  const products = await Product.findAll();
  res.render("./admin/admin", { products });
}

async function getManageProductsId(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
  } catch (error) {
    return next(error);
  }
  res.render("./admin/product", { product });
}

function getCreateProduct(req, res) {
  res.render("./admin/create-product");
}

async function createProduct(req, res, next) {
  const productData = getProductData(req.body);
  const product = new Product({ ...productData, image: req.file.filename });
  let id;

  try {
    id = await product.save();
  } catch (error) {
    return next(error);
  }

  res.redirect(`/admin/product/${id.toString()}`);
}

async function getUpdateProduct(req, res, next) {
  let product;
  const params = req.params.id;
  try {
    product = await Product.findById(params);
  } catch (error) {
    return next(error);
  }

  res.render("./admin/update-product", { product, params });
}

async function updateProduct(req, res, next) {
  const productData = getProductData(req.body);
  let image;
  const _id = req.params.id;
  if (req.file) {
    image = req.file.filename;
  }
  const product = new Product({ ...productData, image, _id });
  try {
    await product.save();
  } catch (error) {
    return next(error);
  }
  res.redirect("/admin");
}

async function deleteProduct(req, res, next) {
  let product;

  try {
    product = await Product.findById(req.params.id);
    await product.remove();
  } catch (error) {
    return next(error);
  }

  res.json({ message: "deleted product" });
}

async function getOrders(req, res, next) {
  try {
    const orders = await Order.findAll();
    res.render("./admin/order", {
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
}

async function updateOrder(req, res, next) {
  const orderId = req.params.id;
  const newStatus = req.body.newStatus;
  try {
    const order = await Order.findById(orderId);
    order.status = newStatus;

    await order.save();
    console.log(order.status);
    res.json({ message: "Order updated", newStatus: newStatus });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getManageProducts: getManageProducts,
  getManageProductsId: getManageProductsId,
  getCreateProduct: getCreateProduct,
  getUpdateProduct: getUpdateProduct,
  createProduct: createProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  getOrders: getOrders,
  updateOrder: updateOrder,
};
