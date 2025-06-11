import { useState } from "react";
import "./css/test.css";
import { Options } from "./Options";   // your sidebar



// ⚡️  Dummy data (replace with API data or props)
const QUESTIONS = [
  {
    id: 1,
    text: "Which language runs in a web browser?",
    options: ["C", "Java", "JavaScript"],
  },
  {
    id: 2,
    text: "What does CSS stand for?",
    options: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets"],
  },
  {
    id: 3,
    text: "What year was React first released?",
    options: ["2011", "2013", "2015"],
  },
];

function Test() {
  
  // { [questionId]: selectedOptionIndex }
  const [answers, setAnswers] = useState({});

  const handleSelect = (qid, idx) => {
    setAnswers((prev) => ({ ...prev, [qid]: idx }));
  };

  const handleSubmit = () => {
    // TODO: send `answers` to backend
    navigate();
    console.log("User answers:", answers);
    alert("Answers submitted! Check the console 😊");
  };

  return (
    <div className="attendTest">
      <Options />
      <div className="main">
        <h1 className="pageHeading">Attend Test</h1>

        {QUESTIONS.map((q, qi) => (
          <div key={q.id} className="questionCard">
            <div className="questionHeader">
              <span className="qIndex">Question {qi + 1}</span>
              <span className="progress">{qi + 1} / {QUESTIONS.length}</span>
            </div>

            <p className="questionText">{q.text}</p>

            <div className="optionsGroup">
              {q.options.map((opt, oi) => {
                const inputId = `q${q.id}_opt${oi}`;
                return (
                  <div className="optionWrapper" key={inputId}>
                    <input
                      type="radio"
                      name={`question_${q.id}`}
                      id={inputId}
                      checked={answers[q.id] === oi}
                      onChange={() => handleSelect(q.id, oi)}
                    />
                    <label htmlFor={inputId} className="optionLabel">
                      {opt}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <button
          className="submitBtn"
          disabled={Object.keys(answers).length !== QUESTIONS.length}
          onClick={handleSubmit}
        >
          Submit Test
        </button>
      </div>
    </div>
  );
}

export { Test };
