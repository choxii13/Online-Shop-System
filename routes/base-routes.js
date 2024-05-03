const express = require("express");
const baseRoutesController = require("../controller/base-controller");
const router = express.Router();

router.get("/", baseRoutesController.baseHome);

router.get("/home", baseRoutesController.getHome);

router.get("/401", baseRoutesController.status401);

router.get("/403", baseRoutesController.status403);

module.exports = router;
