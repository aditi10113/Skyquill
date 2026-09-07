# ✨ SkyQuill — AI-Powered Blog Platform

SkyQuill is a full-stack AI-powered blogging platform that allows users to create, manage, and publish blog posts through a modern web interface. It includes secure authentication, AI-assisted content generation, image support, and an admin dashboard.

## 🚀 Features

* 🔐 User Sign Up & Sign In
* 🤖 AI-powered blog content generation
* ✍️ Create, edit, and publish blog posts
* 🖼️ Blog thumbnail/image support
* 🔎 Browse and search blogs
* 👤 User authentication with JWT
* 🛡️ Protected API routes
* 📊 Admin dashboard
* 💬 Blog comments
* 📱 Responsive UI
* ⚡ Fast React/Vite frontend
* 🗄️ MongoDB database
* 🌐 RESTful Express.js backend

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* REST APIs

### AI & Services

* Google/Gemini API
* Image hosting service
* MongoDB Atlas

### Development Tools

* Git
* GitHub
* VS Code
* Postman

## 📁 Project Structure

```text
SkyQuill-FullStack/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── configs/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/aditi10113/Skyquill.git
cd Skyquill
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

## 🔑 Environment Variables

Create a `.env` file inside the `server` directory.

Example:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Create a `.env` file inside the `client` directory if required by your deployment configuration:

```env
VITE_BASE_URL=http://localhost:3000
```

**Never commit `.env` files or API keys to GitHub.**

## ▶️ Run Locally

### Start the backend

```bash
cd server
npm run server
```

The backend will run on:

```text
http://localhost:3000
```

### Start the frontend

In another terminal:

```bash
cd client
npm run dev
```

Open the URL shown by Vite, usually:

```text
http://localhost:5173
```

## 🔐 Authentication

SkyQuill uses JWT-based authentication.

The authentication flow includes:

1. User registration
2. Password hashing
3. User login
4. JWT token generation
5. Protected API requests
6. Authenticated user sessions

## 🤖 AI Blog Generation

SkyQuill integrates AI to assist users in creating blog content.

Users can provide a topic or prompt, and the application can generate structured blog content that can then be edited and published.

## 🗄️ Database

SkyQuill uses MongoDB for storing application data.

Main data entities include:

* Users
* Blogs
* Comments

MongoDB Atlas can be used for cloud database hosting.

## 🌐 Deployment

Recommended architecture:

```text
                    ┌─────────────────┐
                    │     User        │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Vercel Frontend │
                    │ React + Vite    │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Backend Server  │
                    │ Node + Express  │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ MongoDB Atlas   │
                    └─────────────────┘
```

The frontend can be deployed on Vercel, while the Express backend can be deployed on a Node-compatible hosting platform.

## 🧪 API Examples

### Register

```http
POST /api/user/register
```

Example request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "your-password"
}
```

### Login

```http
POST /api/user/login
```

Example request:

```json
{
  "email": "john@example.com",
  "password": "your-password"
}
```

## 📌 Future Improvements

* OAuth / Google authentication
* Advanced blog analytics
* AI-generated images
* Bookmarking and favorites
* Advanced search and filtering
* Email notifications
* Dark mode
* Social sharing
* Improved admin analytics

## 👩‍💻 Author

**Aditi Bhargava**

Full-Stack Developer interested in building scalable web applications, AI-powered products, and modern software solutions.

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

**Built with React, Node.js, Express, MongoDB, and AI.**
