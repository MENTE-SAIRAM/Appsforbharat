import { v4 as uuidv4 } from 'uuid';
import {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../repositories/productRepository.js';
import Product from '../models/productModel.js';

export const createProduct = (req, res) => {
  const product = new Product({ id: uuidv4(), ...req.body });
  addProduct(product);
  res.status(201).json({ message: 'Product added', product });
};

export const listProducts = (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const data = getAllProducts(parseInt(page), parseInt(limit));
  res.json(data);
};

export const getProduct = (req, res) => {
  const product = getProductById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
};

export const updateProductById = (req, res) => {
  const updated = updateProduct(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Product updated', updated });
};

export const deleteProductById = (req, res) => {
  deleteProduct(req.params.id);
  res.json({ message: 'Product deleted' });
};
