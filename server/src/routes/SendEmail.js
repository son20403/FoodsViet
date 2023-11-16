// routes.js
import express from "express";
const router = express.Router();
import sendEmailController from "../controllers/SendMailController";

router.get("/getAll", sendEmailController.getAllFeedBack);
router.post("/addFeedBack", sendEmailController.createFeedBack);
router.post("/", sendEmailController.send);

export default router;
