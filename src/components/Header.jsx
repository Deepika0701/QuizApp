import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Header.css";

const Header = ({ quizStarted, setQuizStarted }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  // Reset quizStarted when navigating to QuizSummary or QuizIntro
  useEffect(() => {
    if (location.pathname === "/quiz-summary" || location.pathname === "/") {
      setQuizStarted(false);
    }
  }, [location.pathname, setQuizStarted]);

  const handleHeaderClick = () => {
    if (quizStarted) {
      setShowModal(true); // Show confirmation popup if quiz is running
    } else {
      navigate("/"); // Directly go to QuizIntro if quiz is not started
    }
  };

  const handleEndQuiz = () => {
    setQuizStarted(false); // Reset quiz state
    navigate("/"); // Redirect to QuizIntro
    setShowModal(false); // Close the popup
  };

  return (
    <>
      <header className="header" onClick={handleHeaderClick}>
        <h1>Quiz App</h1>
      </header>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>End Test</h2>
            <p>Are you sure you want to end the test?</p>
            <div className="modal-buttons">
              <button className="yes-button" onClick={handleEndQuiz}>Yes</button>
              <button className="no-button" onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
