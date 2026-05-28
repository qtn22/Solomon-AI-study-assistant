from note_generator import client
def create_chat_prompt(question, uploaded_content):
    return f"""
You are Solomon, an AI study assistant.

Your job is to answer the student's question.

Student question:
{question}

Uploaded material:
{uploaded_content}

Rules:
- Do not make up information.
- Explain clearly and simply.
- If the question involves math, explain the formula step by step.
- Write your answer like a helpful tutor.
- If there are math formulas, write them using LaTeX.
- Do not use code blocks.
- For inline formulas, use single dollar signs like $x = y + 2$.
- For larger formulas, use double dollar signs like:
$$
z = \\frac{{x - \\mu}}{{\\sigma}}
$$
- Do not use \\( ... \\). Use $...$ instead.
- Do not leave raw LaTeX commands outside dollar signs.
- If you are not sure how to write a formula in LaTeX, explain it in words instead of writing broken LaTeX.
"""
def answer_question(question, uploaded_content):
    prompt = create_chat_prompt(question, uploaded_content)

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "You are Solomon, a helpful AI study assistant. Answer what student asking"
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2
    )

    return response.choices[0].message.content