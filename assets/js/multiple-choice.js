const questions = [
    { 
        question: "Dalam membuat karya ilmiah, komponen utama yang perlu diperhatikan dalam daftar pustaka adalah", 
        answers: ["Pengarang, tahun, judul, penerbit", "Pengarang, tempat terbit, halaman", "Judul, penerbit, tempat terbit", "Tahun, tempat terbit, halaman"], 
        correct: 0 
    },
    { 
        question: "Salah satu unsur yang tidak wajib ada dalam karya ilmiah adalah", 
        answers: ["Daftar pustaka", "Indeks", "Daftar tabel", "Prakata"], 
        correct: 1 
    },
    { 
        question: "Ciri topik karya tulis yang baik di antaranya", 
        answers: ["Problematik, aktual, terbatas", "Lugas, mendalam, tidak terbatas", "Objektif, umum, tidak problematik", "Faktual, sangat luas, tidak terbatas"], 
        correct: 0 
    },
    { 
        question: "Jenis plagiarisme yang terjadi ketika seseorang mengutip karya orang lain tanpa menyebutkan sumbernya disebut", 
        answers: ["Self plagiarism", "Plagiarisme kepengarangan", "Plagiarisme kalimat", "Plagiarisme sebagian"], 
        correct: 2 
    },
    { 
        question: "Jenis paragraf yang berisi penggambaran secara detail mengenai objek atau suasana disebut", 
        answers: ["Paragraf narasi", "Paragraf deduktif", "Paragraf deskripsi", "Paragraf induktif"], 
        correct: 2 
    },
    { 
        question: "Ciri-ciri karangan ilmiah antara lain adalah", 
        answers: ["Lugas dan subjektif", "Informatif dan berlebihan", "Objektif dan logis", "Subjektif dan analitis"], 
        correct: 2 
    },
    { 
        question: "Dalam membuat karya ilmiah, komponen utama yang perlu diperhatikan dalam daftar pustaka adalah", 
        answers: ["Pengarang, tahun, judul, penerbit", "Pengarang, tempat terbit, halaman", "Judul, penerbit, tempat terbit", "Tahun, tempat terbit, halaman"], 
        correct: 0 
    },
    { 
        question: "Salah satu unsur yang tidak wajib ada dalam karya ilmiah adalah", 
        answers: ["Daftar pustaka", "Indeks", "Daftar tabel", "Prakata"], 
        correct: 1 
    },
    { 
        question: "Ciri topik karya tulis yang baik di antaranya", 
        answers: ["Problematik, aktual, terbatas", "Lugas, mendalam, tidak terbatas", "Objektif, umum, tidak problematik", "Faktual, sangat luas, tidak terbatas"], 
        correct: 0 
    },
    { 
        question: "Jenis plagiarisme yang terjadi ketika seseorang mengutip karya orang lain tanpa menyebutkan sumbernya disebut", 
        answers: ["Self plagiarism", "Plagiarisme kepengarangan", "Plagiarisme kalimat", "Plagiarisme sebagian"], 
        correct: 2
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