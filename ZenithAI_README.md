# 🌿 Zenith AI – Your Wellness Companion

Zenith AI is a **Generative AI-powered mental wellness app** built with **React (Vite + TypeScript)**.  
It provides an AI companion for journaling, emotional support, and mindfulness.

---

## 🚀 Features
- 🤖 AI-powered chat for youth mental wellness (Gemini API integration)
- 💬 Real-time chat interface with typing indicators
- 📊 Personalized insights & recommendations
- 🌙 Simple, modern UI with React + TailwindCSS

---

## ⚙️ Installation & Setup

### 1️⃣ Prerequisites
- [Node.js (LTS)](https://nodejs.org/) installed
- A **Gemini API key** (from [Google AI Studio](https://makersuite.google.com/))

### 2️⃣ Clone & Unzip Project
```bash
git clone <your-repo-url>
cd zenith-ai
```

Or if using the provided zip, just extract it and open the folder.

### 3️⃣ Install Dependencies
```bash
npm install
```

### 4️⃣ Setup Environment Variables
Create a `.env.local` file in the project root (if not already present):
```
VITE_GEMINI_API_KEY=your_api_key_here
```

### 5️⃣ Run Development Server
```bash
npm run dev
```
Now open: [http://localhost:5173](http://localhost:5173)

### 6️⃣ Build for Production
```bash
npm run build
npm run preview
```

---

## 📂 Project Structure
```
zenith-ai/
│── components/       # Reusable UI components
│── services/         # API services (Gemini integration)
│── App.tsx           # Main React app
│── index.tsx         # Entry point
│── package.json      # Dependencies & scripts
│── vite.config.ts    # Vite configuration
│── .env.local        # API keys (not committed)
```

---

## 🛡️ Safety & Wellness Note
Zenith AI is **not a replacement for professional help**.  
If you are in crisis, please contact local helplines or professional services.

---

## 📸 Screenshots (Add later)
- [ ] Home screen  
- [ ] AI Chat screen  
- [ ] Insights dashboard  

---

## 👨‍💻 Developer Notes
- Tech stack: **React + Vite + TypeScript + TailwindCSS**
- Deployment options: **Vercel, Netlify, or Firebase Hosting**
- API: **Google Gemini AI**

---

✨ Built with care for youth mental wellness ❤️
