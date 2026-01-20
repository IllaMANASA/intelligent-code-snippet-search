# Intelligent Code Snippet Search with AI

This project is a MERN stack application that allows users to search code snippets stored in MongoDB and receive AI-augmented suggestions to improve or generate relevant code examples. The application follows a **search-first, AI-enhanced** design approach.

---

## 🚀 Features

- 🔍 Search code snippets using MongoDB **text indexing**
- 🤖 AI-augmented suggestions using OpenAI API
- ⭐ Rate code snippets (1–5 star scale)
- ❤️ Save snippets as favorites
- ⚡ Fast search with indexed queries
- 🧩 Clean separation of frontend, backend, and AI services

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Material-UI (MUI)

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- OpenAI API

---

## 🧠 Architecture Overview

1. User enters a search query in the React UI  
2. Backend searches MongoDB using text indexes  
3. Search results are returned immediately  
4. AI is **conditionally invoked** to:
   - Improve existing snippets, or
   - Provide a fallback suggestion if no snippets are found  
5. Results and AI suggestions are displayed separately in the UI  

> MongoDB is the **primary source of truth**.  
> AI acts only as an **enhancement layer**.

---

## 🔎 Sample Search Keywords

Since this is a demo with a limited dataset, try searching with keywords like:

- `jwt`
- `authentication`
- `middleware`
- `mongodb`
- `pagination`
- `node`
- `express`
- `security`
- `bcrypt`

These keywords match the sample snippets stored in the database.

---

## ⭐ Rating & Favorite Design Note

- Ratings are implemented using a **1–5 star scale**
- Favorites and ratings are stored at the snippet level
- User authentication is intentionally omitted to keep the focus on:
  - Search performance
  - MongoDB indexing
  - AI integration

The backend design is modular and can be extended to support user-based authentication if required.

---

## 🤖 AI Integration Note

The application integrates OpenAI to generate or enhance code snippets.  
If the OpenAI API quota is exceeded, the system **gracefully falls back** by returning a clear message while maintaining core search functionality.

---

## ✅ How to Run the Project

### Backend
```bash
cd backend
npm install
node src/server.js

### Frontend
npm install
npm start

🧪 API Testing

Basic endpoint testing is provided for the search API to verify:

MongoDB text search

Indexed query performance

API response structure

📌 Conclusion

This project demonstrates a clean MERN architecture with efficient database search and practical AI augmentation. The focus is on clarity, performance, and extensibility rather than overengineering.