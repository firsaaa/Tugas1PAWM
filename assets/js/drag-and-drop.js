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

        dropzones.forEach(dropzone => {
            // Store the original text for resetting later
            dropzone.dataset.original = dropzone.textContent;

            dropzone.addEventListener('dragover', (e) => e.preventDefault());

            dropzone.addEventListener('drop', (e) => {
                e.preventDefault();
                const draggedText = e.dataTransfer.getData('text');
                const previousAnswer = e.target.textContent;

                // Reset the previously filled dropzone
                if (previousAnswer !== dropzone.dataset.correct) {
                    draggables.forEach(draggable => {
                        if (draggable.textContent === previousAnswer) {
                            draggable.style.display = 'inline-block';
                        }
                    });
                }

                // Set the new text into the dropzone
                e.target.textContent = draggedText;
                e.target.style.backgroundColor = 'lightblue'; // Change color when dropped
                answersPlaced[e.target.dataset.correct] = draggedText;

                // Hide the draggable item that was dropped
                draggables.forEach(draggable => {
                    if (draggable.textContent === draggedText) {
                        draggable.style.display = 'none';
                    }
                });

                // Enable submit button when all dropzones are filled
                const filled = Object.keys(answersPlaced).length === dropzones.length;
                console.log(`Filled: ${filled}, Question: ${questionNum}`);
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
            // Reset the dropzone text to its original state
            dropzone.textContent = dropzone.dataset.original;
            dropzone.classList.remove('wrong', 'correct');
            dropzone.style.backgroundColor = ''; // Remove background color on reset
        });

        draggables.forEach(draggable => {
            draggable.style.display = 'inline-block';
        });

        answersPlaced = {}; // Clear placed answers
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
            feedback.textContent = `Quiz completed! Final Score: ${score}`;
            nextButton.style.display = 'none';
            submitButton.style.display = 'none';
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
            setupDragAndDrop(currentQuestion); // Reinitialize drag-and-drop for the selected question
        });
    });
});
