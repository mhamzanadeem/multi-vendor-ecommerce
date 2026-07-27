# Multi-Vendor Ecommerce

A multi-vendor ecommerce platform with a **React + Vite** frontend and **Node.js + Express** backend, using **MongoDB** for data persistence.

## Tech Stack

### Backend
- **Runtime:** Node.js
- **Database:** MongoDB with Mongoose ODM
- **Auth:** JWT + bcrypt
- **Utilities:** Cookie-parser, dotenv, Nodemailer
- **Dev:** Nodemon

### Frontend
- **Framework:** React 19
- **Bundler:** Vite
- **Styling:** Tailwind CSS v4 + PostCSS
- **Linting:** ESLint 10 with React plugins

## Project Structure

```
multi-vendor-ecommerce/
├── backend/           # Express API server
│   ├── controllers/   # Route handlers
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API route definitions
│   ├── middleware/     # Auth & validation middleware
│   ├── utils/         # Helpers (email, tokens, etc.)
│   └── server.js      # Entry point
├── frontend/          # React SPA
│   ├── src/           # Application source
│   ├── public/        # Static assets
│   └── index.html     # HTML entry
├── .gitignore
├── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB instance (local or Atlas)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd multi-vendor-ecommerce

# Install all dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/multi-vendor
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
CLIENT_URL=http://localhost:5173
```

### Run the Application

```bash
# Run backend (with nodemon)
npm run dev

# Run frontend (separate terminal)
npm run dev --prefix frontend
```

## Features

- Multi-vendor product management
- JWT-based authentication & authorization
- Shopping cart & checkout flow
- Order management
- Email notifications (Nodemailer)
- Responsive UI with Tailwind CSS

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start backend with nodemon |
| `npm run build` | Build frontend for production |
| `npm run lint` | Lint frontend source |
| `npm run preview` | Preview production build |