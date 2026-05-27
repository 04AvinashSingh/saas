<p align="center">
  <h1 align="center">🚀 QuickAI — AI-Powered Content Creation SaaS</h1>
  <p align="center">
    A full-stack SaaS platform that empowers creators with AI-driven tools for writing, image generation, and resume review — built with React 19, Express 5, and Google Gemini.
  </p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.1-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Express-5.1-000000?logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Vite-7.1-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.1-06B6D4?logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Gemini-2.0_Flash-4285F4?logo=google&logoColor=white" alt="Gemini" />
  <img src="https://img.shields.io/badge/Clerk-Auth-6C47FF?logo=clerk&logoColor=white" alt="Clerk" />
  <img src="https://img.shields.io/badge/Deployed-Vercel-000000?logo=vercel&logoColor=white" alt="Vercel" />
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**QuickAI** is a Software-as-a-Service platform that provides a suite of AI-powered content creation tools behind a **freemium subscription model**. Free users get 10 AI generations, while premium subscribers enjoy unlimited access to all features including exclusive image processing tools.

The platform integrates multiple AI services — Google Gemini for text generation, ClipDrop for image generation, and Cloudinary AI for image processing — all behind a unified, intuitive dashboard.

---

## ✨ Features

| Feature | Description | Access |
|---------|-------------|--------|
| ✍️ **Article Writer** | Generate full-length articles on any topic with configurable length (short/medium/long) | Free (10 uses) / Premium |
| 📝 **Blog Title Generator** | Generate SEO-optimized blog titles by keyword and category | Free (10 uses) / Premium |
| 🖼️ **AI Image Generation** | Text-to-image generation with multiple style options (Realistic, Anime, Ghibli, 3D, etc.) | Premium Only |
| 🧹 **Background Removal** | Upload any image and automatically remove its background using AI | Premium Only |
| ✂️ **Object Removal** | Specify an object in your image and AI removes it seamlessly | Premium Only |
| 📄 **Resume Review** | Upload a PDF resume and receive AI-powered constructive feedback | Premium Only |
| 🌐 **Community Gallery** | Public feed of user-generated images with like/unlike functionality | All Users |
| 📊 **Dashboard** | View all past creations, track usage, and manage your account | All Users |

### Additional Highlights

- 🔐 **Authentication & Authorization** — Clerk-powered signup/login with JWT-based API security
- 💳 **Subscription Management** — Built-in pricing table and plan management via Clerk
- 📱 **Responsive Design** — Fully responsive sidebar navigation with mobile hamburger menu
- 🔔 **Toast Notifications** — Real-time feedback for all user actions
- 📝 **Markdown Rendering** — AI-generated content rendered with full markdown support

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 19** | UI library with latest concurrent features |
| **Vite 7** | Lightning-fast build tool with HMR |
| **TailwindCSS 4** | Utility-first CSS with `@theme` configuration |
| **React Router DOM 7** | Client-side routing with nested layouts |
| **Clerk React** | Auth UI components (SignIn, UserButton, PricingTable, Protect) |
| **Axios** | HTTP client for API communication |
| **Lucide React** | Modern icon library |
| **React Markdown** | Safe markdown-to-React rendering |
| **React Hot Toast** | Elegant toast notifications |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Express 5** | Web framework with async error handling |
| **Clerk Express** | Server-side JWT validation & auth middleware |
| **OpenAI SDK** | AI text generation (pointed at Google Gemini endpoint) |
| **Neon Serverless** | Serverless PostgreSQL driver (HTTP-based) |
| **Cloudinary** | Image hosting, background removal, object removal |
| **Multer** | Multipart file upload handling (memory storage) |
| **pdf-parse** | PDF text extraction for resume review |
| **Axios** | External API calls (ClipDrop) |

