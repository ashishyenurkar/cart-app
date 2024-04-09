import express from 'express'
import { getAllOrders, getUserOrders, placeOrder } from '../controller/orderController.js';
import { protectAdminRoute, protectRoute } from '../middelware/protectRoute.js';

const router = express.Router();

router.route('/order/create').post(protectRoute,placeOrder);
router.route('/order/getuserorder/:id').get(protectRoute,getUserOrders);
router.route('/order/getallorders/').get(protectAdminRoute,getAllOrders);


export default router;