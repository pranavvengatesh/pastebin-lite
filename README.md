# Pastebin Lite

A lightweight Pastebin-like application built as part of a technical assignment.

## 🔧 Tech Stack
- Frontend: React (Vite)
- Backend: Node.js, Express
- Database: MongoDB Atlas
- Deployment:
  - Backend: Render
  - Frontend: Vercel

---------------------

## 🚀 Live URLs

Frontend:
https://pastebin-lite-green-delta.vercel.app
Backend API:
https://pastebin-lite-backend-4ojs.onrender.com
---

## 📡 API Endpoints

### Create Paste
POST /api/pastes

Request body:
{
  "content": "Hello World",
  "ttl_seconds": 300,
  "max_views": 5
}

Response:
{
  "id": "<paste_id>",
  "url": "/p/<paste_id>"
}

---

### Fetch Paste
GET /api/pastes/:id

Returns paste content if:
- Not expired
- Max view count not exceeded

---

### Health Check
GET /api/healthz

Response:
{ "ok": true }

---

## 🧠 Business Logic

- TTL is enforced server-side using an expiresAt timestamp.
- max_views is enforced server-side by incrementing view count on every successful fetch.
- Once TTL expires or max views is exceeded, the API returns 404.
- Frontend only displays data returned by the backend API.

---

## 🛡️ Security & Best Practices
- MongoDB credentials stored using environment variables.
- .env and node_modules are ignored using .gitignore.
- Caching disabled for paste fetch to ensure view count accuracy.

---

## 📝 Notes
- Backend and frontend are deployed separately for scalability.
- The system follows a clean API-driven architecture.
