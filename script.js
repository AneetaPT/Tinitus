const leftPupil = document.querySelector(".eye.one .pupil");
const rightPupil = document.querySelector(".eye.two .pupil");

function movePupil(pupil, eye, event) {
    const eyeRect = eye.getBoundingClientRect();
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;

    const angle = Math.atan2(event.clientY - eyeCenterY, event.clientX - eyeCenterX);
    
    const pupilDistance = Math.min(eyeRect.width / 2 - pupil.offsetWidth / 2, eyeRect.height / 2 - pupil.offsetHeight / 2);

    pupil.style.transform = `translate(${Math.cos(angle) * pupilDistance}px, ${Math.sin(angle) * pupilDistance}px)`;
}

document.addEventListener("mousemove", (event) => {
    const leftEye = document.querySelector(".eye.one");
    const rightEye = document.querySelector(".eye.two");

    movePupil(leftPupil, leftEye, event);
    movePupil(rightPupil, rightEye, event);
});

const quotes = [
    "I'm just here for the hops!",
    "Feeling froggy today!",
    "Don't croak under pressure!",
    "Why are frogs so happy? They eat whatever bugs them!"
];

// Show random quote only once when page loads
window.addEventListener('load', () => {
    const quoteElement = document.getElementById('frog-quote');
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteElement.textContent = randomQuote;
});
