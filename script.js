// DOM Elements
const homeScreen = document.getElementById('home-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const topicButtons = document.querySelectorAll('.topic-btn');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const questionNumber = document.getElementById('question-number');
const timeRemaining = document.getElementById('time-remaining');
const finalScore = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');

// Quiz State
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

// Event Listeners
topicButtons.forEach(button => {
    button.addEventListener('click', () => startQuiz(button.dataset.category));
});

restartBtn.addEventListener('click', () => {
    homeScreen.classList.remove('hide');
    resultsScreen.classList.add('hide');
    resetQuiz();
});

// Functions
function startQuiz(categoryId) {
    fetchQuestions(categoryId)
        .then(() => {
            homeScreen.classList.add('hide');
            quizScreen.classList.remove('hide');
            displayQuestion();
            startTimer();
        })
        .catch(error => {
            console.error('Error starting quiz:', error);
            alert('Failed to load questions. Please try again.');
        });
}

function fetchQuestions(categoryId) {
    const apiUrl = `https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`;
    
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.response_code === 0) {
                currentQuestions = data.results;
            } else {
                // Fallback to static questions if API fails
                useStaticQuestions();
            }
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
            useStaticQuestions();
        });
}

function useStaticQuestions() {
    // Fallback questions if the API fails
    currentQuestions = [
        {
            question: "What is the capital of France?",
            correct_answer: "Paris",
            incorrect_answers: ["London", "Berlin", "Madrid"]
        },
        {
            question: "Who wrote 'Romeo and Juliet'?",
            correct_answer: "William Shakespeare",
            incorrect_answers: ["Charles Dickens", "Jane Austen", "Mark Twain"]
        },
        {
            question: "What is the chemical symbol for gold?",
            correct_answer: "Au",
            incorrect_answers: ["Ag", "Fe", "Gd"]
        },
        {
            question: "Which planet is closest to the Sun?",
            correct_answer: "Mercury",
            incorrect_answers: ["Venus", "Earth", "Mars"]
        },
        {
            question: "What year did World War II end?",
            correct_answer: "1945",
            incorrect_answers: ["1939", "1941", "1950"]
        },
        {
            question: "Which of these is not a programming language?",
            correct_answer: "Photoshop",
            incorrect_answers: ["Python", "Java", "Ruby"]
        },
        {
            question: "What is the largest mammal?",
            correct_answer: "Blue Whale",
            incorrect_answers: ["Elephant", "Giraffe", "Hippopotamus"]
        },
        {
            question: "What is the hardest natural substance on Earth?",
            correct_answer: "Diamond",
            incorrect_answers: ["Platinum", "Iron", "Quartz"]
        },
        {
            question: "Who painted the Mona Lisa?",
            correct_answer: "Leonardo da Vinci",
            incorrect_answers: ["Pablo Picasso", "Vincent Van Gogh", "Michelangelo"]
        },
        {
            question: "Which country has the largest population?",
            correct_answer: "China",
            incorrect_answers: ["India", "United States", "Russia"]
        }
    ];
}

function displayQuestion() {
    const currentQuestion = currentQuestions[currentQuestionIndex];
    
    // Update question text
    questionText.innerHTML = decodeHTML(currentQuestion.question);
    
    // Update question counter
    questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;
    
    // Clear previous answers
    answersContainer.innerHTML = '';
    
    // Create all answers array (correct + incorrect)
    const answers = [
        ...currentQuestion.incorrect_answers.map(answer => decodeHTML(answer)),
        decodeHTML(currentQuestion.correct_answer)
    ];
    
    // Shuffle answers
    shuffleArray(answers);
    
    // Create answer buttons
    answers.forEach(answer => {
        const button = document.createElement('button');
        button.classList.add('answer-btn');
        button.innerHTML = answer;
        button.addEventListener('click', () => checkAnswer(answer, currentQuestion.correct_answer));
        answersContainer.appendChild(button);
    });
    
    // Reset timer
    timeLeft = 15;
    timeRemaining.textContent = timeLeft;
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timeRemaining.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeout();
        }
    }, 1000);
}

function handleTimeout() {
    // Show correct answer
    const buttons = answersContainer.querySelectorAll('.answer-btn');
    buttons.forEach(button => {
        if (button.innerHTML === decodeHTML(currentQuestions[currentQuestionIndex].correct_answer)) {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    
    // Move to next question after a delay
    setTimeout(() => {
        nextQuestion();
    }, 2000);
}

function checkAnswer(selectedAnswer, correctAnswer) {
    clearInterval(timer);
    
    const buttons = answersContainer.querySelectorAll('.answer-btn');
    buttons.forEach(button => {
        button.disabled = true;
        
        if (button.innerHTML === decodeHTML(correctAnswer)) {
            button.classList.add('correct');
        } else if (button.innerHTML === selectedAnswer) {
            button.classList.add('incorrect');
        }
    });
    
    if (selectedAnswer === decodeHTML(correctAnswer)) {
        score++;
    }
    
    setTimeout(() => {
        nextQuestion();
    }, 1500);
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < currentQuestions.length) {
        displayQuestion();
        startTimer();
    } else {
        showResults();
    }
}

function showResults() {
    quizScreen.classList.add('hide');
    resultsScreen.classList.remove('hide');
    finalScore.textContent = score;
}

function resetQuiz() {
    currentQuestions = [];
    currentQuestionIndex = 0;
    score = 0;
    clearInterval(timer);
}

// Utility Functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function decodeHTML(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}