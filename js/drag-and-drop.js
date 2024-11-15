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

    // Update the "nextButton" event listener
    nextButton.addEventListener('click', () => {
        document.getElementById(`question-${currentQuestion}`).classList.remove('active');
        currentQuestion++;
        if (currentQuestion <= totalQuestions) {
            // Display the next question
            document.getElementById(`question-${currentQuestion}`).classList.add('active');
            nextButton.style.display = 'none';
            feedback.textContent = '';
            submitButton.style.display = 'inline-block';
            submitButton.disabled = true;
            setupDragAndDrop(currentQuestion);
        } else {
            // Final question reached - show final score and back button
            showFinalScore();
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
const backButton = document.createElement('button');

// Add click event to "BERBAHASA" to toggle the sidebar
navLogo.addEventListener('click', function() {
  if (sideToolbar.style.width === "250px") {
    sideToolbar.style.width = "0";  // Close sidebar
  } else {
    sideToolbar.style.width = "250px";  // Open sidebar
  }
});

// Function to show the final message and direct to homepage
function showFinalScore() {
    // Hide the Next Question button
    const nextButton = document.getElementById('next-question');
    if (nextButton) {
        nextButton.style.display = 'none';
    }

    // Display a message to go back to the homepage
    const finalMessage = document.createElement('p');
    finalMessage.innerHTML = `All questions answered! <a href="index.html" style="color: #0861ba; font-weight: bold;">Go to Homepage</a>`;

    // Add styling to the message
    finalMessage.style.textAlign = 'center';
    finalMessage.style.fontSize = '1.2rem';
    finalMessage.style.marginTop = '20px';

    // Append the message to the quiz container
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.appendChild(finalMessage);
}

// Check if all questions are completed and then call showFinalScore()
function checkCompletion() {
    const totalQuestions = 5; // Update this if more questions are added
    let allAnswered = true;

    for (let i = 1; i <= totalQuestions; i++) {
        const questionElement = document.getElementById(`question-${i}`);
        if (questionElement && !questionElement.classList.contains('completed')) {
            allAnswered = false;
            break;
        }
    }

    if (allAnswered) {
        showFinalScore();
    }
}

// Call checkCompletion() function after each question is completed
function completeQuestion() {
    // Mark the current question as completed
    const currentQuestion = document.querySelector('.question.active');
    if (currentQuestion) {
        currentQuestion.classList.add('completed');
    }

    // Call checkCompletion to see if all questions are done
    checkCompletion();
}