### Infrastructure
| Service | Purpose |
|---------|---------|
| **Vercel** | Deployment (frontend SPA + backend serverless functions) |
| **Neon Database** | Serverless PostgreSQL with auto-scaling |
| **Cloudinary** | Image CDN + AI image transformations |
| **Clerk** | Authentication, authorization & subscription billing |
| **ClipDrop API** | Text-to-image generation |
| **Google Gemini API** | LLM for text generation (via OpenAI-compatible endpoint) |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (React + Vite)                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│  │  Landing  │  │Dashboard │  │ AI Tools │  │  Community   │   │
│  │   Page    │  │  Layout  │  │  Pages   │  │   Gallery    │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────┘   │
│                         │ Axios + JWT                           │
└─────────────────────────┼───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SERVER (Express 5)                         │
│  ┌────────┐  ┌───────────┐  ┌──────┐  ┌────────────────────┐  │
│  │  CORS  │→ │ClerkMiddle│→ │Require│→ │  Custom Auth MW    │  │
│  │        │  │  ware     │  │ Auth  │  │(plan + usage check)│  │
│  └────────┘  └───────────┘  └──────┘  └────────────────────┘  │
│                                              │                  │
│                    ┌─────────────────────────┼──────┐           │
│                    ▼                         ▼      ▼           │
│            ┌──────────────┐         ┌────────┐ ┌────────┐      │
│            │AI Controller │         │ User   │ │ Multer │      │
│            │(6 endpoints) │         │  Ctrl  │ │(upload)│      │
│            └──────────────┘         └────────┘ └────────┘      │
└──────────┬────────┬──────────┬────────┬─────────────────────────┘
           │        │          │        │
           ▼        ▼          ▼        ▼
      ┌────────┐ ┌───────┐ ┌───────┐ ┌───────────┐
      │Gemini  │ │ClipDr.│ │Cloudi.│ │   Neon    │
      │  API   │ │  API  │ │ CDN   │ │PostgreSQL │
      └────────┘ └───────┘ └───────┘ └───────────┘
