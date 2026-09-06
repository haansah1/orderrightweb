import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetchAllFolderProducts } from './utils/cloudinary.js';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Load static fallback products
let productsPath = path.join(__dirname, 'data', 'products.json');
if (!fs.existsSync(productsPath)) {
  productsPath = path.join(process.cwd(), 'server', 'data', 'products.json');
}
let staticProducts = [];
try {
  if (fs.existsSync(productsPath)) {
    const data = fs.readFileSync(productsPath, 'utf8');
    staticProducts = JSON.parse(data);
  }
} catch (err) {
  console.error("Error reading products.json:", err);
}

// Cache for Cloudinary-fetched products (refreshes every 5 minutes)
let cachedCloudinaryProducts = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

async function getActiveProducts() {
  const now = Date.now();
  if (cachedCloudinaryProducts && (now - cacheTimestamp) < CACHE_TTL_MS) {
    return cachedCloudinaryProducts;
  }

  try {
    const cldProducts = await fetchAllFolderProducts();
    if (cldProducts && cldProducts.length > 0) {
      cachedCloudinaryProducts = cldProducts;
      cacheTimestamp = now;
      console.log(`Cached ${cldProducts.length} products from Cloudinary (boys + girls)`);
      return cachedCloudinaryProducts;
    }
  } catch (e) {
    console.error("Cloudinary fetch failed, using static products:", e.message);
  }

  return staticProducts;
}

// GET /api/cloudinary/config
app.get('/api/cloudinary/config', (req, res) => {
  res.json({
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || 'dvdsrlh5g',
    streetwearFolder: 'Orderright/tshirts/boys',
    girlsFolder: 'Orderright/tshirts/girls',
    courierFolder: 'Orderright/courier_services'
  });
});

// In-memory orders & user store for demo
let ordersStore = [
  {
    id: "ORD-98421",
    date: "2026-08-28",
    status: "In Transit",
    items: [
      {
        id: "cld-boys-1",
        name: "Streetwear Tee",
        size: "L",
        color: "Deep Charcoal",
        price: 450.00,
        quantity: 1,
        image: ""
      }
    ],
    total: 450.00,
    currency: "GH₵",
    shippingAddress: {
      fullName: "Kofi Mensah",
      address: "14 Independence Avenue, Ridge",
      city: "Accra",
      phone: "+233 24 123 4567"
    },
    paymentMethod: "MTN Mobile Money",
    tracking: {
      carrier: "OrderRight Express",
      trackingNumber: "GH-84920-ACC",
      estimatedDelivery: "2026-08-30",
      steps: [
        { title: "Order Placed", description: "Order confirmed and sent to fulfillment", completed: true, timestamp: "2026-08-28 09:30 AM" },
        { title: "Quality Check & Packaged", description: "Item verified & prepared at Accra Hub", completed: true, timestamp: "2026-08-28 02:15 PM" },
        { title: "In Transit", description: "Package dispatched with courier driver", completed: true, timestamp: "2026-08-29 08:00 AM" },
        { title: "Delivered", description: "Handed over to customer", completed: false, timestamp: "Pending" }
      ]
    }
  }
];

let currentUser = {
  id: "usr-1",
  name: "Kofi Mensah",
  email: "kofi.mensah@example.com",
  phone: "+233 24 123 4567",
  address: "14 Independence Avenue, Ridge, Accra",
  ordersCount: 3,
  wishlistCount: 2
};

// GET /api/products
app.get('/api/products', async (req, res) => {
  const { category, vibe, collection, search, sort, minPrice, maxPrice } = req.query;

  const activeProducts = await getActiveProducts();
  let filtered = [...activeProducts];

  if (collection && collection !== 'All') {
    filtered = filtered.filter(p => (p.collection || '').toLowerCase() === collection.toLowerCase());
  }

  if (category && category !== 'All') {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (vibe && vibe !== 'All') {
    filtered = filtered.filter(p => p.vibe.toLowerCase() === vibe.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.vibe.toLowerCase().includes(q));
  }

  if (minPrice) {
    filtered = filtered.filter(p => p.price >= parseFloat(minPrice));
  }

  if (maxPrice) {
    filtered = filtered.filter(p => p.price <= parseFloat(maxPrice));
  }

  if (sort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === 'newest') {
    filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }

  res.json({
    total: filtered.length,
    products: filtered
  });
});

// GET /api/products/:id
app.get('/api/products/:id', async (req, res) => {
  const activeProducts = await getActiveProducts();
  const product = activeProducts.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});

// AUTH APIs
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  res.json({
    message: "Login successful",
    user: {
      ...currentUser,
      email: email,
      name: email.split('@')[0].toUpperCase()
    }
  });
});

