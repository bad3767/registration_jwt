const express = require("express");
const router = express.Router();
const controller = require("../controller/views");
const Authenticate = require("../middleware/auth");

router.post("/register",  controller.userRegister);
router.post("/otp_verify", controller.otp_verify);
router.post("/login", controller.userlogin);
router.post("/add_users", Authenticate.jwt_verification, controller.add_users);
router.post("/user_login", controller.user_login);


module.exports = router;
