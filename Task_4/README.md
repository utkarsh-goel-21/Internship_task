# ProductivityTracker - Chrome Extension for Time Tracking & Analytics

**COMPANY**: CODTECH IT SOLUTIONS

**NAME**: Utkarsh Goel

**INTERN ID**: CTIS5964

**DOMAIN**: Full Stack Development

**DURATION**: 4 Weeks

**MENTOR**: Neela Santosh

---

## Description

ProductivityTracker is a Chrome extension built as part of the CodTech Full Stack Development Internship (Task 4). It tracks time spent on different websites, classifies them as productive, unproductive, or neutral, and provides a full analytics dashboard with weekly productivity reports.

The project consists of three parts — a Chrome extension that runs in the background tracking active tab time, a Node.js/Express backend that stores data in MongoDB Atlas, and a React.js dashboard that visualizes the analytics.

### Key Features

- **Automatic Time Tracking**: Background service worker tracks time on every website silently
- **Smart Classification**: Sites like GitHub, LeetCode, Udemy are productive. YouTube, Instagram, Reddit are unproductive
- **Extension Popup**: Quick summary showing today's productivity score and time breakdown
- **Full Dashboard**: Weekly productivity score, daily activity bar chart, and top sites list
- **Persistent Storage**: All data stored in MongoDB Atlas cloud database
- **Heartbeat Sync**: Data synced to backend every 30 seconds automatically
- **Responsive Dashboard**: Works across different screen sizes

### Tech Stack

- **Extension**: Chrome Manifest V3, JavaScript
- **Frontend Dashboard**: React.js (v19), Vite (v8), Tailwind CSS (v4), Shadcn UI, Recharts
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB Atlas (cloud)

### Project Structure
```
Task_4/
├── extension/              # Chrome extension
│   ├── manifest.json       # Extension config (Manifest V3)
│   ├── background.js       # Service worker - tracks tab time
│   ├── popup.html          # Extension popup UI
│   ├── popup.css           # Popup styles
│   ├── popup.js            # Popup logic
│   └── icons/              # Extension icons
├── server/                 # Node.js backend
│   ├── index.js            # Express server + MongoDB
│   └── .env                # Environment variables
└── dashboard/              # React analytics dashboard
    ├── src/
    │   ├── components/
    │   │   ├── ScoreCard.jsx
    │   │   ├── ActivityChart.jsx
    │   │   └── SitesList.jsx
    │   ├── hooks/
    │   │   └── useStats.js
    │   ├── services/
    │   │   └── api.js
    │   └── App.jsx
    └── index.html
```

### How to Run Locally

1. **Start the backend server:**
```bash
   cd server
   npm install
   node index.js
```

2. **Start the dashboard:**
```bash
   cd dashboard
   npm install
   npm run dev
```

3. **Load the Chrome extension:**
   - Open `chrome://extensions/`
   - Enable Developer Mode
   - Click "Load unpacked"
   - Select the `extension/` folder

4. Open `http://localhost:5173` for the full dashboard
5. Browse websites and the extension will start tracking automatically

### Productive Sites Classification

Productive: `github.com`, `stackoverflow.com`, `leetcode.com`, `freecodecamp.org`, `udemy.com`, `coursera.org`, and more

Unproductive: `youtube.com`, `instagram.com`, `twitter.com`, `reddit.com`, `netflix.com`, and more

---

## Output

![ProductivityTracker Extension](https://github.com/user-attachments/assets/2578fb77-709a-4c99-8924-8c2b5e4e68e4)

![ProductivityTracker Dashboard](https://github.com/user-attachments/assets/f665ce27-4c96-4090-9d7d-d6513006e205)