app.post('/api/auth/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  currentUser = {
    id: "usr-" + Date.now(),
    name,
    email,
    phone: "+233 20 000 0000",
    address: "Accra, Ghana",
    ordersCount: 0,
    wishlistCount: 0
  };
  res.json({
    message: "Account created successfully",
    user: currentUser
  });
});

app.get('/api/auth/me', (req, res) => {
  res.json(currentUser);
});

// PAYSTACK PAYMENT ENDPOINTS
const getPaystackSecretKey = () => process.env.PAYSTACK_SECRET_KEY || 'sk_test_paystack_secret_key_placeholder';
const getPaystackPublicKey = () => process.env.PAYSTACK_PUBLIC_KEY || process.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_paystack_public_key_placeholder';

// GET /api/paystack/config
app.get('/api/paystack/config', (req, res) => {
  res.json({
    publicKey: getPaystackPublicKey()
  });
});

// POST /api/paystack/initialize
app.post('/api/paystack/initialize', async (req, res) => {
  const { email, amount, currency = 'GHS', metadata, callback_url } = req.body;
  if (!email || !amount) {
    return res.status(400).json({ error: 'Email and amount are required' });
  }

  const secretKey = getPaystackSecretKey();
  const publicKey = getPaystackPublicKey();

  const isPlaceholderKey = !secretKey || 
    secretKey.includes('placeholder') || 
    secretKey.includes('your_paystack') ||
    secretKey === 'sk_test_paystack_secret_key_placeholder';

  try {
    const amountInPesewas = Math.round(parseFloat(amount) * 100);

    if (isPlaceholderKey) {
      const mockRef = 'pstk_test_' + Math.floor(100000 + Math.random() * 900000);
      return res.json({
        status: true,
        message: 'Paystack transaction initialized (Sandbox)',
        authorization_url: null,
        access_code: 'mock_code_' + Date.now(),
        reference: mockRef,
        isSandbox: true,
        publicKey: publicKey
      });
    }

    const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        amount: amountInPesewas,
        currency,
        metadata: metadata || {},
        callback_url: callback_url || `${req.protocol}://${req.get('host')}/order-confirmation`
      })
    });

    const data = await paystackRes.json();
    if (!data.status) {
      // Fallback sandbox response if Paystack returns key error
      console.warn('Paystack API response status false:', data);
      const mockRef = 'pstk_sb_' + Math.floor(100000 + Math.random() * 900000);
      return res.json({
        status: true,
        message: data.message || 'Paystack Sandbox initialized',
        authorization_url: null,
        access_code: 'sb_code_' + Date.now(),
        reference: mockRef,
        isSandbox: true,
        publicKey: publicKey
      });
    }

    res.json({
      status: true,
      message: 'Paystack transaction initialized',
      authorization_url: data.data.authorization_url,
      access_code: data.data.access_code,
      reference: data.data.reference,
      publicKey: publicKey
    });
  } catch (err) {
    console.error('Paystack initialization error:', err);
    const mockRef = 'pstk_err_' + Math.floor(100000 + Math.random() * 900000);
    res.json({
      status: true,
      message: 'Paystack initialized (Sandbox Fallback)',
      authorization_url: null,
      reference: mockRef,
      isSandbox: true,
      publicKey: publicKey
    });
  }
});

