import React, { useEffect, useState } from "react";
import Question from "./Question";
import { useNavigate } from "react-router-dom";
import questionsData from "../questions.json";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(
          "https://opentdb.com/api.php?amount=5&type=multiple"
        );
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          const formatted = data.results.map((q) => ({
            question: q.question,
            options: shuffle([...q.incorrect_answers, q.correct_answer]),
            correct: q.correct_answer,
          }));
          setQuestions(formatted);
        } else {
          setQuestions(questionsData);
        }
      } catch (err) {
        console.error(err);
        setQuestions(questionsData);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const handleAnswer = (answer) => {
    const updated = [...answers];
    updated[current] = answer;
    setAnswers(updated);
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      navigate("/results", { state: { questions, answers } });
    }
  };

  if (loading) return <p className="text-center">Loading questions...</p>;
  if (questions.length === 0) return <p>No questions available.</p>;

  return (
    <div>
      <p className="text-gray-600 mb-4">
        Question {current + 1} of {questions.length}
      </p>
      <Question
        question={questions[current]}
        selected={answers[current]}
        onAnswer={handleAnswer}
      />
      <div className="flex justify-between mt-6">
        <button
          disabled={current === 0}
          onClick={() => setCurrent(current - 1)}
          className="px-5 py-2 rounded-lg bg-gray-300 text-gray-800 font-medium 
                     disabled:opacity-50 hover:bg-gray-400 transition-all"
        >
          Previous
        </button>
        <button
          onClick={nextQuestion}
          disabled={!answers[current]}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 
                     text-white font-semibold shadow-md disabled:opacity-40 
                     hover:scale-105 transition-transform"
        >
          {current === questions.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default Quiz;
