# 🔥 Feedback Management Dashboard

A complete, production-ready MERN stack application with authentication, admin panel, and dark mode support.

## ✨ Features

### 🔐 Authentication

- **User Registration & Login** - Secure JWT-based authentication
- **Admin Login** - Separate admin authentication
- **Protected Routes** - Role-based access control
- **Password Security** - Bcrypt hashing

### 📝 Feedback Management

- **Submit Feedback** - Users can submit feedback with ratings (1-5 stars)
- **View Own Feedbacks** - Users can see their submitted feedbacks
- **Admin Dashboard** - Complete analytics and feedback management
- **Real-time Stats** - Total, average rating, positive/negative counts

### 🎨 Modern UI/UX

- **Dark/Light Mode** - Toggle with smooth transitions
- **Framer Motion** - Smooth animations throughout
- **shadcn UI** - Beautiful, accessible components
- **Responsive Design** - Works on all devices
- **TailwindCSS** - Modern styling

### 📊 Admin Features

- **Analytics Dashboard** - Visual statistics cards
- **All Feedbacks Table** - View and manage all submissions
- **Protected Routes** - Admin-only access

## 🛠️ Tech Stack

### Backend

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** enabled

### Frontend

- **React 18** + **Vite**
- **React Router** for routing
- **TailwindCSS** for styling
- **shadcn UI** components
- **Framer Motion** for animations
- **React Icons** for icons
- **Axios** for API calls
- **React Hot Toast** for notifications

## 📁 Project Structure

```
Feedback/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Feedback.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── feedbackRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── utils/
│   │   ├── jwt.js
│   │   └── createAdmin.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── FeedbackForm.jsx
│   │   │   ├── FeedbackTable.jsx
│   │   │   ├── AnalyticsCards.jsx
│   │   │   ├── ThemeToggle.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── Feedback.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── AdminFeedbacks.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── lib/
│   │   │   ├── api.js
│   │   │   └── utils.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install

# Create .env file
PORT=5000
MONGODB_URI=mongodb://localhost:27017/feedback-db
JWT_SECRET=your-super-secret-jwt-key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123

# Start server
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install

# Create .env file (optional)
VITE_API_URL=http://localhost:5000/api

# Start dev server
npm run dev
```

Frontend runs on `http://localhost:5173`

## 📚 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/admin/login` - Admin login
- `GET /api/auth/me` - Get current user (protected)

### Feedback

- `POST /api/feedback` - Create feedback (authenticated)
- `GET /api/feedback` - Get all feedbacks (admin only)
- `GET /api/feedback/my` - Get user's own feedbacks
- `GET /api/feedback/stats` - Get analytics (admin only)

## 🔑 Default Admin Credentials

After first server start, admin user is created with:

- **Email**: From `ADMIN_EMAIL` env variable (default: `admin@example.com`)
- **Password**: From `ADMIN_PASSWORD` env variable (default: `admin123`)

**⚠️ Change these in production!**

## 🎯 Routes

### Public

- `/login` - User login
- `/register` - User registration
- `/admin/login` - Admin login

### Protected (User)

- `/feedback` - Submit and view own feedbacks

### Protected (Admin)

- `/admin/dashboard` - Analytics dashboard
- `/admin/feedbacks` - All feedbacks table

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

- **Backend**: Deploy to [Render](https://render.com)
- **Frontend**: Deploy to [Vercel](https://vercel.com)
- **Database**: Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## 🎨 Features in Detail

### Dark Mode

- Toggle button in navbar
- Persists in localStorage
- Smooth transitions
- Works across all pages

### Animations

- Page transitions with Framer Motion
- Card hover effects
- Table row animations
- Smooth loading states

### Security

- JWT token-based authentication
- Password hashing with bcrypt
- Protected API routes
- Role-based access control
- CORS configuration
