import { FileText } from "lucide-react";

function SourceCard({ page, text }) {
  return (
    <div className="rounded-2xl border bg-slate-50 p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-600">
        <FileText size={16} />
        Page {page}
      </div>

      <p className="text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

export default SourceCard;