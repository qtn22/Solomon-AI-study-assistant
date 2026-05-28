function About() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-12 max-w-3xl">
        <h1 className="text-4xl font-extrabold">About This Project</h1>

        <p className="mt-4 text-lg leading-8 text-slate-600">
          NoteMind AI is a full-stack RAG website that helps students ask questions from their uploaded notes. It uses document processing, embeddings, vector search, and an LLM to generate grounded answers with sources.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold">How RAG Works</h2>

          <ol className="space-y-4 text-slate-700">
            <li>
              <strong>1. Upload:</strong> The user uploads PDF or text notes.
            </li>
            <li>
              <strong>2. Extract:</strong> The backend extracts text from the file.
            </li>
            <li>
              <strong>3. Chunk:</strong> The notes are split into smaller sections.
            </li>
            <li>
              <strong>4. Embed:</strong> Each chunk is converted into a vector.
            </li>
            <li>
              <strong>5. Retrieve:</strong> The most relevant chunks are found for each question.
            </li>
            <li>
              <strong>6. Generate:</strong> The AI creates an answer using only the retrieved notes.
            </li>
          </ol>
        </div>

        <div className="rounded-3xl border bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold">Tech Stack</h2>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="font-semibold">Frontend</p>
              <p className="text-sm text-slate-600">React, Tailwind CSS</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="font-semibold">Backend</p>
              <p className="text-sm text-slate-600">FastAPI, Python</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="font-semibold">Vector Database</p>
              <p className="text-sm text-slate-600">ChromaDB</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="font-semibold">AI Model</p>
              <p className="text-sm text-slate-600">OpenAI API</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border bg-white p-8 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">Evaluation Plan</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="p-4">Test Case</th>
                <th className="p-4">Expected Result</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="p-4">Ask about a topic in the notes</td>
                <td className="p-4">Answer with source citation</td>
                <td className="p-4 text-green-600 font-semibold">Planned</td>
              </tr>

              <tr className="border-b">
                <td className="p-4">Ask unrelated question</td>
                <td className="p-4">Say information is not found in notes</td>
                <td className="p-4 text-green-600 font-semibold">Planned</td>
              </tr>

              <tr>
                <td className="p-4">Ask for summary</td>
                <td className="p-4">Summarize retrieved note sections</td>
                <td className="p-4 text-green-600 font-semibold">Planned</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default About;