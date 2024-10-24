const questions = [
    { 
        question: "What is the correct form of the verb in this sentence: 'By the time I arrived, they ____ dinner.'", 
        answers: ["A) ate", "B) were eating", "C) had eaten", "D) have eaten"], 
        correct: 2  // C) had eaten
    },
    { 
        question: "Which of these is NOT a coordinating conjunction?", 
        answers: ["A) But", "B) And", "C) Or", "D) Although"], 
        correct: 3  // D) Although
    },
    { 
        question: "Choose the correct sentence.", 
        answers: ["A) He are my brother.", "B) She am a doctor.", "C) We is going to the park.", "D) They are playing football."], 
        correct: 3  // D) They are playing football
    },
    { 
        question: "Which of these is a synonym for 'perceive'?", 
        answers: ["A) Ignore", "B) Understand", "C) Disagree", "D) Control"], 
        correct: 1  // B) Understand
    },
    { 
        question: "What is the passive form of this sentence: 'The chef cooks the meal.'", 
        answers: ["A) The meal cooked by the chef.", "B) The meal was cooked by the chef.", "C) The meal is cooked by the chef.", "D) The chef is cooking the meal."], 
        correct: 2  // C) The meal is cooked by the chef
    },
    { 
        question: "Which of the following sentences is grammatically correct?", 
        answers: ["A) I don’t can swim.", "B) She can’t sings.", "C) We can't go.", "D) He doesn't has a car."], 
        correct: 2  // C) We can't go
    },
    { 
        question: "Which sentence is in the future perfect tense?", 
        answers: ["A) I will be running tomorrow.", "B) I had finished my homework.", "C) I will have completed the project by tomorrow.", "D) I am completing my task."], 
        correct: 2  // C) I will have completed the project by tomorrow
    },
    { 
        question: "What is the correct word to complete this sentence: 'She was ____ tired to continue.'", 
        answers: ["A) so", "B) too", "C) very", "D) such"], 
        correct: 1  // B) too
    },
    { 
        question: "Which sentence uses the subjunctive mood?", 
        answers: ["A) If I were you, I would study more.", "B) I was happy yesterday.", "C) She will attend the meeting.", "D) They were playing soccer."], 
        correct: 0  // A) If I were you, I would study more
    },
    { 
        question: "Which of the following sentences contains a gerund?", 
        answers: ["A) Running is my favorite activity.", "B) She runs fast.", "C) They ran to the store.", "D) He is run."], 
        correct: 0  // A) Running is my favorite activity
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answeredQuestions = Array(questions.length).fill(false);
let userAnswers = Array(questions.length).fill(null);

document.addEventListener("DOMContentLoaded", () => {
    loadQuestionNumbers();
    loadQuestion(currentQuestionIndex);

    document.getElementById("next-question").addEventListener("click", () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion(currentQuestionIndex);
            updateButtons();
        }
    });

    document.getElementById("prev-question").addEventListener("click", () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion(currentQuestionIndex);
            updateButtons();
        }
    });

    document.getElementById("submit-quiz").addEventListener("click", showScore);
});

function loadQuestionNumbers() {
    const questionList = document.getElementById("question-list");
    questions.forEach((q, index) => {
        const li = document.createElement("li");
        li.textContent = index + 1;
        li.classList.add('unanswered');
        li.id = `question-${index}`;
        questionList.appendChild(li);
    });
}

function loadQuestion(index) {
    const questionContainer = document.getElementById("question-container");
    const question = questions[index];
    const answersHtml = question.answers.map((answer, i) => `
        <li>
            <label>
                <input type="radio" name="answer" value="${i}">
                ${answer}
            </label>
        </li>
    `).join('');
    
    questionContainer.innerHTML = `
        <h2>${question.question}</h2>
        <ul class="answers">
            ${answersHtml}
        </ul>
    `;
    
    document.querySelectorAll("input[name='answer']").forEach(input => {
        input.addEventListener("change", () => {
            const selectedAnswer = parseInt(document.querySelector("input[name='answer']:checked").value);
            userAnswers[index] = selectedAnswer;
            markAnswered(index);
        });
    });
}

function markAnswered(index) {
    const questionLi = document.getElementById(`question-${index}`);
    questionLi.classList.remove('unanswered');
    questionLi.classList.add('answered');
    answeredQuestions[index] = true;
    updateButtons();
}

function updateButtons() {
    document.getElementById("prev-question").disabled = currentQuestionIndex === 0;
    document.getElementById("next-question").disabled = currentQuestionIndex === questions.length - 1 || !answeredQuestions[currentQuestionIndex];
    if (currentQuestionIndex === questions.length - 1) {
        document.getElementById("submit-quiz").style.display = 'inline-block';
    } else {
        document.getElementById("submit-quiz").style.display = 'none';
    }
}

function showScore() {
    score = 0;  // Reset score before calculation

    for (let i = 0; i < questions.length; i++) {
        const questionLi = document.getElementById(`question-${i}`);
        if (userAnswers[i] === questions[i].correct) {
            questionLi.classList.add('correct');
            score += 10;  // Add points for each correct answer
        } else {
            questionLi.classList.add('incorrect');
        }
    }

    // Hide the quiz container and show the score
    document.querySelector(".quiz-container").style.display = "none";
    document.querySelector(".score-section").style.display = "block";

    // Correctly display the score
    document.getElementById("score").textContent = `${score}`;

    // Ensure "Kembali ke Homepage" is visible after completing the quiz
    document.querySelector(".homepage-button").style.display = 'inline-block';
}

// Disable the question navigation buttons after finishing the quiz
function disableQuestionNavigation() {
    const gridButtons = document.querySelectorAll('.grid-btn');
    gridButtons.forEach(button => {
        button.classList.add('disabled');  // Disable interaction
    });
}

const sideToolbar = document.getElementById('sideToolbar');
const navLogo = document.getElementById('nav-logo');

// Add click event to "BERBAHASA" to toggle the sidebar
navLogo.addEventListener('click', function() {
  if (sideToolbar.style.width === "250px") {
    sideToolbar.style.width = "0";  // Close sidebar
  } else {
    sideToolbar.style.width = "250px";  // Open sidebar
  }
});
