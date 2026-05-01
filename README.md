# 📦 STOCKLY | Luxury Product Inventory System

STOCKLY is a premium, full-stack MERN (MongoDB, Express, React, Node.js) application designed for high-end product management and luxury commerce. It features a sophisticated glassmorphic UI, robust Role-Based Access Control (RBAC), and a seamless shopping experience.

---

## ✨ Key Features

### 🏛️ Luxury Dashboard
- **Glassmorphic Aesthetic**: High-end dark mode design with subtle blurs and premium gradients.
- **Role-Based Overview**: Admins see comprehensive business metrics (Total Products, Categories, Stock Alerts) while Users get a clean, product-focused catalog.

### 🔐 Advanced Authentication (RBAC)
- **Secure JWT Auth**: Sessionless authentication using JSON Web Tokens.
- **Role Permissions**: 
  - **Admin**: Full CRUD capabilities (Create, Read, Update, Delete) for products and inventory management.
  - **User**: Commerce-focused experience (Browse, Add to Cart, Buy Now).

### 🛒 High-End Commerce
- **Global Cart System**: Persistent shopping cart state across the entire session.
- **Stock Validation**: Strict inventory checks preventing users from purchasing more than available stock.
- **Visual Grid**: 3-column responsive product cards with high-quality imagery and hover-activated commerce actions.

### 📄 Automated Operations
- **Invoice Generation**: Real-time PDF invoice generation upon checkout using `jspdf`.
- **Inventory Tracking**: Real-time stock level updates and "Sold Out" state management.

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS (Glassmorphism), Lucide React (Icons), Axios.
- **Backend**: Node.js, Express.js, JWT (Security), Joi (Input Validation).
- **Database**: MongoDB Atlas (Cloud Database).
- **Utility**: Jspdf (Invoice generation), Bcrypt (Password hashing).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas Account (or local MongoDB)

### 1. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```
Start the server:
```bash
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```
Start the development server:
```bash
npm run dev
```

---

## 🏗️ Project Structure

```text
├── backend/
│   ├── controllers/   # Business logic for products/auth
│   ├── models/        # Mongoose schemas (User, Product)
│   ├── routes/        # API endpoints (v1 architecture)
│   ├── middleware/    # Auth & Error handling
│   └── seeder.js      # Database population script
└── frontend/
    ├── src/
    │   ├── components/# Reusable UI (Header, Sidebar, Modal)
    │   ├── context/   # Global State (Auth, Cart)
    │   ├── pages/     # Main views (Dashboard, Cart, Auth)
    │   └── utils/     # Invoicing & helper functions
```

---

## 💎 Design Philosophy
STOCKLY is built on the principle of **"Minimalist Opulence."** By utilizing `backdrop-blur` and deep-dark color palettes (`#020617`), the application provides a distraction-free environment that emphasizes the visual quality of the luxury products.

---

## 👨‍💻 Developer
Developed for the **Internshala MERN Stack Assessment**.
