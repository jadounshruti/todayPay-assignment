import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Quiz from "./components/Quiz";
import Results from "./components/Results";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200 
                    flex justify-center items-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8 
                      border border-transparent hover:border-indigo-400 
                      hover:shadow-[0_0_20px_rgba(99,102,241,0.7)] transition-all duration-300">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-indigo-700">
          🎯 React Quiz App
        </h1>
        <Routes>
          <Route path="/" element={<Navigate to="/quiz" />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
