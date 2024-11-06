document.addEventListener("DOMContentLoaded", function () {
    let currentQuestion = 1;
    let score = 0;
    const totalQuestions = 5;
    let answersPlaced = {};  
    const submitButton = document.getElementById('submit');
    const nextButton = document.getElementById('next-question');
    const tryAgainButton = document.getElementById('try-again');
    const feedback = document.getElementById('feedback');
    const scoreDisplay = document.getElementById('score');
    const gridButtons = document.querySelectorAll('.grid-btn');
    let filledDropzones = {};  // Keeps track of what has been placed in each drop zone
    
    // Function to update score
    function updateScore() {
        scoreDisplay.textContent = `Score: ${score}`;
    }

    // Function to shuffle draggable items
    function shuffleDraggables(containerId) {
        const container = document.getElementById(containerId);
        for (let i = container.children.length; i >= 0; i--) {
            container.appendChild(container.children[Math.random() * i | 0]);
        }
    }

    // Function to set up drag-and-drop for a question
    function setupDragAndDrop(questionNum) {
        const draggables = document.querySelectorAll(`#draggable-container-${questionNum} .draggable`);
        const dropzones = document.querySelectorAll(`#drop-zone-container-${questionNum} .dropzone`);

        // Shuffle draggable items
        shuffleDraggables(`draggable-container-${questionNum}`);

        // Ensure answersPlaced is empty for each question
        answersPlaced = {};
        filledDropzones = {};  // Reset dropzones for the new question

        dropzones.forEach(dropzone => {
            dropzone.dataset.original = dropzone.textContent;
            dropzone.addEventListener('dragover', (e) => e.preventDefault());

            dropzone.addEventListener('drop', (e) => {
                e.preventDefault();
                const draggedText = e.dataTransfer.getData('text');
                const previousAnswer = e.target.textContent;

                // Reset the previously filled dropzone and move the item back to the draggable list
                if (previousAnswer !== dropzone.dataset.original && previousAnswer in filledDropzones) {
                    draggables.forEach(draggable => {
                        if (draggable.textContent === previousAnswer) {
                            draggable.style.display = 'inline-block';
                        }
                    });
                }

                // Place the new dragged item into the dropzone
                e.target.textContent = draggedText;
                e.target.style.backgroundColor = 'lightblue';
                answersPlaced[e.target.dataset.correct] = draggedText;
                filledDropzones[draggedText] = true;

                // Hide the draggable item that was dropped
                draggables.forEach(draggable => {
                    if (draggable.textContent === draggedText) {
                        draggable.style.display = 'none';
                    }
                });

                // Enable submit button when all dropzones are filled
                const filled = Object.keys(answersPlaced).length === dropzones.length;
                submitButton.disabled = !filled;
            });
        });

        draggables.forEach(draggable => {
            draggable.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text', e.target.textContent);
                draggable.classList.add('dragging');
            });

            draggable.addEventListener('dragend', () => {
                draggable.classList.remove('dragging');
            });
        });
    }

    // Initialize drag-and-drop for the first question
    setupDragAndDrop(currentQuestion);

    // Check answers when submit button is clicked
    submitButton.addEventListener('click', () => {
        const dropzones = document.querySelectorAll(`#drop-zone-container-${currentQuestion} .dropzone`);
        let allCorrect = true;

        dropzones.forEach(dropzone => {
            const correctAnswer = dropzone.dataset.correct;
            const userAnswer = dropzone.textContent.trim();

            if (userAnswer !== correctAnswer) {
                allCorrect = false;
                dropzone.classList.add('wrong');
            } else {
                dropzone.classList.add('correct');
            }
        });

        if (allCorrect) {
            feedback.textContent = 'All answers correct!';
            score += 10;
            updateScore();
            submitButton.style.display = 'none';
            nextButton.style.display = 'inline-block';
            tryAgainButton.style.display = 'none';
            document.querySelector(`.grid-btn[data-question="${currentQuestion}"]`).classList.add('correct');
        } else {
            feedback.textContent = 'Some answers are incorrect. Try again.';
            submitButton.disabled = true;
            tryAgainButton.style.display = 'inline-block';
            document.querySelector(`.grid-btn[data-question="${currentQuestion}"]`).classList.add('wrong');
        }
    });

    // Reset the current question when try again is clicked
    tryAgainButton.addEventListener('click', () => {
        feedback.textContent = '';
        tryAgainButton.style.display = 'none';
        submitButton.disabled = true;

        const dropzones = document.querySelectorAll(`#drop-zone-container-${currentQuestion} .dropzone`);
        const draggables = document.querySelectorAll(`#draggable-container-${currentQuestion} .draggable`);

        dropzones.forEach(dropzone => {
            dropzone.textContent = dropzone.dataset.original;
            dropzone.classList.remove('wrong', 'correct');
            dropzone.style.backgroundColor = '';
        });

        draggables.forEach(draggable => {
            draggable.style.display = 'inline-block';
        });

        answersPlaced = {};
        filledDropzones = {};  // Reset dropzones for the question
    });

    // Move to the next question
    nextButton.addEventListener('click', () => {
        document.getElementById(`question-${currentQuestion}`).classList.remove('active');
        currentQuestion++;
        if (currentQuestion <= totalQuestions) {
            document.getElementById(`question-${currentQuestion}`).classList.add('active');
            nextButton.style.display = 'none';
            feedback.textContent = '';
            submitButton.style.display = 'inline-block';
            submitButton.disabled = true;
            setupDragAndDrop(currentQuestion);
        } else {
            showFinalScore();  // Only show final score after the last question
        }
    });
    
    // Handle grid button navigation for questions
    gridButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById(`question-${currentQuestion}`).classList.remove('active');
            currentQuestion = button.getAttribute('data-question');
            document.getElementById(`question-${currentQuestion}`).classList.add('active');
            feedback.textContent = '';
            submitButton.style.display = 'inline-block';
            submitButton.disabled = true;
            setupDragAndDrop(currentQuestion);
        });
    });
});

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

function showFinalScore() {
    const correctAnswers = score / 10; // Assuming 10 points per correct answer
    document.getElementById('correct-answers').textContent = correctAnswers;
    document.getElementById('total-questions').textContent = totalQuestions;
    
    // Show the final score section
    document.querySelector('.score-section').style.display = 'flex';

    // Change "Next Question" button to "Back to Homepage"
    nextButton.style.display = 'none'; // Hide the "Next Question" button
    const backButton = document.getElementById('back-home');
    backButton.style.display = 'inline-block';  // Show the "Back to Homepage" button
    backButton.addEventListener('click', function() {
        window.location.href = "homepage.html";  // Redirect to homepage
    });
}

