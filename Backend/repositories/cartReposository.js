
import pool from '../database/db.js';

export const addToCart = async (userId, productId, quantity = 1) => {
  const existing = await pool.query(
    'SELECT * FROM cart_items WHERE user_id = $1 AND product_id = $2',
    [userId, productId]
  );

  if (existing.rows.length > 0) {
    await pool.query(
      'UPDATE cart_items SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3',
      [quantity, userId, productId]
    );
  } else {
    await pool.query(
      'INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3)',
      [userId, productId, quantity]
    );
  }
};

export const removeFromCart = async (userId, productId) => {
  await pool.query('DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2', [userId, productId]);
};

export const getCart = async (userId) => {
  const result = await pool.query(
    `SELECT p.id, p.name, p.price, c.quantity
     FROM cart_items c
     JOIN products p ON c.product_id = p.id
     WHERE c.user_id = $1`,
    [userId]
  );
  return result.rows;
};

export const clearCart = async (userId) => {
  await pool.query('DELETE FROM cart_items WHERE user_id = $1', [userId]);
};
