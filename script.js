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
   "I'm just here for the hops!", "Feeling froggy today!", 
    "Don't croak under pressure!", "Why are frogs so happy? They eat whatever bugs them!", 
    "Just chilling on my lily pad!", "Leaping into life one hop at a time!", 
    "Ribbit? More like, Ribb-IT!", "Frogs don't sweat the small stuff!",
    "Don't worry, be hoppy!", "I'm a leap ahead of the rest!", 
    "I’m all about that amphibian ambiance.", "What's a frog's favorite drink? Croak-a-Cola!",
    "Feeling unfrogettable today!", "This face is 100% natural and ribbit-ious.",
    "Here for the fly cuisine!", "Did you know? Frogs can breathe through their skin!",
    "I’m kind of a big leap.", "Every hop counts!", 
    "Frog fact: I can jump up to 20 times my body length!", 
    "No bad vibes on this lily pad!", "I'm hoppy to see you!",
    "Did you know? Some frogs can change colors!", 
    "I've got a 'ribbiting' personality!", 
    "Frogs were here even before dinosaurs—talk about staying power!"
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
