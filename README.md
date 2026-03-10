# KaajKhojo — Bangladesh's #1 Job Portal

**KaajKhojo** (কাজ খোজো) is a full-stack job portal built for Bangladesh — connecting job seekers with verified employers through an AI-powered platform. Features include smart CV analysis, real-time application tracking, interview preparation, and role-based dashboards for seekers, employers, and admins.

![KaajKhojo](https://img.shields.io/badge/KaajKhojo-Job%20Portal-7c3aed?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)
![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase)

> Connecting talented professionals with top companies across Bangladesh.

---

## 🌐 Live Demo

|                 | URL                                                                                          |
| --------------- | -------------------------------------------------------------------------------------------- |
| **Frontend**    | [job-portal-client-sigma-azure.vercel.app](https://job-portal-client-sigma-azure.vercel.app) |
| **Backend API** | [job-portal-server-livid-seven.vercel.app](https://job-portal-server-livid-seven.vercel.app) |

---

## ✨ Features

### For Job Seekers

- 🔍 Browse and search thousands of job listings
- 📄 Upload and manage CV/Resume
- 🤖 AI-powered CV Analyzer (Groq/LLaMA)
- 📊 Real-time application tracking
- 🔔 Job alert notifications
- 💾 Save favourite jobs

### For Employers

- 📝 Post and manage job listings
- 👥 Browse and filter candidates
- 📨 Manage applications
- 🏢 Company profile with cover photo
- ⭐ Featured job listings

### General

- 🎯 Interview Questions page with expert answers
- 🌙 Light / Dark mode
- 📱 Fully responsive design
- 🔐 Role-based access (Seeker / Employer / Admin)
- 🛡️ Admin dashboard for user and content management

---

## 🛠️ Tech Stack

### Frontend

| Tech            | Usage          |
| --------------- | -------------- |
| React 18 + Vite | UI Framework   |
| Tailwind CSS    | Styling        |
| Framer Motion   | Animations     |
| React Router v6 | Routing        |
| React Hook Form | Form handling  |
| Axios           | API calls      |
| Firebase Auth   | Authentication |

### Backend

| Tech                 | Usage               |
| -------------------- | ------------------- |
| Node.js + Express    | Server              |
| MongoDB + Mongoose   | Database            |
| Firebase Admin       | Token verification  |
| Groq SDK (LLaMA 3.3) | AI CV Analysis      |
| pdf-parse            | PDF text extraction |
| imgbb API            | Image hosting       |
| JWT + Cookies        | Auth tokens         |

---

## 📁 Project Structure

```
kaajkhojo/
├── job-portal-client/          # React frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── context/            # Auth context
│   │   ├── firebase/
│   │   ├── hooks/              # Custom hooks
│   │   ├── layouts/
│   │   ├── pages/              # Page components
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   ├── employer/
│   │   │   ├── job/
│   │   │   ├── seeker/
│   │   │   └── shared/
│   │   ├── routes/             # React Router config
│   │   └── services/           # API service
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── .gitignore
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── README.md
│   └── vercel.json
│
└── job-portal-server/          # Express backend
    ├── config/                 # DB connection
    ├── controllers/
    ├── middleware/             # Auth middleware
    ├── models/                 # Mongoose models
    │   ├── User.js
    │   ├── Job.js
    │   ├── Application.js
    │   └── InterviewQuestion.js
    ├── routes/                 # Express routes
    ├── utils/                  # Helper functions
    ├── index.js
    ├── package.json
    └── vercel.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Firebase project
- Groq API key
- imgbb API key

### 1. Clone the repo

```bash
git clone https://github.com/Topurayhan554/job-portal-client
```

### 2. Backend Setup

```bash
git clone https://github.com/Topurayhan554/job-portal-server
npm install
```

Create `.env`:

```env
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
GROQ_API_KEY=your_groq_key
```

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd job-portal-client
npm install
```

Create `.env.local`:

```env
VITE_API_URL=http://localhost:5000
VITE_IMGBB_API_KEY=your_imgbb_key
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
VITE_FIREBASE_APP_ID=your_app_id
```

```bash
npm run dev
```

### 4. Seed Interview Questions (optional)

```bash
cd job-portal-server
node seedInterviewQuestions.js
```

---

## 🌍 Deployment

### Backend → Vercel

```bash
cd job-portal-server
vercel --prod
```

Add environment variables in Vercel dashboard, then set:

```
CLIENT_URL=https://your-frontend.vercel.app
```

### Frontend → Vercel

```bash
cd job-portal-client
vercel --prod
```

Add all `VITE_*` environment variables in Vercel dashboard.

> ⚠️ Add your frontend domain to Firebase **Authorized Domains**:
> Firebase Console → Authentication → Settings → Authorized domains

---

## 👥 User Roles

| Role         | Access                                            |
| ------------ | ------------------------------------------------- |
| **Seeker**   | Browse jobs, apply, manage CV, track applications |
| **Employer** | Post jobs, manage listings, view applicants       |
| **Admin**    | Full access — manage users, jobs, content         |

---

## 📸 Screenshots

> _Coming soon_

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m "feat: add your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

MIT License © 2024 [Topu Rayhan](https://github.com/Topurayhan554)

---

<div align="center">
  Built with ❤️ using <strong>MERN Stack</strong> — Made in Bangladesh 🇧🇩
</div>
