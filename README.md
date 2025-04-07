# 🎓 AI Scholar - Server Side (Backend)

> **AI-Powered Course Management System**  
> The scalable, secure, and intelligent backend powering the future of digital learning.

---

## 🌐 Overview

Welcome to the server-side codebase of **AI Scholar** – an **AI-Powered Course Management System (CMS)** built for modern educators, students, and administrators. This backend RESTful API is designed to seamlessly manage courses, users, content streaming, AI-powered analytics, and secure transactions.

This repository represents the **core engine** of the platform, designed with **Node.js**, **Express**, and **MongoDB**, integrating modern tools like **Cloudinary**, **Stripe**, and **OpenAI APIs** to provide a rich, intelligent learning experience.

> 🧠 Built by a team of 6 passionate developers collaborating on a large-scale full-stack project to redefine online education.

---

## 📑 Table of Contents

- [🚀 Features](#-features)
- [🧰 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🔐 Environment Variables](#-environment-variables)
- [📦 Installation](#-installation)
- [⚙️ Configuration](#-configuration)
- [🧪 Usage](#-usage)
- [🔌 API Endpoints](#-api-endpoints)
- [📡 Deployment](#-deployment)
- [🧠 AI Integration](#-ai-integration)
- [💳 Payment Integration](#-payment-integration)
- [📊 Database](#-database)
- [📨 Notifications](#-notifications)
- [🐞 Troubleshooting](#-troubleshooting)
- [👥 Contributors](#-contributors)
- [📄 License](#-license)

---

## 🚀 Features

✅ **User Management** – Secure login with JWT, role-based access (Admin, Instructor, Student).  
✅ **Course Management** – Create, update, delete courses and nested curriculum structures.  
✅ **Media Uploads** – Upload & manage video/image content with Cloudinary.  
✅ **Video Streaming** – HLS/DASH-ready streaming with React Player.  
✅ **AI Integrations** – OpenAI & Gemini AI for smart recommendations, summaries, quizzes.  
✅ **Database** – MongoDB with schema modeling via Mongoose.  
✅ **Payment Gateway** – Stripe-based secure transactions.  
✅ **Email Notifications** – Nodemailer integration for real-time communication.  
✅ **Scalable Architecture** – Built for cloud deployment and CI/CD workflows.  
✅ **Security Middleware** – Helmet, CORS, and data validation for safety.  
✅ **Logging & Monitoring** – Morgan logger and structured error handling.

---

## 🧰 Tech Stack

| Layer              | Technology                            |
| ------------------ | ------------------------------------- |
| **Backend**        | Node.js, Express.js                   |
| **Database**       | MongoDB, Mongoose                     |
| **AI Services**    | OpenAI Whisper, Gemini AI             |
| **Cloud Storage**  | Cloudinary                            |
| **Authentication** | JWT, OAuth (Google, GitHub), NextAuth |
| **Payments**       | Stripe API                            |
| **Emailing**       | Nodemailer                            |
| **Media Handling** | Multer                                |

---

## 📁 Project Structure

```bash
ai-scholar-server/
├── src/
│   ├── controllers/       # Handles route logic for different entities
│   ├── helpers/           # Utility functions and helper modules
│   ├── middlewares/       # Custom middleware for auth, validation, error handling
│   ├── models/            # Mongoose schema definitions
│   ├── routes/            # API route definitions
│   ├── services/          # Business logic and third-party integrations
│   ├── utils/             # Reusable utility functions
│   └── app.js             # Express app setup and middleware configuration
├── uploads/               # Uploaded media storage (temporary or permanent)
├── .env                   # Environment variables
├── .gitignore             # Ignored files for Git
├── index.js               # Entry point - connects app.js to server and DB
├── package.json           # Project metadata and dependencies
├── package-lock.json      # Exact versions of installed dependencies
├── README.md              # Project documentation
└── vercel.json            # Vercel deployment configuration
```

---

## 🔐 Environment Variables

```env
PORT=5000
CLIENT_URL=http://localhost:3000

DB_URI=YOUR_MONGODB_URI

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

STRIPE_SECRET_KEY=your-stripe-key
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
JWT_SECRET=your-super-secret
```

> 🔒 _Never commit real credentials to version control._

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Sushanto171/ai-scholar-server.git

# Navigate to the project
cd ai-scholar-server

# Install dependencies
npm install
```

---

## ⚙️ Configuration

- Create a `.env` file based on the variables above.
- Connect your **MongoDB** cluster.
- Set up **Cloudinary** credentials.
- Integrate **OpenAI** and **Gemini AI** APIs.
- Configure **Stripe** for payment handling.

---

## 🧪 Usage

```
### Start in Development Mode

npm run dev

### Start in Production Mode

npm start
```

---

## 📌 API Endpoints

### 📚 Course Endpoints

| Endpoint                          | Method | Description                 | Auth       |
| --------------------------------- | ------ | --------------------------- | ---------- |
| `/courses/add-course`             | POST   | Create a new course         | Instructor |
| `/courses/get-courses`            | GET    | Fetch all courses           | Public     |
| `/courses/get-course/details/:id` | GET    | Get specific course details | Public     |
| `/courses/update/:id`             | PUT    | Update a course             | Instructor |
| `/courses/delete/:id`             | DELETE | Delete a course             | Instructor |
| `/courses/categories`             | GET    | Get all course categories   | Public     |

### 👤 User Endpoints

| Endpoint | Method | Description         | Auth   |
| -------- | ------ | ------------------- | ------ |
| `/users` | POST   | Save new user to DB | Public |
| `/users` | GET    | Get all users       | Admin  |

### 🎬 Media Upload Endpoints

| Endpoint             | Method | Description                |
| -------------------- | ------ | -------------------------- |
| `/media/upload`      | POST   | Upload a media file        |
| `/media/delete/:id`  | DELETE | Delete a specific file     |
| `/media/bulk-upload` | POST   | Bulk upload multiple files |

---

## 🧠 AI Integration

The server integrates with **OpenAI** and **Gemini AI** to deliver intelligent features:

- 📄 Content Summarization
- ❓ Smart Quiz & Question Generation
- 🧭 Personalized Learning Paths
- 📈 Student Progress Analysis

---

## 💳 Payment Integration

Using **Stripe**, the server processes:

- One-time payments
- Course enrollments
- Secure transaction logs
- Role upgrades (e.g., Instructor to Premium)

---

## 📊 Database

- 🛢 MongoDB for structured NoSQL data.
- 💡 Mongoose ODM for schema modeling.
- ⚡ Optimized queries with indexing and population.
- 🔒 Role-based secure data access.

---

## 📨 Notifications

- Email notifications via **Nodemailer**.
- Triggered on enrollments, purchases, and instructor actions.
- Real-time and customizable templates.

---

## 📡 Deployment

- Deployed on **Vercel** for fast and scalable delivery.
- Configured for **CI/CD** via GitHub Actions.
- Supports **environment-based configurations**.

---

## 🐞 Troubleshooting

| Issue                      | Solution                                                 |
| -------------------------- | -------------------------------------------------------- |
| MongoDB not connecting     | Check `.env` DB_URI or internet firewall settings        |
| Video uploads failing      | Ensure Cloudinary keys are correct and storage is active |
| JWT Token errors           | Validate token signature and expiration                  |
| AI services not responding | Check API key limits or request body format              |
| Stripe not processing      | Ensure secret key and webhook URL are correctly set      |

---

## 👥 Contributors

Made with ❤️ by:

- **Rafi Ahmed**
- **Sheikh Jabed**
- **Sushanto Sharkar**
- **Imran Ahmed**
- **Abdur Rahman**
- **Shoyon Kumar**

> Thanks to our entire team for building this intelligent and scalable learning experience.

---

## 📄 License

This project is licensed under the **ISC License**.  
© 2025 AI Scholar Team. All rights reserved.

---

> ✨ _Empowering Education with Intelligence. Built for learners. Built for the future._

---
