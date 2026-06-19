# 🤖Solomon-AI-study-assistant
## Why I made Chatbox?
I came up with the idea for Solomon while studying for my final exams. During that time, I wondered if I could create a website that uses AI, one of today’s most popular technologies, to make studying and preparing for exams easier, especially when working with long and complex learning materials. The name “Solomon” was inspired by a biblical figure often associated with wisdom and intelligence. I hope this project can help other students study more effectively and achieve better academic results.
## Features
-  **📝 Note Generator**:
  Solomon allows users to upload PDF or PowerPoint study materials and transforms them into detailed, organized study notes. All generated notes are saved in the browser, making it easy for users to reopen and review their previous notes later.
-  **💬 Chatbox**:
  Users can ask questions about their uploaded materials through the Chatbox. Solomon responds like a personal tutor, providing clear explanations that help students understand the material more easily.
-  **🧠 Quiz Generator**:
  Users can generate a practice quiz to test what they have learned from their uploaded materials. The quiz includes 20 multiple-choice questions. After the user finishes and submits the quiz, Solomon automatically grades the answers and suggests topics the user need to review, helping them focus on areas they need more practice.
## Project Structure
```
RAG chat bot/
├── backend/
│   ├── chat_generator.py
│   ├── document_loader.py
│   ├── Dockerfile
│   ├── main.py
│   ├── note_generator.py
│   └── quiz_generator.py
│
└── frontend/
|   ├── src/
|   ├── Dockerfile
|   ├── .gitignore
|   ├── eslint.config.js
|   ├── index.html
|   ├── package.json
|   ├── package-lock.json
|   └── vite.config.js
├──docker-compose.yml
├── .gitignore
└── README.md
```
## Quick Setup
1. Make sure Docker Desktop is installed and running. If not, use this link to download and sign up:
[Docker Desktop](https://www.docker.com/get-started/)
2. Clone the repository
   ```
   git clone https://github.com/qtn22/Solomon-AI-study-assistant.git
   cd Solomon-AI-study-assistant
   ```
3. Create a .env file inside the backend folder:
   ```
   notepad backend\.env
   ```
4. Paste your API key inside the .env file
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
5. Run the app with Docker:
   ```
   docker compose up --build
   ```
6. Open the website on Docker Desktop.
## Screenshots
- **Home Page**
  <img width="1691" height="918" alt="image" src="https://github.com/user-attachments/assets/b9501682-adad-4005-8b4a-70b9241f7c68" />
- **Note Generator**
  <img width="1687" height="921" alt="image" src="https://github.com/user-attachments/assets/27f3a5d6-eb37-4d81-9529-23ed98ecffd3" />
- **Chatbox**
  <img width="1694" height="917" alt="image" src="https://github.com/user-attachments/assets/547901e3-a3c0-4963-8b26-934d2d14c47c" />
- **Practice Quiz**
  <img width="1687" height="918" alt="image" src="https://github.com/user-attachments/assets/0c027694-83ab-427e-a5d5-9d55a2fdf4a3" />
- **Grading and Advising**
  <img width="1500" height="907" alt="image" src="https://github.com/user-attachments/assets/6a8f3381-7a11-430b-bcac-ae1d1d27fb8f" />
