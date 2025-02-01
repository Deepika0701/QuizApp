import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchQuizData } from "./api.js";
import "../styles/QuizIntro.css";

const QuizIntro = ({ setQuizStarted, setQuizDuration }) => {
  const [quizDetails, setQuizDetails] = useState(null);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const getQuizData = async () => {
      const data = await fetchQuizData();
      if (data) {
        setQuizDetails(data);
        // setQuizDuration(data.duration || 0); // Store quiz duration
        setQuizDuration(1 || 0); // Store quiz duration
      }
    };
    getQuizData();
  }, []);

  if (!quizDetails) return <p className="loading">Loading...</p>;

  const startTest = () => {
    setQuizStarted(true);
    navigate("/quiz"); // Redirect to the quiz page
  };

  return (
    <div className="quiz-intro">
      <h2>{quizDetails.title}</h2>

      <p>
        Welcome to the <strong>{quizDetails.title}</strong> quiz on <strong>{quizDetails.topic}</strong>.
        This quiz consists of <strong>{quizDetails.questions_count}</strong> questions, and you will have
        <strong> {quizDetails.duration} minutes</strong> to complete it.
      </p>
      <p>
        For each correct answer, you will earn <strong>{quizDetails.correct_answer_marks}</strong> marks, 
        while each incorrect answer will result in a deduction of <strong>{quizDetails.negative_marks}</strong> marks.
      </p>
      <p>
        The quiz will start at <strong>{new Date(quizDetails.time).toLocaleString()}</strong>  
        and end at <strong>{new Date(quizDetails.end_time).toLocaleString()}</strong>. 
      </p>

      <button onClick={startTest}>Start Test</button>
    </div>
  );
};

export default QuizIntro;
