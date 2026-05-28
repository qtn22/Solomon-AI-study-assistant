import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { UploadCloud, FileText, CheckCircle2 } from "lucide-react";
function UploadBox() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [generatedNote, setGeneratedNote] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);
 useEffect(() => {
  const notes = JSON.parse(localStorage.getItem("savedNotes")) || [];
  setSavedNotes(notes);
}, []);
  function handleFileChange(event) {
    const file = event.target.files[0];

    if (!file) return;

    setSelectedFile(file);
    setStatus("selected");
  }

  async function handleGenerateNote() {
  if (!selectedFile) {
    setErrorMessage("Please choose a PDF or PowerPoint file first.");
    setStatus("error");
    return;
  }

  try {
    setStatus("loading");
    setGeneratedNote("");
    setErrorMessage("");

    const formData = new FormData();
    formData.append("file", selectedFile);

    const response = await axios.post(
      "http://127.0.0.1:8000/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.error) {
      setErrorMessage(response.data.error);
      setStatus("error");
      return;
    }
     const newNote = {
      id: Date.now(),
      title: response.data.note_title || "Untitled Note",
      content: response.data.generated_note,
    };

    const updatedNotes = [newNote, ...savedNotes];
    setGeneratedNote(response.data.generated_note);
    setSavedNotes(updatedNotes);
    localStorage.setItem("savedNotes", JSON.stringify(updatedNotes));
    setStatus("success");
  } catch (error) {
    console.error(error);
    setErrorMessage("Could not connect to the backend. Make sure FastAPI is running.");
    setStatus("error");
  }
}
  return (
    <div className="mx-auto max-w-3xl rounded-3xl border bg-white p-8 shadow-sm">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <UploadCloud size={32} />
        </div>

        <h2 className="text-3xl font-extrabold text-slate-900">
          Generate Study Note
        </h2>
      </div>
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center transition hover:border-blue-500 hover:bg-blue-50">
        <UploadCloud className="mb-3 text-slate-500" size={36} />

        <span className="text-lg font-bold text-slate-800">
          Choose File
        </span>

        <span className="mt-2 text-sm text-slate-500">
          PDF or PowerPoint only
        </span>

        <input
          type="file"
          accept=".pdf,.pptx"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {selectedFile && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl border bg-slate-50 p-4">
          <FileText className="text-blue-600" />

          <div>
            <p className="font-semibold text-slate-900">{selectedFile.name}</p>
            <p className="text-sm text-slate-500">
              {(selectedFile.size / 1024).toFixed(2)} KB
            </p>
          </div>
        </div>
      )}

      {status === "error" && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {errorMessage}
        </p>
      )}
      {status === "loading" && (
        <p className="mt-4 rounded-xl bg-yellow-50 px-4 py-3 text-sm font-medium text-yellow-700">
          Generating your study note...
        </p>
      )}

     {status === "success" && (
  <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
    <CheckCircle2 size={18} />
    Study note generated successfully.
  </div>
)}

{generatedNote && (
  <div className="mt-10 w-full bg-white px-2 py-4 text-left">
    <h3 className="mb-6 text-left text-3xl font-extrabold text-slate-900">
      Generated Note
    </h3>

    <div className="w-full text-left text-lg leading-8 text-slate-800">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          p: ({ children }) => (
            <p className="mb-5 text-left leading-8">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="mb-5 list-disc pl-8 text-left">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-5 list-decimal pl-8 text-left">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="mb-2 text-left">{children}</li>
          ),
          h1: ({ children }) => (
            <h1 className="mb-4 mt-6 text-left text-3xl font-bold">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mb-3 mt-6 text-left text-2xl font-bold">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-3 mt-5 text-left text-xl font-bold">
              {children}
            </h3>
          ),
        }}
      >
        {generatedNote}
      </ReactMarkdown>
    </div>
  </div>
)}

        <div className="mt-10 flex justify-center">
        <button
          onClick={handleGenerateNote}
          className="rounded-3xl bg-blue-600 px-16 py-6 text-3xl font-extrabold text-white shadow-md transition hover:bg-blue-700"
        >
          Generate Note
        </button>
      </div>
      {savedNotes.length > 0 && (
  <div className="mt-10 text-left">
    <h3 className="mb-4 text-2xl font-extrabold text-slate-900">
      Saved Notes
    </h3>

    <div className="space-y-3">
      {savedNotes.map((note) => (
        <button
          key={note.id}
          onClick={() => {
            setGeneratedNote(note.content);
            setStatus("success");
          }}
          className="block w-full rounded-2xl border bg-white px-5 py-4 text-left font-semibold text-slate-800 shadow-sm transition hover:border-blue-400 hover:bg-blue-50"
        >
          {note.title}
        </button>
      ))}
    </div>
  </div>
)}
    </div>
  );
}

export default UploadBox;