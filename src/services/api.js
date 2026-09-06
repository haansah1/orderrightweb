const API_BASE_URL = '/api';

export async function fetchProducts(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/products?${query}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return await res.json();
  } catch (error) {
    console.error('API fetchProducts error:', error);
    return { total: 0, products: [] };
  }
}

export async function fetchProductById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error('Product not found');
    return await res.json();
  } catch (error) {
    console.error('API fetchProductById error:', error);
    return null;
  }
}

export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Login failed');
  }
  return await res.json();
}

export async function signupUser(name, email, password) {
  const res = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Signup failed');
  }
  return await res.json();
}

export async function getCurrentUser() {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/me`);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

export async function createOrder(orderPayload) {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderPayload)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to place order');
  }
  return await res.json();
}

export async function fetchOrders() {
  try {
    const res = await fetch(`${API_BASE_URL}/orders`);
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    return [];
  }
}

export async function fetchOrderById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/${id}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

export async function initializePaystackTransaction(payload) {
  const res = await fetch(`${API_BASE_URL}/paystack/initialize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Paystack payment initialization failed');
  }
  return await res.json();
}

export async function verifyPaystackTransaction(reference) {
  const res = await fetch(`${API_BASE_URL}/paystack/verify/${encodeURIComponent(reference)}`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Paystack verification failed');
  }
  return await res.json();
}

