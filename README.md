# Quiz App

A simple and interactive Quiz App where users can take quizzes on various topics. The app fetches random quiz questions and allows users to answer them while keeping track of their scores.

## Features

- User can start a quiz on different topics
- The app fetches random questions from the Open Trivia Database API
- Multiple-choice answers for each question
- 15-second timer for each question
- Visual feedback for correct and incorrect answers
- Score tracking and final results display
- Option to play again after completing a quiz

## Tech Stack

- **HTML5**: For structuring the application
- **CSS3**: For styling the user interface
- **JavaScript**: For handling the application logic
- **Open Trivia Database API**: For fetching quiz questions

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/quiz-app.git
   cd quiz-app
   ```

2. Open the `index.html` file in your browser:
   - You can simply double-click the file
   - Or use a local development server

## Usage

1. **Select a Topic**: Choose from General Knowledge, Science & Nature, Sports, Geography, or History.
2. **Answer Questions**: Select an answer from the multiple-choice options within the 15-second time limit.
3. **View Results**: After completing 10 questions, view your final score.
4. **Play Again**: Click the "Play Again" button to return to the topic selection screen.

## Project Structure

```
quiz-app/
│
├── index.html     # The main HTML file
├── styles.css     # CSS styling
├── script.js      # JavaScript logic
└── README.md      # Project documentation
```

## How It Works

1. **API Integration**: The app connects to the Open Trivia Database API to fetch questions based on the selected category.
2. **Fallback Mechanism**: If the API fails, the app uses a predefined set of questions.
3. **Timer**: Each question has a 15-second countdown timer.
4. **Answer Validation**: The app validates user answers and provides immediate visual feedback.
5. **Score Tracking**: The app keeps track of correct answers and displays the final score.

## Customization

You can easily customize the app by:
- Adding more topics in the HTML and JavaScript files
- Changing the number of questions by modifying the API URL
- Adjusting the timer duration in the JavaScript file
- Modifying the styling in the CSS file

## Future Improvements

- Add difficulty levels
- Implement user authentication
- Create a leaderboard system
- Allow users to create custom quizzes
- Add sound effects and animations

## Credits

- [Open Trivia Database](https://opentdb.com/) for providing the quiz API
