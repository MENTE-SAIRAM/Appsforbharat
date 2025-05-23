import pool from '../database/db.js';

export const addProduct = async (product) => {
  const { id, name, description, price, stock } = product;
  await pool.query(
    `INSERT INTO products (id, name, description, price, stock)
     VALUES ($1, $2, $3, $4, $5)`,
    [id, name, description, price, stock]
  );
};

export const getProductById = async (id) => {
  const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
  return result.rows[0];
};


export const getAllProducts = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const result = await pool.query('SELECT * FROM products LIMIT $1 OFFSET $2', [limit, offset]);
  const total = await pool.query('SELECT COUNT(*) FROM products');
  return {
    products: result.rows,
    total: parseInt(total.rows[0].count)
  };
};

export const updateProduct = async (id, updates) => {
  const { name, description, price, stock } = updates;
  const result = await pool.query(
    `UPDATE products SET name = $1, description = $2, price = $3, stock = $4 WHERE id = $5 RETURNING *`,
    [name, description, price, stock, id]
  );
  return result.rows[0];
};

export const deleteProduct = async (id) => {
  await pool.query('DELETE FROM products WHERE id = $1', [id]);
};
