const API_BASE_URL = '/api';

async function handleApiResponse(res, fallbackMessage) {
  const contentType = res.headers.get('content-type') || '';
  if (!res.ok) {
    if (contentType.includes('application/json')) {
      try {
        const errData = await res.json();
        throw new Error(errData.error || errData.message || fallbackMessage);
      } catch (e) {
        if (e.message && e.message !== fallbackMessage && !e.message.includes('JSON')) {
          throw e;
        }
      }
    }
    const text = await res.text().catch(() => '');
    console.error(`API Error (${res.status}):`, text.slice(0, 300));
    throw new Error(`${fallbackMessage} (Server HTTP ${res.status})`);
  }

  if (contentType.includes('application/json')) {
    return await res.json();
  } else {
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      throw new Error(`Server returned invalid response format (${res.status})`);
    }
  }
}

export async function fetchProducts(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/products?${query}`);
    return await handleApiResponse(res, 'Failed to fetch products');
  } catch (error) {
    console.error('API fetchProducts error:', error);
    return { total: 0, products: [] };
  }
}

export async function fetchProductById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    return await handleApiResponse(res, 'Product not found');
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
  return await handleApiResponse(res, 'Login failed');
}

export async function signupUser(name, email, password) {
  const res = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  return await handleApiResponse(res, 'Signup failed');
}

export async function getCurrentUser() {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/me`);
    if (!res.ok) return null;
    return await handleApiResponse(res, 'Failed to fetch current user');
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
  return await handleApiResponse(res, 'Failed to place order');
}

export async function fetchOrders() {
  try {
    const res = await fetch(`${API_BASE_URL}/orders`);
    if (!res.ok) return [];
    return await handleApiResponse(res, 'Failed to fetch orders');
  } catch (error) {
    return [];
  }
}

export async function fetchOrderById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/${id}`);
    if (!res.ok) return null;
    return await handleApiResponse(res, 'Failed to fetch order');
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
  return await handleApiResponse(res, 'Paystack payment initialization failed');
}

export async function verifyPaystackTransaction(reference) {
  const res = await fetch(`${API_BASE_URL}/paystack/verify/${encodeURIComponent(reference)}`);
  return await handleApiResponse(res, 'Paystack verification failed');
}
