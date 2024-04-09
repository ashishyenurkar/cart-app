import express from "express";
import { processPayment, sendStripeApiKey } from "../controller/paymentController.js";
import { protectAdminRoute, protectRoute } from '../middelware/protectRoute.js';
const router = express.Router();


router.route("/payment/process").post(protectRoute, processPayment);
router.route("/stripeapikey").get(protectRoute, sendStripeApiKey);
export default router;
