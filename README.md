# 🚀 Learning Paths App - A Base

## 📚 Introduction

This application is designed to deliver a complete **Learning Paths** experience for users enrolled in the 'A Base' mentorship with online courses. It allows users to view structured courses, track their progress (including marking classes as completed), and manage their access through a simple and intuitive interface. Authentication is handled by Firebase, and the state of user progress is saved locally.

**Learning Paths:** 
- Full Stack JavaScript Front End Wise
- Full Stack JavaScript Back End Wise
- Back End Node.js
- Full Stack Python Back End Wise
- Back End Python
- Data Science
- Data Engineering
- Artificial Intelligence

---

## 📑 Table of Contents

- [Introduction](#-introduction)
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [Deployed Version](#-deployed-version)
- [Contact](#-contact)

---

## ✅ Features

- 🔐 **Authentication** with Google using Firebase Auth (admin) and checking if email is registered (students)
- 🎓 **View Learning Paths**, including multiple courses, modules, and classes  
- ✅ **Mark Classes as Completed** with persistent state via Local Storage  
- 📊 **Progress Tracking** with animated progress bars  
- ⚙️ **Admin and Student Mode** switch with session control  
- ⚡ **Fast Development Setup** with Vite + Tailwind CSS  
- 📦 **State Management** using Context API + React Query  

---

## 🛠 Technologies Used

- **React** – Component-based UI  
- **TypeScript** – Static typing  
- **Context API** – Global state management  
- **Firebase** – Auth and Realtime Database  
- **Tailwind CSS** – Utility-first styling  
- **React Query** – Data fetching and caching  
- **Vite** – Fast bundler  

---

## 📥 Installation

Before you start, make sure you have `Node.js` and `npm` installed and.

1. **Clone the repository**:

```
git clone https://github.com/ProgramadoresSemPatria/trilhas-app-a-base.git
```

2. **Navigate to the frontend directory**:

```
cd trilhas-app-a-base
```

3. **Install dependencies**:

```
npm install
```

4. **Run the application locally**:

```
npm run dev
```

The app should now be running at `http://localhost:5173`.

---

## 🔥 Firebase Setup

To get the app working properly, you need to configure Firebase.

1. **Go to** [https://console.firebase.google.com](https://console.firebase.google.com) and create a new project.

2. **Register a new Web App** and get your Firebase config (`apiKey`, `authDomain`, etc.). Add these values to your `.env` file (you can see .env.example).

3. **Enable Authentication Providers**:
   - Go to **Authentication > Sign-in Method**
   - Enable **Google** provider and configure project name and support email
   - Enable **Anonymous** provider

4. **Enable Realtime Database**:
   - Go to **Realtime Database > Create Database**
   - Choose test mode, or set these rules manually:

```json
{
  "rules": {
    ".read": "true",
    ".write": "true"
  }
}
```

## 📁 Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── custom-hooks/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── lib/
│   ├── constants/
│   └── App.tsx
├── .env
├── index.html
├── tailwind.config.js
└── vite.config.ts
```

---

## 🌐 Deployed Version

Check out the live version [here](https://trilhas-app-borderless-coding.vercel.app/)

---


## 📫 Contact

Made with ❤️ by [Vandilson Brito](https://github.com/vandilsonbrito)