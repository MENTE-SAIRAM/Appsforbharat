import express from 'express';
import { addItemToCart, removeItemFromCart, getUserCart } from '../controllers/cartController.js';
import authMiddleware from '../middlewares/authmiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getUserCart);
router.post('/add', addItemToCart);
router.post('/remove', removeItemFromCart);

export default router;
