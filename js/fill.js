document.addEventListener("DOMContentLoaded", function () {
    const correctAnswers = {
        1: "sitasi",
        2: "pendahuluan",
        3: "objektif",
        4: "apa",
        5: "lampiran"
    };

    let currentQuestion = 1;
    let score = 0;
    const totalQuestions = 5;

    const submitButton = document.getElementById('submit');
    const nextButton = document.getElementById('next');
    const tryAgainButton = document.getElementById('try-again');
    const feedback = document.getElementById('feedback');
    const scoreDisplay = document.getElementById('score');
    const gridButtons = document.querySelectorAll('.grid-btn');

    // Enable Submit button when input field is typed in
    document.querySelectorAll('input[type="text"]').forEach(input => {
        input.addEventListener('input', () => {
            submitButton.disabled = false;
        });
    });

    // Function to check answers
    function checkAnswers() {
        let userAnswer = document.getElementById(`answer-${currentQuestion}`).value.trim().toLowerCase();
        let correctAnswer = correctAnswers[currentQuestion];

        if (userAnswer === correctAnswer) {
            feedback.textContent = `Correct! The answer for question ${currentQuestion} is "${correctAnswer}".`;
            score += 20;
            submitButton.disabled = true;
            tryAgainButton.style.display = 'none';
            nextButton.style.display = 'inline-block'; // Show next button after correct answer
            document.querySelector(`.grid-btn[data-question="${currentQuestion}"]`).classList.add('correct');
            document.querySelector(`.grid-btn[data-question="${currentQuestion}"]`).classList.remove('wrong');
        } else {
            feedback.textContent = `Wrong! Try again for question ${currentQuestion}.`;
            tryAgainButton.style.display = 'inline-block';
            submitButton.disabled = true;
            document.querySelector(`.grid-btn[data-question="${currentQuestion}"]`).classList.add('wrong');
        }
    }

    // Event listener for submit button
    submitButton.addEventListener('click', checkAnswers);

    // Event listener for try again button
    tryAgainButton.addEventListener('click', () => {
        feedback.textContent = '';
        tryAgainButton.style.display = 'none';
        submitButton.disabled = false;
    });

    // Move to the next question when clicking Next or Finish
    nextButton.addEventListener('click', () => {
        document.getElementById(`question-${currentQuestion}`).classList.remove('active');
        currentQuestion++;
        if (currentQuestion <= totalQuestions) {
            document.getElementById(`question-${currentQuestion}`).classList.add('active');
            nextButton.style.display = 'none'; // Hide Next button until a correct answer is submitted
            feedback.textContent = '';
            submitButton.style.display = 'inline-block';
            submitButton.disabled = true;
        } 
        // If it's the last question, change next button to Finish
        if (currentQuestion === totalQuestions) {
            nextButton.textContent = 'Finish';
        }
        // Show final score after finishing all questions
        if (currentQuestion > totalQuestions) {
            showFinalScore();
        }
    });

    // Grid button navigation for questions
    gridButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById(`question-${currentQuestion}`).classList.remove('active');
            currentQuestion = parseInt(button.getAttribute('data-question'));
            document.getElementById(`question-${currentQuestion}`).classList.add('active');
            feedback.textContent = '';
            submitButton.style.display = 'inline-block';
            submitButton.disabled = true;
            nextButton.style.display = 'none'; // Hide next button on direct question navigation
        });
    });

    // Initialize the first question
    document.getElementById(`question-${currentQuestion}`).classList.add('active');
});

// Final score display and back to homepage button logic
function showFinalScore() {
    const feedback = document.getElementById('feedback');

    // Clear existing content and only show the "Kembali ke Homepage" button
    feedback.innerHTML = `<button id="back-home" class="blue-button">Kembali ke Homepage</button>`;

    // Hide buttons once quiz is completed
    document.getElementById('next').style.display = 'none'; // Hide next button
    document.getElementById('submit').style.display = 'none'; // Hide submit button
    document.getElementById('try-again').style.display = 'none'; // Hide try again button

    // Add event listener for the homepage redirection
    document.getElementById('back-home').addEventListener('click', () => {
        window.location.href = 'index.html'; // Redirect to homepage
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