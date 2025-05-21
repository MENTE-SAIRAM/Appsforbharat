import express from 'express';
import { placeOrder, getUserOrders } from '../controllers/orderController.js';
import authMiddleware from '../middlewares/authmiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', placeOrder);
router.get('/orderhistory', getUserOrders);

export default router;
