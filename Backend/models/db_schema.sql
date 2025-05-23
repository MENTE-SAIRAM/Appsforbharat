

CREATE TABLE users (
  user_id TEXT PRIMARY KEY,
  password TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE
);


CREATE TABLE products (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  stock INTEGER NOT NULL
);


CREATE TABLE cart_items (
  user_id TEXT REFERENCES users(user_id),
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  PRIMARY KEY (user_id, product_id)
);


CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id TEXT REFERENCES users(user_id),
  total_amount NUMERIC NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE order_items (
  order_id INTEGER REFERENCES orders(id),
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL
);