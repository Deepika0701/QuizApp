
```markdown
# Quiz App

A simple interactive quiz application built using React. The app allows users to start a quiz, answer questions, and view a summary with detailed solutions. It handles quiz state management, timer, and displays feedback for correct and incorrect answers.

## Features

- **Quiz Intro Page**: Displays quiz details including the number of questions, topic, quiz duration, and scoring system.
- **Timer**: Countdown timer for quiz duration.
- **Multiple Choice Questions**: Answer questions with multiple choices and view whether the selected answer is correct or wrong.
- **Quiz Summary Page**: View a summary of all answered and unanswered questions with correct answers and detailed solutions.
- **Confirmation Modal**: Option to confirm before ending the quiz if it's already in progress.

## Project Structure

- `src/components/`
  - `Header.js`: The header with the app title and modal to confirm quiz termination.
  - `QuizComponent.js`: Handles quiz logic, navigation between questions, and display of options.
  - `QuizIntro.js`: Displays introductory details of the quiz and starts the quiz.
  - `QuizSummary.js`: Displays a summary of the quiz with answers, correct answers, and detailed solutions.
  - `Timer.js`: A countdown timer for the quiz duration.
- `src/styles/`
  - `Header.css`: Styles for the header.
  - `QuizComponent.css`: Styles for the quiz page.
  - `QuizIntro.css`: Styles for the intro page.
  - `QuizSummary.css`: Styles for the summary page.

## Technologies Used

- **React.js**: For building the user interface.
- **React Router**: For navigating between different components/pages.
- **useState, useEffect**: For managing state and lifecycle methods in React.
- **CSS**: For styling the application.

## Setup Instructions

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/quiz-app.git
   cd quiz-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open your browser and go to `http://localhost:3000` to start using the quiz app.

## How It Works

1. **Quiz Intro**: The user is presented with the quiz details, including title, topic, number of questions, and the quiz duration. They can then click to start the quiz.
2. **Quiz Component**: Users can answer the questions. Once a question is answered, they can navigate to the next one or submit the quiz. The timer runs during the quiz.
3. **Quiz Summary**: After submitting the quiz, a summary is shown with the results (correct and wrong answers). Users can also toggle detailed solutions for each question.
```

