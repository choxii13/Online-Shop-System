const express = require("express");
const router = express.Router();
const authController = require("../controller/auth-controller");

router.post("/signup", authController.signup);
router.get("/signup", authController.getSignup);

router.post("/signin", authController.signin);
router.get("/signin", authController.getSignin);

router.post("/logout", authController.logout);
module.exports = router;
