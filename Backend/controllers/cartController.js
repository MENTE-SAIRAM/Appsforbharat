import {
  addToCart,
  removeFromCart,
  getCart
} from '../repositories/cartReposository.js';

export const addItemToCart = (req, res) => {
  const userId = req.user.user_id;
  const { productId, quantity } = req.body;

  if (!productId || quantity <= 0) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  addToCart(userId, productId, quantity);
  res.status(200).json({ message: 'Item added to cart' });
};

export const removeItemFromCart = (req, res) => {
  const userId = req.user.user_id;
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: 'Product ID required' });
  }

  removeFromCart(userId, productId);
  res.status(200).json({ message: 'Item removed from cart' });
};

export const getUserCart = (req, res) => {
  const userId = req.user.user_id;
  const items = getCart(userId);
  res.json({ cart: items });
};
