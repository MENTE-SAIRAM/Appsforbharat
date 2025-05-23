import { v4 as uuidv4 } from 'uuid';
import {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../repositories/productRepository.js';


export const createProduct = async (req, res) => {
  try {
    const product = {
      id: uuidv4(),
      ...req.body
    };
    await addProduct(product);
    res.status(201).json({ message: 'Product added', product });
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ message: 'Failed to add product' });
  }
};

export const listProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const data = await getAllProducts(parseInt(page), parseInt(limit));
    res.json(data);
  } catch (err) {
    console.error('Error listing products:', err);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ message: 'Failed to fetch product' });
  }
};

export const updateProductById = async (req, res) => {
  try {
    const updated = await updateProduct(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product updated', updated });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ message: 'Failed to update product' });
  }
};



export const deleteProductById = async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ message: 'Failed to delete product' });
  }
};
