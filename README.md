# COP 4331 - MERN Stack Cards App 🤿

A full-stack web application built with the MERN stack featuring a deep ocean diving theme.

**Live Demo:** http://129.212.179.35

---

## Technologies Used

### Frontend
- React 18 with TypeScript
- Vite (build tool)
- React Router DOM (client-side routing)
- Custom CSS with CSS Variables and animations

### Backend
- Node.js
- Express.js
- dotenv (environment variables)
- body-parser
- CORS

### Database
- MongoDB Atlas (cloud database)
- MongoDB Node.js Driver

### Deployment
- Digital Ocean (Ubuntu droplet)
- Nginx (reverse proxy)
- PM2 (process manager)

### Tools
- Git & GitHub (version control)
- Postman (API testing)
- VSCode (code editor)

---

## Features

- User registration with validation
- Secure login with session management via localStorage
- Add personal cards to the database
- Search cards with real-time results
- Logout functionality
- Animated ocean background with:
  - Swimming fish and sharks
  - Pulsing jellyfish
  - Poppable bubbles
  - Swaying coral and sea life on the ocean floor

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/register | Create a new user account |
| POST | /api/login | Authenticate a user |
| POST | /api/addCard | Add a new card |
| POST | /api/searchCards | Search cards by keyword |

---

## Project Structure
```
COPCards/
├── frontend/          # React + TypeScript frontend
│   └── src/
│       ├── components/
│       │   ├── Login.tsx
│       │   ├── Register.tsx
│       │   ├── CardUI.tsx
│       │   ├── Bubbles.tsx
│       │   └── PageTitle.tsx
│       ├── App.tsx
│       └── App.css
├── server.js          # Express API server
├── package.json
└── .env               # MongoDB connection string (not committed)
```

---

## Setup Instructions

### Prerequisites
- Node.js v20+
- MongoDB Atlas account

### Local Development

1. Clone the repository
```bash
git clone https://github.com/gaspardantas/COPCards.git
cd COPCards
```

2. Install backend dependencies
```bash
npm install
```

3. Create `.env` file in root directory
```
MONGODB_URI=your_mongodb_connection_string
```

4. Install frontend dependencies and start
```bash
cd frontend
npm install
npm run dev
```

5. Start the backend server
```bash
cd ..
nodemon server.js
```

6. Open `http://localhost:5173` in your browser

---

## Author

Gaspar Dantas — UCF Computer Science
