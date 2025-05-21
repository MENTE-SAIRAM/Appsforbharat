import { v4 as uuidv4 } from 'uuid';

const orders = []; 

export const createOrder = (userId, items, totalAmount) => {
  const order = {
    orderId: uuidv4(),
    userId,
    items,
    totalAmount,
    status: 'Success',
    createdAt: new Date().toISOString()
  };
  orders.push(order);
  return order;
};

export const getOrdersByUser = (userId, page = 1, limit = 10) => {
  const userOrders = orders.filter(order => order.userId === userId);
  const start = (page - 1) * limit;
  const paginated = userOrders.slice(start, start + limit);
  return {
    total: userOrders.length,
    page,
    limit,
    orders: paginated
  };
};
