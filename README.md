
---

# 🚀 Streamify – Real-Time RTC Social Platform

A full-stack real-time social communication platform with **chat, friend system, and video calling**, built using the MERN stack and powered by Stream for video and chat infrastructure.

---

## 🌐 Live Links

* 🔗 Frontend: [https://streamify-rtc-social-platform.vercel.app](https://streamify-rtc-social-platform.vercel.app)
* 🔗 Backend API: [https://streamify-rtc-social-platform.onrender.com/api](https://streamify-rtc-social-platform.onrender.com/api)

---

## ✨ Features

### 🔐 Authentication & User Onboarding

* Secure **JWT-based authentication** (HTTP-only cookies)
* Mandatory profile completion before accessing app
* Profile customization:

  * Profile image upload
  * Bio
  * Location
  * Native language
  * Language learning preferences

---

### 👥 Social & Connection System

* Send & manage **friend requests**
* Accept/reject requests via notifications page
* View **online/offline status** of users

---

### 💬 Real-time Chat System

* Instant **real-time messaging**
* Typing indicators
* Message reactions (emoji support)
* Threaded replies for messages
* Image/media sharing with preview & fullscreen view

---

### 📹 Video Calling (Powered by Stream)

* One-on-one & group video calls
* Instant call invite via chat
* Screen sharing support
* Call recording feature
* Live emoji reactions during calls
* Mute/unmute microphone & camera controls

Powered by **Stream SDKs** via Stream

---

### 🎨 UI & Experience

* 32+ customizable UI themes (e.g., Forest theme)
* Responsive and modern UI/UX
* Smooth transitions for real-time interactions

---

## 🛠️ Tech Stack

**Frontend**

* React.js / Next.js
* Tailwind CSS (or equivalent styling)
* Zustand / Context API (state management)

**Backend**

* Node.js
* Express.js
* MongoDB
* JWT Authentication

**Real-time & Media**

* Stream Chat API
* Stream Video SDK

---

## ⚙️ Environment Variables

Create a `.env` file in both client and server:

### Server

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
STREAM_API_KEY=your_stream_key
STREAM_API_SECRET=your_stream_secret
CLIENT_URL=https://streamify-rtc-social-platform.vercel.app
```

### Client

```
VITE_API_BASE_URL=https://streamify-rtc-social-platform.onrender.com/api
```

---

## 📦 Installation & Setup

### 1. Clone repo

```bash
git clone https://github.com/your-username/streamify.git
cd streamify
```

### 2. Backend setup

```bash
cd backend
npm install
npm run dev
```

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🚀 Deployment

* Frontend deployed on **Vercel**
* Backend deployed on **Render**
* Database: **MongoDB Atlas**

---

## 📌 API Base URL

```
https://streamify-rtc-social-platform.onrender.com/api
```

---

## 💡 Key Highlights

* Fully real-time communication system
* Scalable architecture with third-party RTC integration
* Production-ready authentication system
* Modular social + communication features

---

## 📄 License

This project is for educational and portfolio purposes.

---

I
