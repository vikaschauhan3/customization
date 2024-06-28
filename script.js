// Emotion Wheel Challenge Script
const scenarios = [
    { text: "You just received news that you got a promotion you've been eagerly awaiting.", emotion: "Joy" },
    { text: "Your close friend cancels plans at the last minute for the third time in a row.", emotion: "Disappointment" },
    { text: "You discover an unexpected charge on your credit card statement.", emotion: "Surprise" },
    { text: "You're about to give an important presentation to a large audience.", emotion: "Fear" },
    { text: "Someone cuts in front of you in a long queue you've been waiting in.", emotion: "Anger" },
    { text: "You realize you've missed an important deadline at work.", emotion: "Sadness" }
];
const emotions = ["Joy", "Anger", "Sadness", "Surprise", "Fear", "Disappointment"];
let currentScenario;
let selectedEmotion;
let currentRotation = 0;

function spinWheel() {
    const wheel = document.getElementById('wheel');
    const spinButton = document.getElementById('spin-button');
    spinButton.disabled = true;
    
    wheel.style.transition = 'none';
    wheel.style.transform = `rotate(0deg)`;
    void wheel.offsetWidth;
    
    const additionalRotation = Math.floor(Math.random() * 360) + 720;
    currentRotation += additionalRotation;
    wheel.style.transition = 'transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)';
    wheel.style.transform = `rotate(${currentRotation}deg)`;
    
    setTimeout(() => {
        currentScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
        document.getElementById('scenario').style.display = 'block';
        document.getElementById('scenario').innerHTML = `<p>${currentScenario.text}</p><p>How would you feel in this scenario?</p>`;
        const emotionsHtml = emotions.map(emotion => 
            `<button onclick="selectEmotion('${emotion}')">${emotion}</button>`
        ).join('');
        document.getElementById('emotions').innerHTML = emotionsHtml;
        document.getElementById('eiTechnique').style.display = 'none';
        document.getElementById('feedback').style.display = 'none';
        document.getElementById('technique').value = '';
        spinButton.disabled = false;
    }, 3000);
}

function selectEmotion(emotion) {
    selectedEmotion = emotion;
    let feedback = '';
    if (emotion === currentScenario.emotion) {
        feedback = "Correct! That's the expected emotion for this scenario.";
    } else {
        feedback = `Not quite. The expected emotion was ${currentScenario.emotion}. However, emotions can be complex and your response is valid too.`;
    }
    document.getElementById('feedback').style.display = 'block';
    document.getElementById('feedback').innerHTML = feedback;
    document.getElementById('eiTechnique').style.display = 'block';
}

function submitTechnique() {
    const technique = document.getElementById('technique').value;
    if (technique.trim() !== '') {
        const feedback = `Great job! You identified the emotion as ${selectedEmotion} and suggested the following emotional intelligence technique:<br><br>"${technique}"`;
        document.getElementById('feedback').innerHTML = feedback;
    } else {
        document.getElementById('feedback').innerHTML = "Please enter an emotional intelligence technique before submitting.";
    }
}
