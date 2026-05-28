import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import "./quiz.css";

function Quiz() {
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [grade, setGrade] = useState(null);
  const [practiceTopics, setPracticeTopics] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleGenerateQuiz() {
    try {
      setLoading(true);
      setQuiz([]);
      setAnswers({});
      setSubmitted(false);
      setGrade(null);
      setPracticeTopics([]);

      const response = await axios.post(
        "http://127.0.0.1:8000/quiz",
        {},
        { timeout: 120000 }
      );

      if (response.data.error) {
        alert(response.data.error);
      } else {
        setQuiz(response.data.quiz);
      }
    } catch (error) {
      console.error("Quiz error:", error);
      alert(
        "Could not generate quiz. Make sure FastAPI is running and you uploaded a file first."
      );
    }

    setLoading(false);
  }

  function handleAnswerChange(questionId, choice) {
    setAnswers({
      ...answers,
      [questionId]: choice,
    });
  }

  function handleSubmitQuiz() {
    let correctCount = 0;
    const missedTopics = [];

    quiz.forEach((question) => {
      const userAnswer = answers[question.id];

      if (userAnswer === question.correctAnswer) {
        correctCount++;
      } else {
        missedTopics.push(question.topic);
      }
    });

    setGrade({
      correct: correctCount,
      total: quiz.length,
      percent: Math.round((correctCount / quiz.length) * 100),
    });

    setPracticeTopics([...new Set(missedTopics)]);
    setSubmitted(true);
  }

  return (
    <section className="quiz-page">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h1 className="text-4xl font-extrabold">
          Practice Quiz
        </h1>
      </div>

      <div className="quiz-button-row">
        <button
          onClick={handleGenerateQuiz}
          className="rounded-3xl bg-blue-600 px-16 py-5 text-2xl font-extrabold text-white shadow-md transition hover:bg-blue-700"
        >
          Generate Quiz
        </button>
      </div>

      {loading && (
        <p className="text-center text-lg font-medium text-slate-600">
          Solomon is creating your quiz...
        </p>
      )}

      {quiz.length > 0 && (
        <div className="quiz-card-list">
          {quiz.map((question, index) => (
            <div key={question.id} className="quiz-card">
              <h2 className="quiz-question-title">
                Question {index + 1}:
              </h2>

              <div className="quiz-question-text">
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    p: ({ children }) => <p>{children}</p>,
                  }}
                >
                  {question.question}
                </ReactMarkdown>
              </div>

              <div className="quiz-choice-list">
                {Object.entries(question.choices).map(([letter, choice]) => {
                  const isSelected = answers[question.id] === letter;
                  const isCorrect = question.correctAnswer === letter;
                  const isWrong = submitted && isSelected && !isCorrect;

                  let choiceClass = "quiz-choice";

                  if (submitted && isCorrect) {
                    choiceClass += " quiz-choice-correct";
                  } else if (isWrong) {
                    choiceClass += " quiz-choice-wrong";
                  } else if (isSelected) {
                    choiceClass += " quiz-choice-selected";
                  }

                  return (
                    <label key={letter} className={choiceClass}>
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={letter}
                        disabled={submitted}
                        checked={isSelected}
                        onChange={() =>
                          handleAnswerChange(question.id, letter)
                        }
                      />

                      <span className="quiz-choice-letter">{letter}.</span>

                      <span className="quiz-choice-answer">
                        <ReactMarkdown
                          remarkPlugins={[remarkMath]}
                          rehypePlugins={[rehypeKatex]}
                          components={{
                            p: ({ children }) => <span>{children}</span>,
                          }}
                        >
                          {choice}
                        </ReactMarkdown>
                      </span>
                    </label>
                  );
                })}
              </div>

              {submitted && (
                <p className="mt-5 text-lg font-semibold text-slate-700">
                  Correct Answer: {question.correctAnswer}
                </p>
              )}
            </div>
          ))}

          {!submitted && (
            <div className="flex justify-center">
              <button
                onClick={handleSubmitQuiz}
                className="rounded-3xl bg-green-600 px-16 py-5 text-2xl font-extrabold text-white shadow-md transition hover:bg-green-700"
              >
                Submit Quiz
              </button>
            </div>
          )}

          {submitted && grade && (
            <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
              <h2 className="text-4xl font-extrabold text-slate-900">
                Your Grade: {grade.correct}/{grade.total} = {grade.percent}%
              </h2>

              <div className="mt-8 text-left">
                <h3 className="mb-4 text-2xl font-bold text-slate-900">
                  You need to practice more:
                </h3>

                {practiceTopics.length > 0 ? (
                  <ul className="list-inside list-disc space-y-2 text-lg text-slate-700">
                    {practiceTopics.map((topic, index) => (
                      <li key={index}>{topic}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-lg text-green-700">
                    Great job! You answered everything correctly.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default Quiz;