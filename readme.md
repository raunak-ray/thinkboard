# 📝 MERN Notes App

This is my **first full-stack MERN application** where users can **create, read, update, and delete notes**.
The project helped me understand how the frontend and backend communicate and how CRUD operations work in a real application.

---

## 🚀 Features

- Create a new note
- Read all saved notes
- Update an existing note
- Delete a note

> ⚠️ This app focuses only on basic CRUD functionality. No authentication or additional features are included.

---

## 🛠️ Tech Stack

**Frontend**

- React.js
- Axios
- Tailwind CSS

**Backend**

- Node.js
- Express.js

**Database**

- MongoDB
- Mongoose

---

## 📂 Project Structure

```
mern-notes-app/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── controllers/
│   ├── server.js
│
├── frontend/
│   ├── components/
│   ├── lib/
│   ├── pages/
│   ├── App.js
│
├── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/mern-notes-app.git
cd mern-notes-app
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm start
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🌐 Environment Variables

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

---

## 📌 API Endpoints

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| GET    | `/api/notes`     | Get all notes |
| POST   | `/api/notes`     | Create a note |
| PUT    | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |

---

## 🎯 Learning Outcome

- Learned how to build a full stack MERN app
- Understood CRUD operations
- Connected React frontend with Express backend
- Worked with MongoDB and Mongoose

---

## 📄 License

This project is for **learning purposes only**.

---

## 🙌 Acknowledgment

This project was built as part of my learning journey in **full-stack web development**.
