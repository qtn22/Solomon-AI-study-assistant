from pypdf import PdfReader
from pptx import Presentation
def load_pdf(file):
    reader=PdfReader(file)
    pages=[]
    for i,page in enumerate(reader.pages):
        text=page.extract_text()
        if text:
            pages.append({"page":i+1,"text":text})
    return pages
def load_pptx(file):
    presentation= Presentation(file)
    slides=[]
    for i,slide in enumerate(presentation.slide):
        slide_text=[]
        for shape in slide.shapes:
            if hasattr(shape,"text") and shape.text:
                slide_text.append(shape.text)
        text="\n".join(slide_text)
        if text.strip():
            slides.append({"page":i+1,"text":text})
    return slides