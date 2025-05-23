import pool from '../database/db.js';

export const createOrder = async (userId, items, totalAmount) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const orderResult = await client.query(
      `INSERT INTO orders (user_id, total_amount, status)
       VALUES ($1, $2, 'Success') RETURNING id, created_at`,
      [userId, totalAmount]
    );
    const orderId = orderResult.rows[0].id;

    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity)
         VALUES ($1, $2, $3)`,
        [orderId, item.productId, item.quantity]
      );
    }

    await client.query('COMMIT');
    return {
      orderId,
      userId,
      items,
      totalAmount,
      status: 'Success',
      createdAt: orderResult.rows[0].created_at
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const getOrdersByUser = async (userId, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const result = await pool.query(
    `SELECT o.id AS order_id, o.total_amount, o.created_at, json_agg(
       json_build_object('product_id', oi.product_id, 'quantity', oi.quantity)
     ) AS items
     FROM orders o
     JOIN order_items oi ON o.id = oi.order_id
     WHERE o.user_id = $1
     GROUP BY o.id
     ORDER BY o.created_at DESC
     LIMIT $2 OFFSET $3`,
    [userId, limit, offset]
  );
  const countResult = await pool.query('SELECT COUNT(*) FROM orders WHERE user_id = $1', [userId]);
  return {
    total: parseInt(countResult.rows[0].count),
    page,
    limit,
    orders: result.rows
  };
};
