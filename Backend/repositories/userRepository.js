import pool from '../database/db.js';

export const addUser = async (user) => {
  const { user_id, password, isAdmin } = user;
  await pool.query(
    `INSERT INTO users (user_id, password, is_admin) VALUES ($1, $2, $3)`,
    [user_id, password, isAdmin]
  );
};

export const getUserById = async (user_id) => {
  const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
  return result.rows[0];
};

export const getAllUsers = async () => {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
};
