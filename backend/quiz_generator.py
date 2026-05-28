import json
import random
import re
from note_generator import client


def create_quiz_prompt(uploaded_content):
    return f"""
You are Solomon, an AI study assistant.

Your job is to create a multiple-choice practice quiz from the uploaded school material.

Create exactly 20 multiple-choice questions.

Return ONLY valid JSON.
Do not include markdown.
Do not include explanations outside the JSON.
Do not wrap the JSON in triple backticks.

The JSON must be an array of 20 objects.

Each object must use this exact structure:

{{
  "id": 1,
  "question": "Write the question here.",
  "choices": {{
    "A": "Choice A",
    "B": "Choice B",
    "C": "Choice C",
    "D": "Choice D"
  }},
  "correctAnswer": "A",
  "topic": "Hidden topic for grading only"
}}

Rules:
- Create exactly 20 questions.
- Every question must be multiple choice.
- Every question must have exactly four choices: A, B, C, and D.
- The correctAnswer must be only one letter: A, B, C, or D.
- Randomize the correct answer positions across A, B, C, and D.
- Do not make most correct answers A.
- The correct answers should be balanced across all choices.
- Across 20 questions, use A, B, C, and D as correct answers several times.
- Include a topic label for every question, but this topic is for grading only and should not be shown to the user during the quiz.
- Use only the uploaded material.
- Do not make up information that is not in the uploaded material.
- Do not include explanations.
- If the material is about math, physics, chemistry, statistics, economics, or another calculation-based subject, make most questions calculation exercises.
- For calculation questions, include numbers and formulas.
- For calculation questions, make the answer choices realistic and close to each other.
- Make the difficulty mixed: easy, medium, and challenging.
- If there are math formulas, use LaTeX.
- For inline formulas, use single dollar signs like $x = y + 2$.
- Do not use code blocks.
- Do not center the answer choices.
- Each answer choice must be written on one line when possible.
- Do not put choice circle, choice letter on a separate line with the answer.
- For every math formula, write it using LaTeX.
- Put inline formulas inside single dollar signs, like $E(X) = \sum xP(x)$.
- Do not write formulas as plain text.
- Do not use symbols like ∑ unless they are inside LaTeX.
- Do not include "A.", "B.", "C.", or "D." inside the choice text because the frontend will add the letters.
- Most questions should be exercise-based, not only theory-based.
- At least 16 out of 20 questions should require solving, calculating, applying a formula, reading a scenario, or using the material to find an answer.
- Do not create too many questions that only ask "What is the formula..." or "What is the definition..."
- If the material contains formulas, create questions where the student must plug in numbers and calculate the result.
- If the material is math, statistics, physics, chemistry, economics, or another calculation-based subject, at least 15 questions should be calculation exercises.
- For calculation exercises, give realistic numbers and four close answer choices.
- Keep only a few theory questions, about 3 to 5 questions maximum.

Uploaded material:
{uploaded_content}
"""
def shuffle_quiz_choices(quiz):
    shuffled_quiz = []

    for question in quiz:
        choices = question["choices"]
        correct_letter = question["correctAnswer"]
        correct_text = choices[correct_letter]

        choice_items = list(choices.items())
        random.shuffle(choice_items)

        new_letters = ["A", "B", "C", "D"]
        new_choices = {}
        new_correct_answer = ""

        for new_letter, old_item in zip(new_letters, choice_items):
            old_letter, choice_text = old_item
            new_choices[new_letter] = choice_text

            if choice_text == correct_text:
                new_correct_answer = new_letter

        question["choices"] = new_choices
        question["correctAnswer"] = new_correct_answer

        shuffled_quiz.append(question)

    return shuffled_quiz

def clean_json_text(text):
    text = text.strip()

    # Remove ```json and ``` if the AI accidentally adds them
    text = re.sub(r"^```json", "", text)
    text = re.sub(r"^```", "", text)
    text = re.sub(r"```$", "", text)

    text = text.strip()

    # If extra text appears before/after JSON, keep only the array part
    start = text.find("[")
    end = text.rfind("]")

    if start != -1 and end != -1:
        text = text[start:end + 1]

    return text


def generate_quiz(uploaded_content):
    prompt = create_quiz_prompt(uploaded_content)

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "You are Solomon, a helpful AI study assistant. Return only valid JSON. Escape LaTeX backslashes correctly."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2
    )

    quiz_text = response.choices[0].message.content
    quiz_text = clean_json_text(quiz_text)

    try:
        quiz = json.loads(quiz_text)
    except json.JSONDecodeError as error:
        print("JSON ERROR:", error)
        print("AI RESPONSE WAS:")
        print(quiz_text)
        raise ValueError(f"Quiz JSON was invalid: {error}")

    return shuffle_quiz_choices(quiz)