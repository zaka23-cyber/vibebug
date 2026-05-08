# VibeBug 🐛

**AI Error Explainer for Vibe Coders**

> Built your app with Lovable, Bolt, or v0 — and now it's broken? VibeBug explains your error in plain English and gives you a ready-to-paste prompt to fix it.

![VibeBug Screenshot](screenshots/Vibebug-1.png)

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.11+-blue.svg)](https://python.org)
[![React](https://img.shields.io/badge/react-18+-61DAFB.svg)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688.svg)](https://fastapi.tiangolo.com)
[![Powered by Claude](https://img.shields.io/badge/powered%20by-Claude%20AI-orange.svg)](https://anthropic.com)

---

## The Problem

You built something with Lovable, Bolt, or v0. It worked — until it didn't.

Now you're staring at this:

```
TypeError: Cannot read properties of undefined (reading 'map')
```

You have no idea what it means. You paste it back into your AI builder. It "fixes" it and creates 3 new errors. You're stuck in a loop.

**VibeBug breaks the loop.**

---

## What It Does

Paste your error message → select your platform → get:

- 🔴 **What went wrong** — in plain English, no jargon
- 🟡 **Why it happened** — the root cause, explained simply
- 🟢 **How to fix it** — step-by-step instructions
- 🟣 **Ready-to-paste prompt** — copy directly into Lovable/Bolt to fix it

![VibeBug Result](screenshots/Vibebug-2.png)

---

## Features

- ✅ **Plain English explanations** — written for people who don't code
- ✅ **Platform-aware** — knows the quirks of Lovable, Bolt, v0, Cursor
- ✅ **Severity levels** — instantly see if it's critical or minor
- ✅ **Ready-to-paste prompts** — one click to copy the exact fix prompt
- ✅ **Optional code snippet** — paste your code for more accurate analysis
- ✅ **Dark mode UI** — easy on the eyes at 2am when you're debugging

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Python + FastAPI |
| AI | Anthropic Claude API (claude-sonnet-4) |
| Fonts | Inter + JetBrains Mono |
| Deploy | Vercel (frontend) + Railway (backend) |

---

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com)

### 1. Clone the repo

```bash
git clone https://github.com/zaka23-cyber/vibebug.git
cd vibebug
```

### 2. Set up the backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in the `backend` folder:

```bash
ANTHROPIC_API_KEY=your-api-key-here
```

Start the backend:

```bash
uvicorn main:app --reload
```

Backend runs on `http://localhost:8000`

### 3. Set up the frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

### 4. Open the app

Go to [http://localhost:5173](http://localhost:5173), paste an error and hit **Debug This →**

---

## API Reference

### `POST /analyze`

Analyzes an error message and returns a structured explanation.

**Request body:**

```json
{
  "error": "TypeError: Cannot read properties of undefined",
  "code": "optional code snippet",
  "platform": "lovable | bolt | v0 | cursor | general"
}
```

**Response:**

```json
{
  "what": "What went wrong in plain English",
  "why": "The root cause explained simply",
  "fix": ["Step 1", "Step 2", "Step 3"],
  "prompt": "Ready-to-paste prompt for your AI builder",
  "severity": "low | medium | high"
}
```

---

## Project Structure

```
vibebug/
├── backend/
│   ├── main.py              # FastAPI app + Claude integration
│   └── requirements.txt     # Python dependencies
└── frontend/
    ├── src/
    │   ├── App.jsx           # Main app + fetch logic
    │   └── components/
    │       ├── ErrorForm.jsx          # Input form
    │       ├── PlatformSelector.jsx   # Platform pill buttons
    │       ├── AnalysisResult.jsx     # Result cards
    │       └── SeverityBadge.jsx      # Severity indicator
    ├── index.html
    └── vite.config.js
```

---

## Roadmap

- [ ] Save and share analysis via link
- [ ] Multiple fix prompts (one per AI builder)
- [ ] Error pattern database — instant answers for common errors
- [ ] GitHub repo URL input — analyze directly from a repo
- [ ] VS Code extension

---

## Contributing

Contributions are welcome! If you find a bug or have a feature idea:

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "add your feature"`
4. Push and open a Pull Request

---

## License

MIT — free to use, modify and distribute.

---

<p align="center">Built with ❤️ and <a href="https://anthropic.com">Claude API</a> by <a href="https://github.com/zaka23-cyber">zaka23-cyber</a></p>
