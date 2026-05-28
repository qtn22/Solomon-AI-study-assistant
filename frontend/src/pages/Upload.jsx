import UploadBox from "../components/UploadBox.jsx";

function Upload() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h1 className="text-4xl font-extrabold">Upload Your School Notes</h1>

        <p className="mt-4 text-lg text-slate-600">
          Start by uploading your class notes. After processing, you can chat with your document.
        </p>
      </div>

      <UploadBox />
    </section>
  );
}

export default Upload;