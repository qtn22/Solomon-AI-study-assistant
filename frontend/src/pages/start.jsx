import { Link } from "react-router-dom";
import { FileText, MessageCircleQuestion, GraduationCap } from "lucide-react";

function Start() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 text-center">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900">
          What would you like to do?
        </h1>

        <p className="mt-3 text-lg text-slate-600">
          Choose one option to start studying with Solomon.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Link
          to="/upload"
          className="flex flex-col items-center rounded-3xl border bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <FileText size={28} />
          </div>

          <h2 className="text-2xl font-bold text-slate-900">Note</h2>

          <p className="mt-3 text-slate-600">
            Upload your school notes so Solomon can generate them.
          </p>
        </Link>

        <Link
          to="/chat"
          className="flex flex-col items-center rounded-3xl border bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <MessageCircleQuestion size={28} />
          </div>

          <h2 className="text-2xl font-bold text-slate-900">Chatbox</h2>

          <p className="mt-3 text-slate-600">
            Ask questions and get answers based on your uploaded notes.
          </p>
        </Link>

        <Link
          to="/quiz"
          className="flex flex-col items-center rounded-3xl border bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <GraduationCap size={28} />
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            Practice Quiz
          </h2>

          <p className="mt-3 text-slate-600">
            Create practice questions to get ready for your exam
          </p>
        </Link>
      </div>
    </section>
  );
}

export default Start;