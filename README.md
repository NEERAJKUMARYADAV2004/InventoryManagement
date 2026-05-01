# 📦 STOCKLY - Luxury Inventory Management

**STOCKLY** is a high-end, production-ready Product Inventory System built with the **MERN stack**. It features a secure, scalable backend with **Role-Based Access Control (RBAC)** and a glassmorphic, responsive frontend dashboard designed for both administrative management and user-centric commerce.

---

## 🚀 Core Features

### **Backend (Primary Focus)**
*   **Secure Authentication**: User registration and login powered by **JWT (JSON Web Tokens)** and **bcrypt** password hashing.
*   **Role-Based Access Control (RBAC)**: 
    *   **Admin**: Full CRUD permissions (Create, Read, Update, Delete) for managing the catalog.
    *   **User**: Read-only catalog access with commerce features like "Buy Now" and automated invoice generation.
*   **Scalable API Design**: RESTful architecture with **v1 versioning**, centralized error handling, and **Joi** input validation.
*   **Database**: Persistent storage using **MongoDB Atlas** for high availability.

### **Frontend (UX/UI)**
*   **Luxury Aesthetic**: Minimalist, glassmorphic UI using **Tailwind CSS**.
*   **Intuitive Navigation**: Fixed-width sidebar with a circular profile dropdown and centered global search.
*   **Responsive Product Grid**: Dynamic card-based layout with aspect-ratio-corrected product imagery and hover effects.

---

## 🛠️ Tech Stack

*   **Frontend**: React.js, Tailwind CSS, Lucide Icons.
*   **Backend**: Node.js, Express.js.
*   **Database**: MongoDB (Atlas).
*   **Validation**: Joi / express-validator.
*   **Auth**: JWT, Bcrypt.

---

## ⚙️ Installation & Setup

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/NEERAJKUMARYADAV2004/InventoryManagement.git
    cd InventoryManagement
    ```

2.  **Environment Variables**:
    Create a `.env` file in the `/backend` folder and add the following:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key
    ```

3.  **Run the Project**:
    *   **Backend**: `cd backend && npm install && npm start`
    *   **Frontend**: `cd frontend && npm install && npm run dev`

---

## 🧪 API Documentation

The full Postman collection is included in this repository to facilitate testing. It includes automated scripts to handle token authentication.

*   **Path**: `/postman/collections/Internshala Backend API.postman_collection.json`
*   **Variables**: Set the `baseUrl` to `http://localhost:5000` inside Postman.

---

## 📈 Scalability & Deployment Note

To scale **STOCKLY** for production-level traffic, I would implement the following:
1.  **Caching**: Use **Redis** for the "Get All Products" endpoint to reduce database latency for frequent catalog views.
2.  **Microservices**: Decouple the Invoice Generation and Authentication logic into independent services to handle high concurrent user loads.
3.  **Load Balancing**: Deploy behind an **Nginx** or **AWS ELB** to distribute traffic across multiple instances of the Node.js server.
4.  **Containerization**: Use **Docker** to ensure consistent development and production environments.

---

## 👤 Author

**Neeraj Kumar Yadav**  
*Frontend Engineer | UX Designer | AI-Integrated Workflows*  
[LinkedIn](https://www.linkedin.com/in/neerajkumaryaduvanshi7232/) | [GitHub](https://github.com/NEERAJKUMARYADAV2004)

---

### **Submission Note**
This project was developed within the 2-hour scope for the Internshala Backend Developer (Intern) Assignment. All core requirements, including JWT Auth, RBAC, and CRUD functionality, have been fully implemented and tested.
