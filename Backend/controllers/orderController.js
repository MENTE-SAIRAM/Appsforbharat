import { getCart, clearCart } from '../repositories/cartReposository.js';
import { getProductById } from '../repositories/productRepository.js';
import { createOrder, getOrdersByUser } from '../repositories/orderReposository.js';

export const placeOrder = async (req, res) => {
  const userId = req.user.user_id;

  try {
    const cartItems = await getCart(userId); 

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    console.log(cartItems);
    let totalAmount = 0;
    const validItems = [];

    for (const item of cartItems) {
      const product = await getProductById(item.id); 

      if (!product) {
        console.log(`Product not found for ID: ${item.id}`);
        continue;
      }

      if (item.quantity > 0) {
        totalAmount += product.price * item.quantity;
        validItems.push({
          product_id: item.product_id,
          quantity: item.quantity
        });
      }
    }
    console.log(validItems);
    if (validItems.length === 0) {
      return res.status(400).json({ message: 'No valid products in cart' });
    }

    
    
    const order = await createOrder(userId, validItems, totalAmount);

 
    
    await clearCart(userId);

    return res.status(201).json({ message: 'Order placed successfully', order });

  } catch (error) {
    console.error('Error placing order:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getUserOrders = async (req, res) => {
  const userId = req.user.user_id;
  const { page = 1, limit = 10 } = req.query;

  try {
    const result = await getOrdersByUser(userId, parseInt(page), parseInt(limit));
    res.json(result);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
