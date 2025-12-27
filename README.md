# 📊 Subscription Tracker

A full-stack **Subscription Tracker** application built using the **MERN stack**.  
It helps users manage subscriptions, track renewal dates, and get reminders.

---

## 🚀 Features

- User Authentication (Register / Login / Logout)
- Secure JWT-based authentication
- Create, update, cancel, and delete subscriptions
- Track upcoming subscription renewals
- Workflow-based reminder system
- Rate limiting & bot protection using Arcjet
- MongoDB for data storage
- RESTful API architecture

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Axios
- React Router
- Context API

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Arcjet Security
- Upstash QStash Workflows
- Nodemailer (Email reminders)




---

## ⚙️ Environment Setup

Create a `.env` file in both frontend and backend using `.env.example`.

### Backend
```bash
cd backend
npm install
npm run dev

### frontend
cd frontend
npm install
npm run dev
