const leftPupil = document.querySelector(".eye.one .pupil");
const rightPupil = document.querySelector(".eye.two .pupil");

function movePupil(pupil, eye, event) {
    const eyeRect = eye.getBoundingClientRect();
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;

    const angle = Math.atan2(event.clientY - eyeCenterY, event.clientX - eyeCenterX);
    
    const pupilDistance = Math.min(
        eyeRect.width / 2 - pupil.offsetWidth / 2,
        eyeRect.height / 2 - pupil.offsetHeight / 2
    );

    pupil.style.transform = `translate(${Math.cos(angle) * pupilDistance}px, ${Math.sin(angle) * pupilDistance}px)`;
}

document.addEventListener("mousemove", (event) => {
    const leftEye = document.querySelector(".eye.one");
    const rightEye = document.querySelector(".eye.two");

    movePupil(leftPupil, leftEye, event);
    movePupil(rightPupil, rightEye, event);
});

const frog = document.querySelector('.frog');
const dialogueBox = document.getElementById('dialogueBox');
const dialogueText = document.getElementById('dialogueText');

const messages = [
    "I'm just here for the hops!",
    "Feeling froggy today!",
    "Don't croak under pressure!",
    "Why are frogs so happy? They eat whatever bugs them!"
];

window.addEventListener('load', () => {
    const quoteElement = document.getElementById('frog-quote');
    const randomQuote = messages[Math.floor(Math.random() * messages.length)];
    quoteElement.textContent = randomQuote;
});

function showMessage() {
    const randomIndex = Math.floor(Math.random() * messages.length);
    dialogueText.textContent = messages[randomIndex];
    dialogueBox.style.display = 'block';

    setTimeout(() => {
        dialogueBox.style.display = 'none';
    }, 3000);
}

function createBubbles() {
    const bubbleCount = 10;
    const frogRect = frog.getBoundingClientRect();

    for (let i = 0; i < bubbleCount; i++) {
        const delay = Math.random() * 300;

        setTimeout(() => {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');

            const bubbleX = frogRect.left + frogRect.width / 2 - 20 + (Math.random() * 80);
            bubble.style.left = `${bubbleX}px`;
            bubble.style.bottom = `${frogRect.bottom + 5}px`;

            document.body.appendChild(bubble);

            bubble.addEventListener('animationend', () => {
                bubble.remove();
            });
        }, delay * i);
    }
}

function jumpFrog() {
    frog.style.animation = 'jump 0.5s ease';
    createBubbles();

    frog.addEventListener('animationend', () => {
        frog.style.animation = '';
    });
}

frog.addEventListener('click', showMessage);
frog.addEventListener('dblclick', jumpFrog);
