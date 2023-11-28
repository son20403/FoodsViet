// routes.js
import express from "express";
const router = express.Router();
import sendEmailController from "../controllers/SendMailController";
import middlewareAuth from "../middlewares/auth";

router.get(
  "/getAll",
  middlewareAuth.verifyTokenStaff,
  sendEmailController.getAllFeedBack
);
router.post("/addFeedBack", sendEmailController.createFeedBack);
router.post("/forgot-password", sendEmailController.forgotPassword);
router.post("/reset-password", sendEmailController.resetPassword);
router.post("/", sendEmailController.send);

export default router;
