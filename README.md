# 🤖Solomon-AI-study-assistant
## Why I made Chatbox?
I came up with the idea for Solomon while studying for my final exams. During that time, I wondered if I could create a website that uses AI, one of today’s most popular technologies, to make studying and preparing for exams easier, especially when working with long and complex learning materials. The name “Solomon” was inspired by a biblical figure often associated with wisdom and intelligence. I hope this project can help other students study more effectively and achieve better academic results.
## Features
-  **📝 Note Generator**:
  Solomon allows users to upload PDF or PowerPoint study materials and transforms them into detailed, organized study notes. All generated notes are saved in the browser, making it easy for users to reopen and review their previous notes later.
-  **💬 Chat box**:
  Users can ask questions about their uploaded materials through the Chatbox. Solomon responds like a personal tutor, providing clear explanations that help students understand the material more easily.
-  **🧠 Quiz Generator**:
  Users can generate a practice quiz to test what they have learned from their uploaded materials. The quiz includes 20 multiple-choice questions. After the user finishes and submits the quiz, Solomon automatically grades the answers and suggests topics the user need to review, helping them focus on areas they need more practice.
## Project Structure
```
RAG chat bot/
├── backend/
│   ├── __pycache__/
│   ├── venv/
│   ├── .env
│   ├── chat_generator.py
│   ├── document_loader.py
│   ├── image.png
│   ├── main.py
│   ├── note_generator.py
│   └── quiz_generator.py
│
└── frontend/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   │   ├── chatbox.css
    │   │   ├── Chatbox.jsx
    │   │   ├── FeatureCard.jsx
    │   │   ├── navbar.css
    │   │   ├── Navbar.jsx
    │   │   ├── Sourcecard.jsx
    │   │   └── Uploadbox.jsx
    │   │
    │   ├── pages/
    │   │   ├── About.jsx
    │   │   ├── chat.jsx
    │   │   ├── Home.jsx
    │   │   ├── quiz.css
    │   │   ├── quiz.jsx
    │   │   ├── start.jsx
    │   │   └── Upload.jsx
    │   │
    │   ├── App.css
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    │
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── package-lock.json
    └── vite.config.js
```
## Quick Set up
1. Clone the repository

2. Backend set up
   Go to the backend folder:
   ```
   cd backend
   ```
   Create and activate a virtual environment:
   ```
   python -m venv venv
   venv\Scripts\activate.bat
   ```
   Install dependencies:
   ```
   pip install fastapi uvicorn python-multipart openai python-dotenv pypdf python-pptx
   ```
   Create a .env file inside the backend folder:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
   Run the backend:
   ```
   uvicorn main:app --reload
   ```
   Backend runs at:
   ```
   http://127.0.0.1:8000
   ```
   FastAPI docs:
   ```
   http://127.0.0.1:8000/docs
   ```
3. Frontend setup

   Open a new terminal and go to the frontend folder:
   ```
   cd frontend
   ```
   Install dependencies:
   ```
   npm install
   ```
   Run the frontend:
   ```
   npm run dev
   ```
   Frontend runs at:
   ```
   http://localhost:5173
   ```
   or another Vite port such as:
   ```
   http://localhost:5174
   ```
   ```
   http://localhost:5175
   ```
## Screenshots
- **Home Page**
- <img width="1691" height="918" alt="image" src="https://github.com/user-attachments/assets/b9501682-adad-4005-8b4a-70b9241f7c68" />
