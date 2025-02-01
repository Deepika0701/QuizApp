import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchQuizData } from "./api.js";
import Timer from "./Timer";  
import "../styles/QuizComponent.css";

const QuizComponent = ({ quizStarted, quizDuration }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [answers, setAnswers] = useState([]); 
  const [startTime, setStartTime] = useState(null); 

  const navigate = useNavigate(); 

  useEffect(() => {
    const getQuizData = async () => {
      const data = await fetchQuizData();
      if (data && data.questions) {
        setQuestions(data.questions);
      }
    };
    getQuizData();

    if (quizStarted) {
      setStartTime(Date.now()); 
    }
  }, [quizStarted]);

  const handleAnswerSelection = (option) => {
    setSelectedOption(option);
    setAnswered(true);

    const isCorrect = option.is_correct;
    setAnswers(prev => [
      ...prev,
      {
        question: questions[currentIndex].description,
        selectedAnswer: option.description,
        correctAnswer: questions[currentIndex].options.find(opt => opt.is_correct)?.description || "N/A",
        detailed_solution: questions[currentIndex].detailed_solution || "No solution available",
        isCorrect
      }
    ]);
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setAnswered(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSubmit = () => {
    const updatedAnswers = questions.map((question, index) => {
      const existingAnswer = answers.find((ans) => ans.question === question.description);
      return existingAnswer || {
        question: question.description,
        selectedAnswer: "Unanswered",
        correctAnswer: question.options.find(opt => opt.is_correct)?.description || "N/A",
        detailed_solution: question.detailed_solution || "No solution available",
        isCorrect: false, 
      };
    });
  
    navigate("/quiz-summary", { state: { answers: updatedAnswers, totalQuestions: questions.length } });
  };

  if (questions.length === 0) return <p className="loading">Loading questions...</p>;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="quiz-container">
      {quizStarted && startTime && <Timer startTime={startTime} duration={quizDuration} />}

      <h2>Question {currentIndex + 1}</h2>
      <p className="question-description">{currentQuestion.description}</p>

      <div className="options-container">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedOption && selectedOption.id === option.id;
          const isCorrect = option.is_correct;

          return (
            <button
              key={index}
              className={`option-button 
                ${isSelected ? (isCorrect ? "correct" : "wrong") : ""} 
                ${answered && isCorrect ? "highlight-correct" : ""}`}
              onClick={() => handleAnswerSelection(option)}
              disabled={answered}
            >
              {option.description}
              {isSelected && (
                <span className={`answer-icon ${isCorrect ? "tick" : "cross"}`} />
              )}
            </button>
          );
        })}
      </div>

      {currentIndex < questions.length - 1 && (
        <button onClick={nextQuestion}>Next Question</button>
      )}

      {currentIndex === questions.length - 1 && (
        <button onClick={handleSubmit} className="submit-button">
          Submit Quiz
        </button>
      )}
    </div>
  );
};

export default QuizComponent;