// GET /api/paystack/verify/:reference
app.get('/api/paystack/verify/:reference', async (req, res) => {
  const { reference } = req.params;
  if (!reference) {
    return res.status(400).json({ error: 'Reference required' });
  }

  try {
    const secretKey = getPaystackSecretKey();
    const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${secretKey}`
      }
    });

    const data = await paystackRes.json();
    if (!data.status) {
      return res.status(400).json({ error: data.message || 'Verification failed' });
    }

    res.json({
      status: data.data.status === 'success',
      data: data.data
    });
  } catch (err) {
    console.error('Paystack verification error:', err);
    res.status(500).json({ error: err.message || 'Server error verifying Paystack payment' });
  }
});

// ORDERS APIs
app.get('/api/orders', (req, res) => {
  res.json(ordersStore);
});

app.get('/api/orders/:id', (req, res) => {
  const order = ordersStore.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  res.json(order);
});

app.post('/api/orders', (req, res) => {
  const { items, shippingAddress, paymentMethod, total } = req.body;
  if (!items || items.length === 0) {
    return res.status(400).json({ error: "Order cart items required" });
  }

  const newOrder = {
    id: "ORD-" + Math.floor(10000 + Math.random() * 90000),
    date: new Date().toISOString().split('T')[0],
    status: "Confirmed",
    items,
    total: total || items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    currency: "GH₵",
    shippingAddress: shippingAddress || {
      fullName: currentUser.name,
      address: currentUser.address,
      city: "Accra",
      phone: currentUser.phone
    },
    paymentMethod: paymentMethod || "Paystack (MoMo / Card)"
  };

  ordersStore.unshift(newOrder);
  currentUser.ordersCount += 1;

  res.status(201).json({
    message: "Order placed successfully",
    order: newOrder
  });
});

// In-memory set to prevent duplicate FormNX submissions for the same order
const submittedOrdersBackendSet = new Set();

// FORMNX BACKEND SUBMISSION API
app.post('/api/orders/submit-formnx', async (req, res) => {
  const { order, uploadedImagePath } = req.body;
  if (!order) {
    return res.status(400).json({ error: "Order data required for FormNX submission" });
  }

  const orderId = order.id || order._id || order.reference || 'OR-DEFAULT';
  if (submittedOrdersBackendSet.has(orderId)) {
    console.log(`[Server FormNX Deduplication] Order ${orderId} already processed. Skipping duplicate call.`);
    return res.json({ success: true, message: 'Order already submitted to FormNX', duplicate: true });
  }

  submittedOrdersBackendSet.add(orderId);

  try {
    // 1. GET FormNX Page to obtain CSRF Token & Session Cookies
    const pageRes = await fetch('https://fill.formnx.com/f/orderright-order-forms-38nu94', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });

    const setCookie = pageRes.headers.get('set-cookie') || '';
    const cookies = setCookie.split(',').map(c => c.split(';')[0]).join('; ');
    const html = await pageRes.text();

    const csrfToken = (html.match(/<meta name="csrf-token" content="([^"]+)">/) || [])[1] || '';
    const formId = "28697d8c-8d0a-49a6-8dc7-82e2da3f4898";

    const shipping = order.shippingAddress || {};
    const customerName = shipping.fullName || order.customerName || 'OrderRight Customer';
    const customerEmail = shipping.email || order.customerEmail || 'customer@orderright.com';
    const customerPhone = shipping.phone || order.phone || '0507363108';

    // Format sash details strictly into top-left, top-right, bottom-left, bottom-right
    const formatSashSpecs = (item) => {
      const cd = item.customizationData || item.sashDetails || {};
      const elements = cd.elements || item.elements || [];

      let topLeft = [];
      let topRight = [];
      let bottomLeft = [];
      let bottomRight = [];

      if (elements && elements.length > 0) {
        elements.forEach(elem => {
          const zone = elem.zoneId || '';
          let text = '';
          if (elem.type === 'crest') {
            text = `Crest (${cd.university || elem.universityId || 'University Crest'})`;
          } else if (elem.type === 'custom_logo') {
            text = 'Custom Uploaded Logo';
          } else if (elem.type === 'symbol') {
            text = `Adinkra Symbol (${elem.name || elem.symbolId || 'Symbol'})`;
          } else if (elem.content) {
            text = elem.content;
          }

          if (!text) return;

          if (zone === 'left_upper') topLeft.push(text);
          else if (zone === 'right_upper') topRight.push(text);
          else if (zone === 'left_lower') bottomLeft.push(text);
          else if (zone === 'right_lower') bottomRight.push(text);
          else {
            if (elem.side === 'left') {
              if (elem.type === 'crest' || elem.type === 'custom_logo') topLeft.push(text);
              else bottomLeft.push(text);
            } else {
              if (elem.type === 'verse' || elem.type === 'quote') topRight.push(text);
              else bottomRight.push(text);
            }
          }
        });
      } else {
        if (cd.university) topLeft.push(`Crest (${cd.university})`);
        if (cd.verse && cd.verse !== 'N/A') topRight.push(cd.verse);
        if (cd.name && cd.name !== 'N/A') bottomLeft.push(cd.name);
        if (cd.programme && cd.programme !== 'N/A') bottomRight.push(cd.programme);
      }

      return `top-left: ${topLeft.join(', ') || 'N/A'}\ntop-right: ${topRight.join(', ') || 'N/A'}\nbottom-left: ${bottomLeft.join(', ') || 'N/A'}\nbottom-right: ${bottomRight.join(', ') || 'N/A'}`;
    };

    // Format products summary for field_4
    const itemsList = (order.items || []).map((item, idx) => {
      let details = `${idx + 1}. ${item.name} (Quantity: ${item.quantity})`;
      if (item.size) details += `\n   - Size: ${item.size}`;
      if (item.weight) details += `\n   - Fabric Weight: ${item.weight}`;
      if (item.price) details += `\n   - Unit Price: GH₵ ${Number(item.price).toFixed(2)}`;
      details += `\n   - Item Total: GH₵ ${(Number(item.price || 0) * Number(item.quantity || 1)).toFixed(2)}`;

      if (item.itemType === 'graduation_sash' || item.sashDetails || item.customizationData?.elements) {
        details += `\n   🎓 SASH EMBROIDERY SPECIFICATIONS:\n${formatSashSpecs(item)}`;
      }
      return details;
    }).join('\n\n');

    const productsSummary = `ORDER REFERENCE: #${order.id || order._id || ('OR-' + Date.now())}\n` +
      `========================================\n` +
      `${itemsList}\n` +
      `========================================\n` +
      `SUBTOTAL: GH₵ ${Number(order.total || 0).toFixed(2)}\n` +
      `TOTAL AMOUNT PAID: GH₵ ${Number(order.total || 0).toFixed(2)}\n` +
      `PAYMENT METHOD: ${order.paymentMethod || 'Paystack (MoMo / Card)'}`;

    // Delivery Summary for field_6
    let deliverySummary = `DELIVERY MODE: ${shipping.deliveryMode === 'university' ? 'Free Campus Delivery' : 'Speedaf Branch Pickup'}\n` +
      `DESTINATION: ${shipping.deliveryDestination || 'Standard Delivery'}\n` +
      `SPECIFIC ADDRESS / HALL / ROOM: ${shipping.streetAddress || 'N/A'}`;
    if (shipping.notes) {
      deliverySummary += `\nSPECIAL NOTES: ${shipping.notes}`;
    }

    const orderDate = order.createdAt 
      ? new Date(order.createdAt).toISOString().slice(0, 10) 
      : new Date().toISOString().slice(0, 10);

    const formInputs = {
      "__form_id": formId,
      "name_field_1": customerName,
      "email_field_2": customerEmail,
      "phone_number_field_5": customerPhone,
      "field_4": productsSummary,
      "field_6": deliverySummary,
      "field_7": orderDate,
      "visitor_key": "visitor_" + Date.now(),
      "__time_taken": "10"
    };

    if (uploadedImagePath) {
      formInputs.field_3 = uploadedImagePath;
    }

    const serializedFormData = new URLSearchParams(formInputs).toString();

    // 2. POST to FormNX endpoint
    const submitUrl = `https://fill.formnx.com/form-data/${formId}`;
    const postRes = await fetch(submitUrl, {
      method: 'POST',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-CSRF-TOKEN': csrfToken,
        'Cookie': cookies,
        'X-Requested-With': 'XMLHttpRequest',
        'Referer': 'https://fill.formnx.com/f/orderright-order-forms-38nu94',
        'Origin': 'https://fill.formnx.com'
      },
      body: new URLSearchParams({ form_data: serializedFormData }).toString()
    });

    const result = await postRes.json();
    console.log('FormNX Backend Submission Result:', result);

    if (result.success) {
      res.json({ success: true, message: 'FormNX order form submitted successfully', result });
    } else {
      res.status(500).json({ success: false, error: result.msg || 'FormNX submission failed', result });
    }
  } catch (err) {
    console.error('FormNX submission backend error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

if (process.env.VERCEL !== '1' && !process.env.LAMBDA_TASK_ROOT) {
  app.listen(PORT, () => {
    console.log(`OrderRight Node.js Express server running on port ${PORT}`);
  });
}

export default app;
