# 🎄 npm install christmas-tree

![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-2.0.0-blue)
[![Deploy](https://img.shields.io/badge/demo-live-brightgreen)](https://npm-christmas-tree.web.app)

A hyper-realistic, terminal-based Christmas experience for developers. Simulates a package installation that compiles into a 3D "Matrix Code" tree with physics-based snow and global usage stats.

**🔗 [Live Demo](https://npm-christmas-tree.web.app)**

## 🚀 Usage

### Option 1: Run with npx (Instant Experience)

No installation required. Just run this command to open the experience in your browser:

```bash
npx npm-christmas-tree
```

### Option 2: Use as a Library (Programmatic)

You can include the Christmas Tree experience in your own web projects.

```bash
npm install npm-christmas-tree
```

#### Basic Usage

```javascript
import { ChristmasTreeApp } from 'npm-christmas-tree';
import 'npm-christmas-tree/dist/assets/index.css';

const app = new ChristmasTreeApp({
  treeCanvasId: 'my-canvas',
  snowOptions: {
    type: 'tree',        // 'circle' (default) or 'tree'
    color: '#ffffff',    // Snow color
    minSize: 1,          // Minimum flake size
    maxSize: 5,          // Maximum flake size
    count: 200           // Number of flakes
  }
});
app.start();
```

#### Full Example:
Check out the [example/index.html](file:///Users/chan/christmas/example/index.html) for a complete implementation with a landing page and custom triggers.

## ✨ Features

- **Terminal Simulation** - Realistic typing animation with logs fetched from npm registry
- **3D Matrix Tree** - Rotating tree rendered with binary code characters
- **Twinkling Lights** - Colorful Christmas ornaments (red, gold, blue, pink, white)
- **Physics Snow** - Lightweight particle engine for realistic snowfall
- **CRT Aesthetics** - Scanlines, screen flicker, and chromatic aberration effects
- **Global Stats** - Real-time visitor counter via Firebase Firestore
- **Viral Sharing** - Native Web Share API integration
- **Mobile Responsive** - Optimized for all screen sizes

## 📸 Preview

The app simulates `npm install christmas-tree` and reveals a beautiful animated Christmas tree!

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Firebase project with Firestore enabled

### Installation

```bash
# Clone the repository
git clone https://github.com/seochan99/npm-christmas-tree.git
cd npm-christmas-tree

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Firebase config

# Run development server
npm run dev
```

### Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Firestore Database** (start in test mode)
3. Go to Project Settings > Your Apps > Add Web App
4. Copy the config values to your `.env` file

### Firestore Rules

For the global counter to work, update your Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Deploy

```bash
# Build for production
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

## 🛠️ Tech Stack

- **Vite** - Build tool
- **Vanilla JavaScript** - No frameworks, pure JS
- **HTML5 Canvas** - 3D rendering
- **Firebase** - Firestore + Analytics + Hosting
- **CSS3** - Animations & effects

## 📁 Project Structure

```text
├── index.html       # Entry point
├── main.js          # App orchestration
├── terminal.js      # Typing animation & npm simulation
├── tree.js          # 3D Matrix tree rendering
├── snow.js          # Particle snow system
├── firebase.js      # Firebase integration
├── style.css        # All styles & effects
└── firestore.rules  # Database security rules
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing`)
5. Open a Pull Request

## 👤 Author

**Seochan**

- Instagram: [@dev_seochan](https://www.instagram.com/dev_seochan/)
- GitHub: [@seochan99](https://github.com/seochan99)

## 📄 License

MIT License - feel free to use this for your own Christmas greeting!

---

Made with ❤️ and ☕ | Merry Christmas! 🎄
