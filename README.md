# Discord Clone

A full-stack clone of Discord, built with HTML, CSS, and JavaScript on the client and Node.js, Express, and MongoDB on the server.

## 🚀 Overview

This project aims to recreate core Discord functionality end-to-end — not just the landing page, but the actual application experience (auth, servers/channels, messaging, etc. as features are built out).

**Current stack:** HTML, CSS, JavaScript, Node.js, Express, MongoDB
**Planned:** Migration to the MERN stack (React front-end) once the core app is functional.

## 🛠️ Tech Stack

**Client**
- HTML5
- CSS3
- JavaScript (Vanilla)

**Server**
- Node.js
- Express.js
- MongoDB

## 📂 Project Structure

```
├── client/
│   ├── assets/       # Images, icons, fonts
│   ├── css/           # Stylesheets
│   ├── js/            # Client-side scripts
│   └── pages/         # HTML pages
│
├── server/
│   ├── config/         # DB and app configuration
│   ├── controllers/    # Route logic / handlers
│   ├── middleware/     # Custom Express middleware
│   ├── models/         # Database schemas/models
│   ├── routes/         # API route definitions
│   ├── services/       # Business logic / helper services
│   └── utils/          # Utility functions
│
├── .env.example
├── package.json
└── package-lock.json
```

## ▶️ Getting Started

1. Clone the repository
   ```bash
   git clone <repository-url>
   ```
2. Navigate into the project folder
   ```bash
   cd discord-clone
   ```
3. Install dependencies
   ```bash
   npm install
   ```
4. Set up environment variables
   ```bash
   cp .env.example .env
   ```
   Then fill in the required values (DB connection string, port, secrets, etc.)

5. Run the server
   ```bash
   npm start
   ```

6. Open the `client/pages` in your browser, or serve them via a live server / static file middleware, depending on how the client is wired to the server.

## 👥 Collaborators

This project was built collaboratively by:

- **Sreerag V S**
- **Nithin M**
- **Ajay N**
- **Salman A**

## 📌 Notes

This is a learning project inspired by Discord and is not affiliated with or endorsed by Discord Inc. The client is currently built with vanilla HTML/CSS/JS, with a planned migration to the MERN stack (React) as the project matures.

## 📄 License

This project is for educational purposes only.