# AI-Driven Lead Conversion Backend

This is the backend for an AI-driven lead conversion platform. It provides RESTful APIs for user authentication, product management, and lead tracking, with sentiment analysis powered by Hugging Face to score leads as "Hot", "Warm", or "Cold".

## Features

- **User Authentication**: Register and login with JWT-based authentication.
- **Product Management**: CRUD operations for products.
- **Lead Tracking**: Create and fetch leads associated with products and users.
- **Sentiment Analysis**: Uses Hugging Face API to analyze product reviews and score leads.
- **Protected Routes**: Most endpoints require authentication.

## Tech Stack

- Node.js
- Express.js
- MongoDB (via Mongoose)
- JWT for authentication
- Hugging Face API for sentiment analysis

## Project Structure

```
backend/
  package.json
  src/
    server.js
    config/
      db.js
    controllers/
      authController.js
      leadController.js
      productController.js
    middleware/
      authMiddleware.js
    models/
      Lead.js
      Product.js
      User.js
    routes/
      authRoutes.js
      leadRoutes.js
      productRoutes.js
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB instance (local or cloud)
- Hugging Face API token

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/ai-driven-lead-conversion.git
   cd ai-driven-lead-conversion/backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the `backend` directory with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   HF_TOKEN=your_huggingface_api_token
   PORT=5000
   ```

4. Start the server:
   ```sh
   npm run dev
   ```
   The server will run on `http://localhost:5000`.

## API Endpoints

### Auth

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive a JWT

### Products

- `GET /api/products` — List all products
- `POST /api/products` — Create a product (auth required)
- `POST /api/products/:productId/review` — Submit a review (auth required, sentiment analyzed)
- `POST /api/products/:productId/cancelPayment` — Simulate payment cancellation (auth required)
- `POST /api/products/:productId/confirmPayment` — Simulate payment confirmation (auth required)

### Leads

- `GET /api/leads` — Get all leads for the authenticated user
- `POST /api/leads` — Create a lead (used internally)

## Environment Variables

- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT signing
- `HF_TOKEN`: Hugging Face API token for sentiment analysis
- `PORT`: Port to run the server (default: 5000)

## License

MIT

---

*Built with Node.js, Express, MongoDB, and Hugging Face NLP.*
