const startBtn = document.getElementById("startBtn");
const questionDiv = document.getElementById("question");
const messageDiv = document.getElementById("message");

let question = "";
let answer = 0;
let recognition;

function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    question = `What is ${num1} + ${num2}?`;
    answer = num1 + num2;
    speak(question);
    questionDiv.innerText = question;
}

function speak(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
}

function startRecognition() {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = function (event) {
        const userAnswer = parseInt(event.results[0][0].transcript);
        if (userAnswer === answer) {
            messageDiv.innerText = "Correct!";
            generateQuestion();
        } else {
            messageDiv.innerText = "Incorrect. Try again.";
        }
    };

    recognition.onerror = function (event) {
        if (event.error === "not-allowed") {
            messageDiv.innerText = "Please allow microphone access to use this feature.";
        } else {
            messageDiv.innerText = "Error: " + event.error;
        }
    };

    recognition.onend = function () {
        recognition.start();
    };

    recognition.start();
}

function init() {
    if (!('speechSynthesis' in window) || !('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        alert("Your browser does not support the Web Speech API. Try using a different browser like Google Chrome.");
        return;
    }
    generateQuestion();
    startRecognition();
}

startBtn.addEventListener("click", init);
