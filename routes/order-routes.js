const express = require("express");
const orderController = require("../controller/order-controller");
const router = express.Router();

router.get("/orders", orderController.getOrders);
router.post("/orders", orderController.addOrder);

module.exports = router;
