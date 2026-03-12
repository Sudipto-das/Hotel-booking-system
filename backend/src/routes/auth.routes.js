
const {Router} = require("express");
const authController = require("../controllers/auth.controller.js")
const authMiddleware = require("../middleware/auth.middleware.js")
const authRouter = Router()


authRouter.post("/register",authController.userRegisterController)
authRouter.post("/login",authController.userLoginController)
authRouter.get("/profile",authMiddleware,authController.getUserProfileController)

module.exports = authRouter