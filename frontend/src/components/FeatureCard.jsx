function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <h3 className="mb-2 text-lg font-bold text-slate-900">{title}</h3>

      <p className="text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

export default FeatureCard;