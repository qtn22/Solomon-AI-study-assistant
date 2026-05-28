import { UploadCloud, MessageCircleQuestion, GraduationCap } from "lucide-react";
import FeatureCard from "../components/FeatureCard.jsx";

function Home() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-3xl">
        <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-slate-900">
          Hi, I'm Solomon.
        </h1>

        <p className="mt-5 text-2xl font-semibold text-slate-700">
          Here's what I can help you:
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <FeatureCard
          icon={<UploadCloud size={24} />}
          title="Upload Notes"
          description="Upload your class notes, study guides, or textbook materials."
        />

        <FeatureCard
          icon={<MessageCircleQuestion size={24} />}
          title="Chatbox"
          description="Ask questions about your uploaded notes and get simple explanations."
        />

        <FeatureCard
          icon={<GraduationCap size={24} />}
          title="Practice Quiz"
          description="Generate practice questions to help you study and review important topics."
        />
      </div>
    </section>
  );
}

export default Home;