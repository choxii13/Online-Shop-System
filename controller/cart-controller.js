const Cart = require("../model/cart-model");
const Product = require("../model/product-model");

function getShoppingCartItem(req, res) {
  res.render("./customer/shopping-cart");
}

async function getShoppingCart(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
  } catch (error) {
    return next(error);
  }
  res.render("./customer/product-view-item", { product });
}

async function addShoppingCart(req, res, next) {
  const cart = res.locals.cart;
  let product;

  try {
    product = await Product.findById(req.body.productId);
  } catch (error) {
    return next(error);
  }

  cart.addItemToCart(product);
  req.session.cart = cart;

  try {
    await Cart.updateUserCart(req.session.uid, cart);
  } catch (error) {
    return next(error);
  }

  res.status(201).json({
    message: "Cart Updated",
    newTotalItems: cart.cartQuantity,
  });
}

async function updateCartItem(req, res, next) {
  const cart = res.locals.cart;

  const updatedItemData = cart.updateItem(
    req.body.productId,
    +req.body.quantity
  );

  req.session.cart = cart;

  try {
    await Cart.updateUserCart(req.session.uid, cart);
  } catch (error) {
    return next(error);
  }

  res.status(201).json({
    message: "Item updated",
    updatedCartData: {
      newTotalQuantity: cart.cartQuantity,
      newTotalPrice: cart.totalPrice,
      updatedItemPrice: updatedItemData.updatedItemPrice,
    },
  });
}

module.exports = {
  getShoppingCart: getShoppingCart,
  getShoppingCartItem: getShoppingCartItem,
  addShoppingCart: addShoppingCart,
  updateShoppingCart: updateCartItem,
};
