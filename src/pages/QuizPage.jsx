import React, { useState, useEffect } from "react";
import { fetchQuizData } from "../api/quizApi";
import QuizInfo from "../components/QuizInfo";
import QuestionCard from "../components/QuestionCard";


const QuizPage = () => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const loadQuiz = async () => {
      const data = await fetchQuizData();
      setQuiz(data);
    };
    loadQuiz();
  }, []);

  if (!quiz) return <div className="loading">Loading...</div>;

  return (
    <main className="quiz-container">
      <QuizInfo title={quiz.title} description={quiz.description} duration={quiz.duration} />
      <QuestionCard
        question={quiz.questions[currentQuestionIndex]}
        onNext={() => setCurrentQuestionIndex(prev => prev + 1)}
        isLast={currentQuestionIndex === quiz.questions.length - 1}
      />
    </main>
  );
};

export default QuizPage;
