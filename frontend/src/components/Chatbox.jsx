import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import "./chatbox.css";

function ChatBox() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi, I am Solomon. How can I help you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    if (!question.trim()) return;

    const currentQuestion = question;

    const userMessage = {
      role: "user",
      text: currentQuestion,
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/ask",
        {
          question: currentQuestion,
        },
        {
          timeout: 120000,
        }
      );

      const botMessage = {
        role: "bot",
        text: response.data.error ? response.data.error : response.data.answer,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbox error:", error);

      const botMessage = {
        role: "bot",
        text: "Could not connect to the backend. Make sure FastAPI is running and you uploaded a file first.",
      };

      setMessages((prev) => [...prev, botMessage]);
    }

    setLoading(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleAsk();
    }
  }

  return (
    <section className="chat-page">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h1 className="text-4xl font-extrabold">
          Chatbox
        </h1>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.role === "user"
                ? "chat-message-row user-row"
                : "chat-message-row bot-row"
            }
          >
            <div
              className={
                message.role === "user"
                  ? "chat-bubble user-bubble"
                  : "chat-bubble bot-bubble"
              }
            >
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  p: ({ children }) => <p>{children}</p>,
                  ul: ({ children }) => <ul>{children}</ul>,
                  ol: ({ children }) => <ol>{children}</ol>,
                  li: ({ children }) => <li>{children}</li>,
                  code: ({ children }) => (
                    <span className="normal-code">{children}</span>
                  ),
                  pre: ({ children }) => (
                    <div className="normal-pre">{children}</div>
                  ),
                }}
              >
                {message.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="chat-message-row bot-row">
            <div className="chat-bubble bot-bubble">Solomon is thinking...</div>
          </div>
        )}
      </div>

      <div className="chat-input-area">
        <div className="chat-input-box">
          <textarea
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Solomon..."
            rows="1"
          />

          <button onClick={handleAsk}>Send</button>
        </div>
      </div>
    </section>
  );
}

export default ChatBox;