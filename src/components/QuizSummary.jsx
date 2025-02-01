import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/QuizSummary.css";

const QuizSummary = ({ setQuizStarted }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers || [];
  const totalQuestions = location.state?.totalQuestions || 0;

  // Separate answered and unanswered questions
  const answeredQuestions = answers.filter(ans => ans.selectedAnswer !== "Unanswered");
  const unansweredQuestions = answers.filter(ans => ans.selectedAnswer === "Unanswered");

  // Count correct and wrong answers only from answered questions
  const correctAnswers = answeredQuestions.filter(ans => ans.isCorrect).length;
  const wrongAnswers = answeredQuestions.length - correctAnswers;

  // Calculate total points (ignoring unanswered questions)
  const totalPoints = correctAnswers * 4 - wrongAnswers * 1; // 4 points per correct, -1 for wrong

  // State to manage the toggle of detailed solutions
  const [expandedSolutions, setExpandedSolutions] = useState({});

  // Handle detailed solution toggle
  const handleSolutionToggle = (index) => {
    setExpandedSolutions(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="quiz-summary-container">
      <h1>Summary</h1>

      <p>Total Questions: {totalQuestions}</p>
      <p>Attempted Questions: {answeredQuestions.length}</p>
      <p>Unanswered Questions: {unansweredQuestions.length}</p>
      <p className="correct">Correct Answers: <span className="correct">{correctAnswers}</span></p>
      <p className="wrong">Wrong Answers: <span className="wrong">{wrongAnswers}</span></p>
      <div className="total-points-container">
  <p className="total-points-text">Total Points &nbsp; {totalPoints}</p>
</div>


      <div className="summary-details">
        {answers.map((ans, index) => (
          <div key={index} className={`summary-item ${ans.selectedAnswer === "Unanswered" ? "unanswered-box" : ans.isCorrect ? "correct-box" : "wrong-box"}`}>
            <p><strong>Q{index + 1}:</strong> {ans.question}</p>
            <p><strong>Your Answer:</strong> {ans.selectedAnswer}</p>
            <p><strong>Correct Answer:</strong> {ans.correctAnswer}</p>
            
            {/* Show question status */}
            {ans.selectedAnswer === "Unanswered" ? (
              <p className="unanswered-text">You didn't answer this question.</p>
            ) : (
              <p className={`result-text ${ans.isCorrect ? "correct" : "wrong"}`}>
                {ans.isCorrect ? "Correct" : "Wrong"}
              </p>
            )}

            {/* Detailed solution toggle */}
            <button className="detailed-solution-button" onClick={() => handleSolutionToggle(index)}>
              {expandedSolutions[index] ? "Hide Solution" : "Show Detailed Solution"}
            </button>

            {/* Show detailed solution */}
            {expandedSolutions[index] && (
              <div className="detailed-solution">
                <p><strong>Detailed Solution:</strong></p>
                <p>{ans.detailed_solution || "No detailed solution available."}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="retry-button" onClick={() => {
  setQuizStarted(false); // Reset quiz state
  navigate("/"); // Redirect to home (QuizIntro)
}}>
  Retry Quiz
</button>

   
    </div>
  );
};

export default QuizSummary;
