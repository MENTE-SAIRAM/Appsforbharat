import { getCart, clearCart } from '../repositories/cartReposository.js';
import { getProductById } from '../repositories/productRepository.js';
import { createOrder } from '../repositories/orderReposository.js';
import { getOrdersByUser } from '../repositories/orderReposository.js';
export const placeOrder = (req, res) => {
  const userId = req.user.user_id;

  const cartItems = getCart(userId);

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  let totalAmount = 0;
  const validItems = [];

  for (const item of cartItems) {
    const product = getProductById(item.productId);
    if (!product) {
      console.log(`Product not found for ID: ${item.productId}`);
      continue;
    }

    if (item.quantity > 0) {
      totalAmount += product.price * item.quantity;
      validItems.push({
        productId: item.productId,
        quantity: item.quantity
      });
    }
  }

  if (validItems.length === 0) {
    return res.status(400).json({ message: 'No valid products in cart' });
  }

  const order = createOrder(userId, validItems, totalAmount);
  clearCart(userId);

  return res.status(201).json({ message: 'Order placed successfully', order });
};


export const getUserOrders = (req, res) => {
  const userId = req.user.user_id;
  const { page = 1, limit = 10 } = req.query;
  const result = getOrdersByUser(userId, parseInt(page), parseInt(limit));
  res.json(result);
};
