const Cart = require("../model/cart-model");
const defaultCart = require("../util/defaultCart");

async function initializeCart(req, res, next) {
  if (req.session.uid) {
    let userCart;

    try {
      userCart = await Cart.getUserCart(req.session.uid);
    } catch (error) {
      return next(error);
    }

    let cart;

    if (userCart.cart.items <= 0) {
      cart = new Cart();
    } else {
      const sessionCart = req.session.cart;
      cart = new Cart(
        sessionCart.items,
        sessionCart.cartQuantity,
        sessionCart.totalPrice
      );
    }

    res.locals.cart = cart;
    return next();
  }

  res.locals.cart = defaultCart;
  next();
}

module.exports = initializeCart;
