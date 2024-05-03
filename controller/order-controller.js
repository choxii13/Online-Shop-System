const Cart = require("../model/cart-model");
const Order = require("../model/order-model");
const User = require("../model/user-model");
const defaultCart = require("../util/defaultCart");

async function getOrders(req, res, next) {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render("./customer/order", {
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
}

async function addOrder(req, res, next) {
  const cart = res.locals.cart;
  let userDocument;
  try {
    userDocument = await User.findById(res.locals.uid);
  } catch (error) {
    return next(error);
  }

  const order = new Order(cart, userDocument);
  try {
    await order.save();
  } catch (error) {
    next(error);
    return;
  }

  await Cart.updateUserCart(req.session.uid, defaultCart);
  res.redirect("/home/orders");
}

module.exports = { getOrders: getOrders, addOrder: addOrder };
