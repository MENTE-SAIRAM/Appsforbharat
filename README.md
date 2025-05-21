# 📦 E-Commerce Backend (Mobile Store)

This is the backend for a e-commerce website built using Node.js. It provides RESTful APIs for user authentication, product management, shopping cart operations, and order processing.

---

## 🚀 Tech Stack

- **Node.js**
- **Express**
- **JWT** (for authentication)
- **Joi** (for data validation)

---

## 📁 API Endpoints

### 👤 User Routes

| Method | Endpoint                 | Description       |
|--------|--------------------------|-------------------|
| POST   | `/api/users/register`    | Register a new user |
| POST   | `/api/users/login`       | Login a user        |

---

### 📦 Product Routes (Admin)

| Method | Endpoint                     | Description                      |
|--------|------------------------------|----------------------------------|
| POST   | `/api/products/`             | Create a new product *(Admin only)* |
| GET    | `/api/products/`             | Get all listed products          |
| GET    | `/api/products/:id/`         | Get product details by ID        |
| DELETE | `/api/products/:id/`         | Delete product by ID *(Admin only)* |
| PUT    | `/api/products/:id/`         | Update product details by ID *(Admin only)* |

---

### 🛒 Cart Routes (User)

| Method | Endpoint           | Description                         |
|--------|--------------------|-------------------------------------|
| GET    | `/api/cart/`       | Get all products in user's cart     |
| POST   | `/api/cart/add`    | Add a product to the cart           |
| POST   | `/api/cart/remove` | Remove a product from the cart      |

---

### 📦 Order Routes (User)

| Method | Endpoint                     | Description                          |
|--------|------------------------------|--------------------------------------|
| POST   | `/api/orders/`               | Place an order for all cart items and clear cart |
| GET    | `/api/orders/orderhistory`   | View user's order history            |

---

## 🛡️ Middleware

### ✅ Validation Middleware

- Used to validate incoming request data using Joi schemas.

### 🔐 Auth Middleware

- Ensures that users are authenticated before accessing protected routes.

### 👑 Admin Middleware

- Restricts access to admin-only endpoints like product creation, update, and deletion.

---

## 📦 Installation & Usage

1. Clone the repository  
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
