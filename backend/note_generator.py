import os
from dotenv import load_dotenv
from openai import OpenAI
load_dotenv(dotenv_path=".env")
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def create_note_prompt(text):
    return f"""
You are Solomon, an AI study assistant.
Your job is to turn the uploaded school material into simple study notes.
Use this format:
Generate Note:
Write the main note as normal paragraphs, not bullet points.
Do not center the text.
Do not write it like code.
Explain the content clearly and step by step.

If the uploaded material is divided into chapters, sections, or topics, separate the note by chapter, section, or topic. For example:

Chapter 1: [Chapter Name]
Write the explanation in normal paragraphs.

Chapter 2: [Chapter Name]
Write the explanation in normal paragraphs.
If the topic has formulas, explain what each part means.
If there are math formulas, write them in normal math notation using LaTeX format when needed.
For inline formulas, use single dollar signs like $x = y + 2$.
For larger formulas, use double dollar signs like:
$$
z = \\frac{{x - \\mu}}{{\\sigma}}
$$
Rule:
- Use only the uploaded content.
- Do not make up information that is not in the uploaded material.
- Keep the notes clear, organized, and helpful for studying.
- Every math formula must be written in valid LaTeX.
- Wrap every inline formula with single dollar signs, like $x = y + 2$.
- Wrap every larger formula with double dollar signs.
- Make sure every LaTeX formula has matching braces.
- Do not leave raw LaTeX commands outside dollar signs.
- Do not write incomplete formulas.
Uploaded content:
{text}
"""
def generate_note(text):
    prompt=create_note_prompt(text)
    response= client.chat.completions.create(
    model= "gpt-4o-mini",
    messages=[{
    "role":"system",
    "content": "You are Solomon, a helpful AI study assistant"},
    {"role":"user",
    "content": prompt}
    ],
    temperature=0.2                      
    )
    return response.choices[0].message.content
def generate_note_title(text):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "You create short study note titles."
            },
            {
                "role": "user",
                "content": f"""
Create one short title for this uploaded school material.

Rules:
- Maximum 8 words.
- Do not use quotation marks.
- Do not use a period at the end.
- Make it clear and useful for a student.

Uploaded material:
{text}
"""
            }
        ],
        temperature=0.3
    )

    return response.choices[0].message.content.strip()