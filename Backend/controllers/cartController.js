import {
  addToCart,
  removeFromCart,
  getCart
} from '../repositories/cartReposository.js'; 

export const addItemToCart = async (req, res) => {
  const userId = req.user.user_id;
  const { productId, quantity } = req.body;

  if (!productId || quantity <= 0) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    await addToCart(userId, productId, quantity);
    res.status(200).json({ message: 'Item added to cart' });
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const removeItemFromCart = async (req, res) => {
  const userId = req.user.user_id;
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: 'Product ID required' });
  }

  try {
    await removeFromCart(userId, productId);
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (err) {
    console.error('Error removing from cart:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getUserCart = async (req, res) => {
  const userId = req.user.user_id;

  try {
    const items = await getCart(userId);
    res.json({ cart: items });
  } catch (err) {
    console.error('Error retrieving cart:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
