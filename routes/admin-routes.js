const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin-controller");
const configuredMulterMiddleware = require("../middlewares/image-upload");

router.get("/", adminController.getManageProducts);
router.get("/product/:id", adminController.getManageProductsId);

router.get("/update-product/:id", adminController.getUpdateProduct);
router.post(
  "/update-product/:id",
  configuredMulterMiddleware,
  adminController.updateProduct
);

router.get("/create-product", adminController.getCreateProduct);
router.post(
  "/create-product",
  configuredMulterMiddleware,
  adminController.createProduct
);
router.delete("/delete-product/:id", adminController.deleteProduct);

router.get("/orders", adminController.getOrders);
router.patch("/orders/:id", adminController.updateOrder);

module.exports = router;
