document.addEventListener("DOMContentLoaded", function () {
    const correctAnswers = {
        1: "sitasi",
        2: "catatan",
        3: "bukti",
        4: "karya",
        5: "disiplin"
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

    // Enable Submit button when an input field is typed in
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
            updateScore();
            submitButton.disabled = true;
            nextButton.style.display = 'inline-block';
            document.querySelector(`.grid-btn[data-question="${currentQuestion}"]`).classList.add('correct');
            document.querySelector(`.grid-btn[data-question="${currentQuestion}"]`).classList.remove('wrong');
        } else {
            feedback.textContent = `Wrong! Try again for question ${currentQuestion}.`;
            tryAgainButton.style.display = 'inline-block';
            submitButton.disabled = true;
            document.querySelector(`.grid-btn[data-question="${currentQuestion}"]`).classList.add('wrong');
        }
    }

    // Update score
    function updateScore() {
        scoreDisplay.textContent = `Score: ${score}`;
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
            nextButton.style.display = 'none';
            feedback.textContent = '';
            submitButton.style.display = 'inline-block';
            submitButton.disabled = true;
        } else {
            // Show final score and reset option
            feedback.innerHTML = `<h2>Quiz completed! Final Score: ${score}</h2>`;
            nextButton.style.display = 'none';
            submitButton.style.display = 'none';
            tryAgainButton.style.display = 'none';
            feedback.innerHTML += `<button onclick="location.reload()">Back to Homepage</button>`;
        }

        if (currentQuestion === totalQuestions) {
            nextButton.textContent = 'Finish';
        }
    });

    // Grid button navigation for questions
    gridButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById(`question-${currentQuestion}`).classList.remove('active');
            currentQuestion = button.getAttribute('data-question');
            document.getElementById(`question-${currentQuestion}`).classList.add('active');
            feedback.textContent = '';
            submitButton.style.display = 'inline-block';
            submitButton.disabled = true;
            nextButton.style.display = 'none';
        });
    });

    // Initialize the first question
    document.getElementById(`question-${currentQuestion}`).classList.add('active');
});
