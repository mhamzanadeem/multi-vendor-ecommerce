# Multi-Vendor E-Commerce Platform

A complete online marketplace where **multiple sellers** can open their own shops and sell products to customers — like Amazon, eBay, or Etsy.

---

## What Is This Project?

This is a full-stack web application that allows:

- **Customers** to browse products, add them to a cart, pay online, and track orders
- **Sellers** to create their own shops, list products, run sales events, manage orders, and withdraw earnings
- **Admins** to oversee all users, sellers, orders, and approve withdrawals

Think of it as a **mini Amazon** where anyone can become a seller.

---

## How It Works (For Non-Technical Users)

### As a Customer:
1. **Sign up** for a free account at `/sign-up`
2. **Browse** products on the home page, best-selling page, or by category
3. **Click on a product** to see its details, reviews, and pricing
4. **Add items to your cart** and proceed to checkout
5. **Pay** using a credit/debit card (Stripe), PayPal, or choose Cash on Delivery
6. **Track your order** from your profile page
7. **Chat with sellers** directly through the built-in messaging system
8. **Leave reviews and ratings** on products you've purchased

### As a Seller:
1. **Register a shop** at `/shop-login` (use the default credentials shown on the page)
2. **Access your dashboard** at `/dashboard`
3. **Add products** with images, descriptions, pricing, and stock levels
4. **Create sales events** with special discounts and time limits
5. **Manage orders** — update status from Processing to Delivered
6. **Create coupon codes** to offer discounts to customers
7. **Chat with customers** in real-time
8. **Withdraw your earnings** to your bank account
9. **View your shop** as customers see it

---

## Where Is It Hosted?

| Component | Platform | URL |
|-----------|----------|-----|
| **Frontend** (what users see) | Vercel | [multi-vendor-ecommerce.vercel.app](https://multi-vendor-ecommerce-nl4xd56sg-mhamzanadeems-projects.vercel.app) |
| **Backend** (server & database) | Render | [multi-vendor-ecommerce.onrender.com](https://multi-vendor-ecommerce-b2tj8wk7h-mhamzanadeems-projects.vercel.app) |
| **Database** | MongoDB Atlas | Cloud-hosted MongoDB |

---

## Default Login Credentials

### Customer Account
- **Email:** `hamzaatwork2000@gmail.com`
- **Password:** `seller01`

### Seller Account
- **Email:** `contact@techhaven.com`
- **Password:** `Shop01`

---

## Features at a Glance

### For Customers
- User registration with email activation
- Browse products by category (10 categories available)
- Search and filter products
- Shopping cart with persistent storage
- Wishlist — save products for later
- Multiple payment options (Card, PayPal, Cash on Delivery)
- Order tracking and history
- Product reviews and star ratings
- Real-time chat with sellers
- Coupon code discounts

### For Sellers
- Dedicated seller dashboard
- Add/edit/delete products with multiple images
- Create time-limited sales events
- Generate and manage coupon codes
- View and manage all orders
- Update order status (Processing → Delivered)
- Handle refund requests
- Withdraw earnings
- Real-time chat with customers
- Shop profile customization

### For Admins
- Overview dashboard with statistics
- Manage all users and sellers
- View all orders and products
- Approve or reject withdrawal requests

---

## Payment Methods

| Method | How It Works |
|--------|-------------|
| **Credit/Debit Card** | Powered by Stripe (test mode). Enter card number, expiry, and CVV. |
| **PayPal** | Click "Pay Now" and complete payment through PayPal's popup. |
| **Cash on Delivery** | Pay when the order arrives at your doorstep. |

---

## Technology Used (Simplified)

| Part | Technology | What It Does |
|------|-----------|--------------|
| **Frontend** | React | Builds the user interface (buttons, pages, forms) |
| **Styling** | Tailwind CSS | Makes the website look good and responsive |
| **Backend** | Node.js + Express | Handles server logic, API requests, and database operations |
| **Database** | MongoDB | Stores all data (users, products, orders, etc.) |
| **Payments** | Stripe + PayPal | Processes online payments securely |
| **Image Storage** | Cloudinary | Stores and optimizes all uploaded images |
| **Real-time Chat** | Socket.IO | Enables live messaging between customers and sellers |
| **Email** | Nodemailer | Sends activation links and notifications |
| **Hosting** | Vercel + Render | Hosts the frontend and backend on the cloud |

---

## Project Structure (What Each Folder Does)

```
multi-vendor-ecommerce/
├── backend/                # The server (brain of the application)
│   ├── config/             # Database connection & environment settings
│   ├── controller/         # Logic for each feature (users, orders, products, etc.)
│   ├── model/              # Database schemas (how data is organized)
│   ├── routes/             # URL endpoints (API addresses)
│   ├── middleware/          # Security checks (is user logged in?)
│   ├── utils/              # Helper tools (email sending, etc.)
│   └── server.js           # Main server file
│
├── frontend/               # The website users see
│   └── src/
│       ├── components/     # Reusable UI pieces (header, footer, forms, etc.)
│       ├── pages/          # Full pages (home, login, dashboard, etc.)
│       ├── redux/          # State management (cart, wishlist, user data)
│       ├── styles/         # Shared CSS styles
│       └── App.jsx         # Main file that maps URLs to pages
│
└── socket/                 # Real-time chat server
    └── index.js            # Chat server entry point
```

---

## How to Run This Project Locally

### What You Need
- A computer with internet connection
- [Node.js](https://nodejs.org/) installed (version 18 or higher)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account (free)
- A [Cloudinary](https://cloudinary.com/) account (free, for image uploads)
- A [Stripe](https://stripe.com/) account (free, for payment testing)

### Step-by-Step Setup

1. **Download the project**
   ```bash
   git clone <repository-url>
   cd multi-vendor-ecommerce
   ```

2. **Install all dependencies**
   ```bash
   npm install
   npm install --prefix frontend
   ```

3. **Set up the backend**
   - Create a `.env` file in the `backend/config/` folder
   - Add your MongoDB connection string, Cloudinary keys, Stripe keys, and email credentials
   - See the `.env` file in the config folder for the exact format

4. **Set up the frontend**
   - Create a `.env` file in the `frontend/` folder
   - Add:
     ```
     VITE_BACKEND_URL=http://localhost:8000
     VITE_SOCKET_URL=http://localhost:8000
     VITE_STRIPE_API_KEY=your_stripe_publishable_key
     ```

5. **Start the servers**
   - Open two terminal windows
   - Terminal 1 (Backend): `npm run dev`
   - Terminal 2 (Frontend): `npm run dev --prefix frontend`

6. **Open your browser** and go to `http://localhost:5173`

---

## Frequently Asked Questions

**Q: Can I use real money on this platform?**
A: No. It's configured in **test mode**. Stripe provides test card numbers, and PayPal uses sandbox. No real money is charged.

**Q: How do sellers get paid?**
A: When a customer's order is marked as "Delivered," 90% of the order value is credited to the seller's balance (10% platform fee). Sellers can then request a withdrawal.

**Q: Can I upload product images?**
A: Yes. Sellers can upload multiple images per product. Images are stored on Cloudinary (a cloud image service).

**Q: Is this mobile-friendly?**
A: Yes. The website is fully responsive and works on phones, tablets, and desktops.


