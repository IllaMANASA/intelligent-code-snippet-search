# Backend – Intelligent Code Snippet Search with AI

This backend service provides RESTful APIs for searching, rating, and saving code snippets stored in MongoDB, with optional AI-augmented suggestions using OpenAI. The backend follows a **MongoDB-first, AI-enhanced** architecture.

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- OpenAI API
- dotenv
- CORS

---

## 📁 Project Structure

src/
├── routes/ # API route definitions
├── controllers/ # Request handling and business logic
├── models/ # MongoDB schemas and indexes
├── services/ # External services (AI integration)
├── config/ # Database connection
└── server.js # Application entry point

---

## 🔍 Search API

### Endpoint
GET /api/snippets/search?q=<search_query>

### Description
- Searches code snippets using MongoDB **text indexes**
- Indexed fields:
  - title
  - description
  - tags
  - code
- Results are sorted by **textScore** for relevance
- Returns top matching snippets for performance efficiency

MongoDB serves as the **primary source of truth** for all search results.

---

## ⭐ Rating API

### Endpoint
PUT /api/snippets/:id/rate

### Description
- Allows users to rate a snippet on a **1–5 scale**
- Includes input validation to ensure valid rating values
- Stores the current rating at the snippet level

> For the scope of this task, ratings are implemented without user authentication to keep the focus on search, indexing, and API design.

---

## ❤️ Favorite API

### Endpoint
PUT /api/snippets/:id/favorite

### Description
- Toggles the `isFavorite` flag for a snippet
- Designed as a simple, stateless interaction

---

## 🤖 AI Integration Strategy

- AI is invoked **only after** MongoDB search execution
- Single AI call per search request
- Two scenarios:
  - Enhance or suggest improvements for existing snippets
  - Provide a fallback suggestion if no snippets are found

### Graceful Fallback
If the OpenAI API quota is exceeded, the backend gracefully returns a message indicating that AI suggestions are temporarily unavailable, while keeping core search functionality intact.

---

## ⚡ MongoDB Indexing

Text indexing is configured at the schema level using Mongoose to ensure:
- Fast full-text search
- Scalable query performance
- Efficient relevance-based sorting

---

## 🧪 Testing

Basic API tests are included to verify:
- Search endpoint functionality
- Correct response structure
- Error handling for invalid inputs

---

## 📌 Design Philosophy

- MongoDB-first architecture
- AI used as an enhancement, not a dependency
- Clean separation of concerns
- Minimal and intentional feature set
- Easily extensible for authentication or advanced features

---

## How to Run Backend

npm install
node src/server.js