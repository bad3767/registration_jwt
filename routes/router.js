const express = require("express");
const router = express.Router();
const controller = require("../controller/views");
const Authenticate = require("../middleware/auth");

const { limiter, accessCon, authorizedPC } = require("../middleware/limiter");
router.post("/register",controller.userRegister);
router.post("/otp_verify", controller.otp_verify);
router.post("/login", authorizedPC ,controller.userlogin);
router.post("/add_users", Authenticate.jwt_verification, controller.add_users);
router.post("/user_login", controller.user_login);
router.post ("/forgotPassword",controller.forgotPassword)
router.post ("/reset_password",controller.reset_password)
router.get("/protected", accessCon, controller.protectedRoute);
router.get ("/authPC",controller.authorizedPC)

router.post ('/index', controller.indexes)
router.post ("/rename", controller.rename)
router.get('/asyncParallel',controller.asyncParallel)
module.exports = router;
