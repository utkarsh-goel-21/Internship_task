# NewsFlow - News Aggregator Web Application

**COMPANY**: CODTECH IT SOLUTIONS

**NAME**: Utkarsh Goel

**INTERN ID**: CTIS5964

**DOMAIN**: Full Stack Development

**DURATION**: 4 Weeks

**MENTOR**: Neela Santosh

---

## Description

NewsFlow is a responsive news aggregator web application built as part of the CodTech Full Stack Development Internship (Task 1 - API Integration). The application fetches and displays real-time news data from the [NewsAPI](https://newsapi.org/), allowing users to browse the latest headlines across multiple categories including General, Business, Technology, Sports, Health, Science, and Entertainment.

The project demonstrates the integration of a public REST API into a modern frontend application using React.js and Vite. The architecture follows a clean separation of concerns — API logic is abstracted into a dedicated service layer (`newsService.js`), data fetching and state management is handled through a custom React hook (`useNews.js`), and the UI is broken down into reusable components (`NewsCard`, `CategoryFilter`).

### Key Features

- **Real-time News Fetching**: Live data from NewsAPI with 12 articles per page
- **Category Filtering**: Switch between 7 news categories instantly
- **Pagination**: Navigate through multiple pages of headlines
- **Responsive Design**: Fully responsive grid layout that works on mobile and desktop
- **Error Handling**: Graceful error and loading states for a smooth user experience
- **Clean Architecture**: Separation of concerns with services, hooks, and components

### Tech Stack

- **Frontend**: React.js (v19) with Vite (v8) as the build tool
- **Styling**: Plain CSS with BEM naming convention
- **API**: NewsAPI public REST API
- **Version Control**: Git with conventional commit messages

### Project Structure
```
Task_1/
├── public/
├── src/
│   ├── components/
│   │   ├── NewsCard.jsx
│   │   └── CategoryFilter.jsx
│   ├── hooks/
│   │   └── useNews.js
│   ├── services/
│   │   └── newsService.js
│   ├── App.jsx
│   └── App.css
├── .env
├── index.html
└── package.json
```

### How to Run Locally

1. Clone the repository
2. Navigate to the Task_1 folder
3. Install dependencies:
```bash
   npm install
```
4. Create a `.env` file and add your NewsAPI key:
```
   VITE_NEWS_API_KEY=your_api_key_here
```
5. Start the development server:
```bash
   npm run dev
```
6. Open `http://localhost:5173` in your browser

---

## Output

![NewsFlow App Screenshot](https://github.com/user-attachments/assets/e4688e35-8bd1-4e9d-9729-4a4df6a3c1c2)