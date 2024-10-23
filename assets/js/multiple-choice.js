const questions = [
    { 
        question: "What is the capital of France?", 
        answers: ["Paris", "London", "Berlin", "Rome"], 
        correct: 0 
    },
    { 
        question: "Which planet is known as the Red Planet?", 
        answers: ["Venus", "Mars", "Jupiter", "Saturn"], 
        correct: 1 
    },
    { 
        question: "Who wrote 'To Kill a Mockingbird'?", 
        answers: ["Harper Lee", "George Orwell", "Mark Twain", "J.K. Rowling"], 
        correct: 0 
    },
    { 
        question: "What is the boiling point of water?", 
        answers: ["90°C", "100°C", "110°C", "80°C"], 
        correct: 1 
    },
    { 
        question: "Who painted the Mona Lisa?", 
        answers: ["Vincent Van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"], 
        correct: 2 
    },
    { 
        question: "What is the smallest prime number?", 
        answers: ["1", "2", "3", "5"], 
        correct: 1 
    },
    { 
        question: "Which is the largest ocean?", 
        answers: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"], 
        correct: 2 
    },
    { 
        question: "How many continents are there?", 
        answers: ["5", "6", "7", "8"], 
        correct: 2 
    },
    { 
        question: "What is the largest desert in the world?", 
        answers: ["Gobi", "Sahara", "Arctic", "Antarctic"], 
        correct: 3 
    },
    { 
        question: "What is the longest river in the world?", 
        answers: ["Amazon", "Nile", "Yangtze", "Mississippi"], 
        correct: 1 
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
    for (let i = 0; i < questions.length; i++) {
        const questionLi = document.getElementById(`question-${i}`);
        if (userAnswers[i] === questions[i].correct) {
            questionLi.classList.add('correct');
            score += 10;
        } else {
            questionLi.classList.add('incorrect');
        }
    }
    document.querySelector(".quiz-container").style.display = "none";
    document.querySelector(".score-section").style.display = "block";
    document.getElementById("score").textContent = score;
}