```

### Request Flow Example (Generate Article)
```
1. User enters topic → clicks "Generate Article"
2. React sends POST /api/ai/generate-article with Bearer JWT
3. Express middleware chain: CORS → Clerk JWT validation → requireAuth → custom auth
4. Custom auth reads subscription plan + free_usage from Clerk metadata
5. Controller checks usage limits → calls Gemini API → saves to Neon DB
6. Increments free_usage counter → returns generated content
7. React renders markdown response
```

---

## 📁 Project Structure

```
saas/
├── client/                         # Frontend (React + Vite)
│   ├── public/                     # Static assets
│   ├── src/
│   │   ├── assets/                 # Images, icons, static data
│   │   ├── components/             # Reusable UI components
│   │   │   ├── AiTools.jsx         # AI tools showcase section
│   │   │   ├── CreationItem.jsx    # Expandable creation card
│   │   │   ├── Footer.jsx          # Site footer with newsletter
│   │   │   ├── Hero.jsx            # Landing page hero section
│   │   │   ├── Navbar.jsx          # Top navigation bar
│   │   │   ├── Plan.jsx            # Clerk PricingTable wrapper
│   │   │   ├── Sidebar.jsx         # Dashboard sidebar navigation
│   │   │   └── Testimonial.jsx     # Testimonials section
│   │   ├── pages/                  # Route-level page components
│   │   │   ├── Home.jsx            # Landing page (/, public)
│   │   │   ├── Layout.jsx          # Dashboard layout (sidebar + outlet)
│   │   │   ├── Dashboard.jsx       # User dashboard with stats
│   │   │   ├── WriteArticle.jsx    # Article generation tool
│   │   │   ├── BlogTitles.jsx      # Blog title generator
│   │   │   ├── GenerateImages.jsx  # AI image generation
│   │   │   ├── RemoveBackground.jsx# Background removal tool
│   │   │   ├── RemoveObject.jsx    # Object removal tool
│   │   │   ├── ReviewResume.jsx    # Resume review tool
│   │   │   └── Community.jsx       # Public image gallery
│   │   ├── App.jsx                 # Root component with routes
│   │   ├── main.jsx                # Entry point (ClerkProvider + Router)
│   │   └── index.css               # Global styles + Tailwind config
│   ├── index.html                  # HTML template
│   ├── vite.config.js              # Vite configuration
│   ├── vercel.json                 # Vercel SPA rewrite rules
│   └── package.json                # Frontend dependencies
│
├── server/                         # Backend (Express 5)
│   ├── configs/
│   │   ├── db.js                   # Neon PostgreSQL connection
│   │   ├── cloudinary.js           # Cloudinary SDK configuration
│   │   └── multer.js               # Multer file storage config
│   ├── controllers/
│   │   ├── aiController.js         # AI feature logic (6 handlers)
│   │   └── userController.js       # User data & social features
│   ├── middlewares/
│   │   └── auth.js                 # Plan & usage verification middleware
│   ├── routes/
│   │   ├── aiRoutes.js             # AI feature endpoints
│   │   └── userRoutes.js           # User data endpoints
│   ├── server.js                   # Express app entry point
│   ├── vercel.json                 # Vercel serverless config
│   └── package.json                # Backend dependencies
│
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- Accounts on: [Clerk](https://clerk.com), [Neon](https://neon.tech), [Cloudinary](https://cloudinary.com), [Google AI Studio](https://aistudio.google.com)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/quickai-saas.git
cd quickai-saas
```

### 2. Set Up the Database

Create a Neon PostgreSQL database and run:

```sql
CREATE TABLE creations (
    id          SERIAL PRIMARY KEY,
    user_id     TEXT NOT NULL,
    prompt      TEXT NOT NULL,
    content     TEXT NOT NULL,
    type        TEXT NOT NULL,
    publish     BOOLEAN DEFAULT false,
    likes       TEXT[] DEFAULT '{}',
    created_at  TIMESTAMP DEFAULT NOW()
);
```

### 3. Set Up the Server

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory (see [Environment Variables](#-environment-variables)).

```bash
npm run server    # Development (with nodemon)
# or
npm start         # Production
```

The server will start on `http://localhost:3000`.

### 4. Set Up the Client

```bash
cd client
npm install
```

Create a `.env` file in the `client/` directory:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_BASE_URL=http://localhost:3000
```

```bash
npm run dev       # Development server
```

The client will start on `http://localhost:5173`.

---

## 🔐 Environment Variables

### Server (`server/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `DATABASE_URL` | Neon PostgreSQL connection string | `postgresql://user:pass@host/db?sslmode=require` |
| `GEMINI_API_KEY` | Google AI Studio API key | `AIza...` |
| `CLIPDROP_API_KEY` | ClipDrop API key for image generation | `abc123...` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `my-cloud` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `abcdef...` |
| `CLERK_SECRET_KEY` | Clerk secret key | `sk_test_...` |

### Client (`client/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | `pk_test_...` |
| `VITE_BASE_URL` | Backend API base URL | `http://localhost:3000` |

---

## 📡 API Documentation

### Authentication
All API routes (except the root health check) require a valid Clerk JWT token:
```
Authorization: Bearer <token>
```

### AI Routes (`/api/ai`)

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| `POST` | `/generate-article` | `{ prompt, length }` | Generate an article with specified length |
| `POST` | `/generate-blog-title` | `{ prompt }` | Generate blog title suggestions |
| `POST` | `/generate-image` | `{ prompt, publish }` | Generate image from text (Premium) |
| `POST` | `/remove-image-background` | `FormData: image` | Remove image background (Premium) |
| `POST` | `/remove-image-object` | `FormData: image, object` | Remove specified object from image (Premium) |
| `POST` | `/resume-review` | `FormData: resume (PDF)` | AI-powered resume review (Premium) |

### User Routes (`/api/user`)

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| `GET` | `/creations` | — | Get all creations by the logged-in user |
| `GET` | `/published-creations` | — | Get all published creations (community feed) |
| `POST` | `/toggle-like` | `{ id }` | Like or unlike a creation |

### Response Format
```json
// Success
{ "success": true, "content": "..." }

// Error
{ "success": false, "message": "Error description" }
```

---

## 🗄️ Database Schema

```sql
CREATE TABLE creations (
    id          SERIAL PRIMARY KEY,           -- Auto-incrementing ID
    user_id     TEXT NOT NULL,                 -- Clerk user ID
    prompt      TEXT NOT NULL,                 -- User's input prompt
    content     TEXT NOT NULL,                 -- Generated content (text or image URL)
    type        TEXT NOT NULL,                 -- 'article' | 'blog-title' | 'image' | 'resume-review'
    publish     BOOLEAN DEFAULT false,         -- Whether creation is public
    likes       TEXT[] DEFAULT '{}',           -- Array of user IDs who liked
    created_at  TIMESTAMP DEFAULT NOW()        -- Creation timestamp
);

-- Recommended indexes
CREATE INDEX idx_creations_user_id ON creations(user_id);
CREATE INDEX idx_creations_publish ON creations(publish);
CREATE INDEX idx_creations_type ON creations(type);
```

---

## 🌍 Deployment

### Deploying to Vercel

#### Frontend
```bash
cd client
vercel --prod
```
The `vercel.json` rewrites all routes to `/` for SPA compatibility.

#### Backend
```bash
cd server
vercel --prod
```
The `vercel.json` configures `@vercel/node` to run Express as a serverless function.

> **Important:** Set all environment variables in Vercel's dashboard under Project Settings → Environment Variables.

---

## 📸 Screenshots

> *Add screenshots of your application here*

| Landing Page | Dashboard | AI Tool |
|:---:|:---:|:---:|
| Landing page with hero section | User dashboard with creations | Article generation interface |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

<p align="center">
  Built with ❤️ using React, Express, and AI
</p>
