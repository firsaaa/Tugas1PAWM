const questions = [
    {
      question: "Choose the correct form: She _____ to the market yesterday.",
      answers: {
        a: "go",
        b: "went",
        c: "going"
      },
      correctAnswer: "b"
    },
    {
      question: "Which is correct: He is _____ doctor.",
      answers: {
        a: "a",
        b: "an",
        c: "the"
      },
      correctAnswer: "a"
    }
  ];
  
  function loadQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';
  
    questions.forEach((q, index) => {
      const questionElement = document.createElement('div');
      questionElement.classList.add('question');
  
      const questionText = document.createElement('p');
      questionText.textContent = `${index + 1}. ${q.question}`;
      questionElement.appendChild(questionText);
  
      for (const [key, value] of Object.entries(q.answers)) {
        const answerOption = document.createElement('button');
        answerOption.textContent = value;
        answerOption.onclick = () => checkAnswer(index, key);
        questionElement.appendChild(answerOption);
      }
  
      quizContainer.appendChild(questionElement);
    });
  }
  
  function checkAnswer(questionIndex, answer) {
    const quizContainer = document.getElementById('quiz-container');
    if (answer === questions[questionIndex].correctAnswer) {
      alert("Correct!");
    } else {
      alert("Incorrect, try again!");
    }
  }
  
  loadQuiz();