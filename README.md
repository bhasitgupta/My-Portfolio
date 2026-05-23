# 🚀 Bhasit Gupta — Developer Portfolio

> **Premium Futuristic Developer Portfolio** built with Next.js 15+, Three.js, GSAP, Framer Motion & Lenis JS

![Portfolio Preview](./public/preview.png)

## ✨ Features

- 🌐 **Fullscreen Hero** with Three.js holographic 3D scene
- 🤖 **AI Loading Screen** with animated progress & holographic rings
- 🎮 **Custom Cursor** with smooth lag ring
- 📜 **Lenis Smooth Scrolling** at 60 FPS
- 🎬 **Framer Motion** animations on every section
- 🌗 **Dark / Light Theme** with smooth transitions
- 🖥️ **Animated Terminal** section
- 💼 **Projects** with filterable grid & modal popup
- ⏱️ **Timeline** for experience & achievements
- 📬 **Contact Form** with FastAPI backend
- 📱 **Fully Responsive** on all devices

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + Custom CSS |
| 3D | Three.js + React Three Fiber |
| Animations | Framer Motion + Lenis JS |
| Icons | Custom SVGs + Lucide React |
| Backend | Python FastAPI |
| Deploy (FE) | Vercel |
| Deploy (BE) | Railway / Render |

## 🚀 Quick Start

### Frontend

```bash
cd portfolio-site
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Backend

```bash
cd portfolio-site/backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Open [http://localhost:8000/docs](http://localhost:8000/docs) for Swagger UI

## 📁 Project Structure

```
portfolio-site/
├── app/
│   ├── globals.css        # Design system + animations
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Main page assembly
├── components/
│   ├── icons/             # Custom SVG icons
│   ├── Navbar.tsx         # Sticky navigation
│   ├── LoadingScreen.tsx  # AI hologram loader
│   ├── CustomCursor.tsx   # Neon cursor
│   ├── HeroSection.tsx    # Hero with 3D scene
│   ├── HeroScene.tsx      # Three.js 3D scene
│   ├── AboutSection.tsx   # Bio + stats
│   ├── SkillsSection.tsx  # Tech stack showcase
│   ├── ProjectsSection.tsx # Project cards + modals
│   ├── ExperienceSection.tsx # Timeline
│   ├── TerminalSection.tsx # Animated terminal
│   ├── ContactSection.tsx # Contact form + socials
│   ├── Footer.tsx         # Footer
│   ├── ThemeProvider.tsx  # Dark/Light theme
│   └── LenisProvider.tsx  # Smooth scroll
├── backend/
│   ├── main.py            # FastAPI app
│   └── requirements.txt   # Python deps
└── lib/
    └── utils.ts           # Utility functions
```

## 🎨 Design System

- **Colors**: Cyberpunk palette — Cyan `#00f5ff`, Purple `#8b5cf6`, Pink `#ec4899`
- **Fonts**: Orbitron (display) + Inter (body) + JetBrains Mono (code)
- **Effects**: Glassmorphism, Neon glow, Grid overlay, Scanlines, Holographic scan

## 🔧 Environment Variables

Copy `.env.example` to `.env`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=your_app_password
PORTFOLIO_EMAIL=bhasitgupta@email.com
```

## 🚢 Deployment

### Frontend → Vercel
```bash
vercel --prod
```

### Backend → Railway
1. Connect GitHub repo
2. Set root directory to `portfolio-site/backend`
3. Add environment variables
4. Deploy!

## 📬 Contact

- **GitHub**: [@bhasitgupta](https://github.com/bhasitgupta)
- **LinkedIn**: [bhasitgupta](https://linkedin.com/in/bhasitgupta)
- **Twitter**: [@Bhasit1009](https://twitter.com/Bhasit1009)

---

Made with ❤️ by Bhasit Gupta
