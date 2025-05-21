import express from 'express';
import validate from '../middlewares/validate.js';
import productSchema from '../validations/productValidation.js';
import adminMiddleware from '../middlewares/adminmiddleware.js';
import {
  createProduct,
  listProducts,
  getProduct,
  updateProductById,
  deleteProductById
} from '../controllers/productController.js';
import authMiddleware from '../middlewares/authmiddleware.js';

const router = express.Router();

router.post('/', authMiddleware,adminMiddleware,validate(productSchema), createProduct);
router.get('/', listProducts);
router.get('/:id', getProduct);
router.put('/:id', updateProductById);
router.delete('/:id',deleteProductById);

export default router;
