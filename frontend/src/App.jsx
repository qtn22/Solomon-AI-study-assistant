import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Start from "./pages/Start.jsx";
import Upload from "./pages/Upload.jsx";
import Chat from "./pages/Chat.jsx";
import Quiz from "./pages/Quiz.jsx";

function App() {
  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900">
      <Navbar />

      <main className="w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/start" element={<Start />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;