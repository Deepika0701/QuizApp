import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import Header from "./components/Header";
import QuizIntro from "./components/QuizIntro";
import QuizComponent from "./components/QuizComponent";
import QuizSummary from "./components/QuizSummary"; 
import "./styles/header.css"; 

const App = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizDuration, setQuizDuration] = useState(0); // Store duration from API

  return (
    <Router>
      <div
        style={{
          background: "linear-gradient(135deg, #000000, #1a1a1a)", 
          fontFamily: "'Titillium Web', sans-serif",
          color: "#00aaff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Header quizStarted={quizStarted} setQuizStarted={setQuizStarted}/>
        <Routes>
          {/* Pass down quizStarted and quizDuration */}
          <Route path="/" element={<QuizIntro setQuizStarted={setQuizStarted} setQuizDuration={setQuizDuration} />} />
          <Route path="/quiz" element={<QuizComponent quizStarted={quizStarted} quizDuration={quizDuration} />} />
          <Route path="/quiz-summary" element={<QuizSummary setQuizStarted={setQuizStarted} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
