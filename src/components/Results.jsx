import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>No results available.</p>;

  const { questions, answers } = state;
  const score = questions.reduce(
    (acc, q, i) => (answers[i] === q.correct ? acc + 1 : acc),
    0
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-4">
        You scored {score}/{questions.length}
      </h2>

      <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
        <div
          className="bg-green-500 h-4 rounded-full"
          style={{ width: `${(score / questions.length) * 100}%` }}
        ></div>
      </div>

      <ul className="space-y-4">
        {questions.map((q, i) => (
          <li
            key={i}
            className={`p-4 rounded-lg shadow-md transition-all ${
              answers[i] === q.correct
                ? "bg-green-50 border-l-4 border-green-500"
                : "bg-red-50 border-l-4 border-red-500"
            }`}
          >
            <p
              className="font-semibold"
              dangerouslySetInnerHTML={{ __html: q.question }}
            />
            <p className="mt-2">
              Your answer:{" "}
              <span
                className={`${
                  answers[i] === q.correct ? "text-green-600" : "text-red-600"
                } font-medium`}
                dangerouslySetInnerHTML={{ __html: answers[i] || "No answer" }}
              />
            </p>
            {answers[i] !== q.correct && (
              <p className="mt-1">
                Correct:{" "}
                <span
                  className="text-green-700 font-semibold"
                  dangerouslySetInnerHTML={{ __html: q.correct }}
                />
              </p>
            )}
          </li>
        ))}
      </ul>

      <button
        onClick={() => navigate("/quiz")}
        className="mt-6 px-6 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 
                   text-white font-semibold shadow-md hover:scale-105 transition-transform"
      >
        Restart Quiz
      </button>
    </div>
  );
}

export default Results;
