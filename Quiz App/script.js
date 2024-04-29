const questions = [
    {
        question: "Name the first two apostles to follow Jesus?",
        answers: [
            {text: "Peter and Andrew", correct: true},
            {text: "Luke and John", correct: false},
            {text: "James and John", correct: false},
            {text: "Judas and Simon", correct: false},
        ]
    },
    {
        question: "Where did Jesus turn water into wine?",
        answers: [
            {text: "Jerusalem", correct: false},
            {text: "Nazareth", correct: false},
            {text: "Cana", correct: true},
            {text: "Judea", correct: false},
        ]
    },
    {
        question: "How old was Jesus when he started his ministry?",
        answers: [
            {text: "25", correct: false},
            {text: "30", correct: true},
            {text: "12", correct: false},
            {text: "40", correct: false},
        ] 
    },
    {
        question: "Which woman washed Jesus' feet?",
        answers: [
            {text: "Joanna", correct: false},
            {text: "Salome ", correct: false},
            {text: "Mary Magdalene", correct: true},
            {text: "Martha", correct: false},
        ] 
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer)
    });
}

function resetState() {
    nextButton.style.display = "none"
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else{
         showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();

