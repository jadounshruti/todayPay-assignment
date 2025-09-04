import React from "react";

function Question({ question, selected, onAnswer }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 transition-all">
      <h2
        className="font-bold text-xl mb-4 text-gray-800"
        dangerouslySetInnerHTML={{ __html: question.question }}
      />
      <div className="space-y-3">
        {question.options.map((opt, idx) => (
          <label
            key={idx}
            className={`block p-3 rounded-lg cursor-pointer transition-all duration-300 
              ${
                selected === opt
                  ? "border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] scale-105"
                  : "border border-gray-300 hover:border-purple-400 hover:shadow-[0_0_12px_rgba(147,51,234,0.6)]"
              }`}
          >
            <input
              type="radio"
              name="option"
              value={opt}
              checked={selected === opt}
              onChange={() => onAnswer(opt)}
              className="hidden"
            />
            <span
              className="text-gray-700 font-medium"
              dangerouslySetInnerHTML={{ __html: opt }}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

export default Question;
