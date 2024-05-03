const express = require("express");
const shoppingCartController = require("../controller/cart-controller");
const router = express.Router();

router.get("/product/:id", shoppingCartController.getShoppingCart);
router.get("/shopping-cart", shoppingCartController.getShoppingCartItem);
router.post("/shopping-cart", shoppingCartController.addShoppingCart);
router.patch("/shopping-cart", shoppingCartController.updateShoppingCart);

module.exports = router;
