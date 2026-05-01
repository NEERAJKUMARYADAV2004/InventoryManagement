# Product Inventory System - Backend

This is the backend for the Product Inventory System assignment. It is built using Node.js, Express, and MongoDB.

## Features
- JWT Authentication
- Role-Based Access Control (Admin/User)
- Versioned API Routes (`/api/v1/`)
- Product CRUD operations
- Global Error Handling

## Setup Instructions

1.  **Environment Variables**:
    Create a `.env` file in the `backend` directory with the following variables:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_atlas_uri_here
    JWT_SECRET=your_jwt_secret_here
    NODE_ENV=development
    ```

2.  **Install Dependencies**:
    ```bash
    cd backend
    npm install
    ```

3.  **Run the Server**:
    - For development: `npm run dev`
    - For production: `npm start`

## Folder Structure
- `config/`: Database connection logic.
- `controllers/`: Request handling logic.
- `middleware/`: Authentication and error handling middleware.
- `models/`: Mongoose schemas.
- `routes/`: API endpoint definitions.
- `index.js`: Main entry point.
