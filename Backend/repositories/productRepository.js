let products = [];

export function addProduct(product) {
  products.push(product);
}

export function getProductById(id) {
  return products.find(p => p.id === id);
}

export function getAllProducts(page = 1, limit = 10) {
  const start = (page - 1) * limit;
  return {
    products: products.slice(start, start + limit),
    total: products.length
  };
}

export function updateProduct(id, updates) {
  const product = getProductById(id);
  if (product) Object.assign(product, updates);
  return product;
}

export function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
}
