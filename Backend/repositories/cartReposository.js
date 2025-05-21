const cart = {};

export const addToCart = (userId, productId, quantity = 1) => {
  if (!cart[userId]) cart[userId] = [];

  const item = cart[userId].find(item => item.productId === productId);

  if (item) {
    item.quantity += quantity;
  } else {
    cart[userId].push({ productId, quantity });
  }
};

export const removeFromCart = (userId, productId) => {
  if (!cart[userId]) return;
  cart[userId] = cart[userId].filter(item => item.productId !== productId);
};

export const getCart = (userId) => {
  return cart[userId] || [];
};

export const clearCart = (userId) => {
  delete cart[userId];
};
