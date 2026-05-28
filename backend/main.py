
from fastapi import FastAPI, UploadFile, File
from document_loader import load_pdf,load_pptx
from note_generator import generate_note, generate_note_title
from fastapi.middleware.cors import CORSMiddleware
from chat_generator import answer_question
from quiz_generator import generate_quiz
import traceback
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","http://localhost:5174","http://localhost:5175"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
uploaded_content = ""
@app.get("/")
def home():
    return {"message": "Solomon backend is running"}
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        if file.filename.endswith(".pdf"):
            pages = load_pdf(file.file)

        elif file.filename.endswith(".pptx"):
            pages = load_pptx(file.file)

        else:
            return {"message": "Try again. Please upload a PDF or PowerPoint file"}

        full_text = "\n\n".join([page["text"] for page in pages])
        global uploaded_content
        uploaded_content = full_text
        generated_note = generate_note(full_text[:4000])
        note_title = generate_note_title(full_text[:2000])
        preview = pages[0]["text"][:500] if pages else ""

        return {
            "filename": file.filename,
            "message": "File read successfully",
            "pages": len(pages),
            "preview": preview,
            "note_title": note_title,
            "generated_note": generated_note
        }

    except Exception as e:
        return {
            "error": str(e),
            "traceback": traceback.format_exc()
        }
@app.post("/ask")
async def ask_question(data: dict):
    try:
        question = data.get("question", "")

        if not question:
            return {
                "error": "Please enter a question."
            }

        if not uploaded_content:
            return {
                "error": "Please upload a file first."
            }

        answer = answer_question(question, uploaded_content[:4000])

        return {
            "question": question,
            "answer": answer
        }

    except Exception as e:
        return {
            "error": str(e),
            "traceback": traceback.format_exc()
        }
@app.post("/quiz")
async def create_quiz():
    try:
        if not uploaded_content:
            return {
                "error": "Please upload a file first."
            }

        quiz = generate_quiz(uploaded_content[:4000])

        return {
            "quiz": quiz
        }

    except Exception as e:
        return {
            "error": str(e),
            "traceback": traceback.format_exc()
        }