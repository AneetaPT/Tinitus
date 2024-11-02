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
