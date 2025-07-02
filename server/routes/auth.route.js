import express from "express";
import * as authController from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter
  .route("/signup")
  .get(authController.getSignupPage)
  .post(authController.signup);

authRouter
  .route("/login")
  .get(authController.getLoginPage)
  .post(authController.login);

authRouter.route("/logout").get(authController.logout);

export default authRouter;
