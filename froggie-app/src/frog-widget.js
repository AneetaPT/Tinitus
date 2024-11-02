class FrogPetWidget extends HTMLElement {
    constructor() {
        super();
        
        this.attachShadow({mode: 'open'});
        
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background-color: #99C68E;
                }

                .container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 280px;
                    position: relative;
                    padding: 10px;
                }

                /* Copy of your existing CSS, but scoped inside the component */
                ${this.getStyles()}
            </style>
            
            <div class="container">
                <div class="dialog-box">
                    <p id="frog-quote">I'm just here for the hops!</p>
                </div>
                <div class="frog">
                    <div class="tophattop">
                        <div class="tophatbottom"></div>
                    </div>
                    <div id="head" class="frogface">
                        <div class="sunglasses"></div>
                        <div class="eye one">
                            <div class="pupil one"></div>
                        </div>
                        <div class="eye two">
                            <div class="pupil two"></div>
                        </div>
                        <div class="frogmouth">
                            <div id="mouth" class="froglip">
                                <div id="tongue"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.setupBehavior();
    }

    getStyles() {
        return `
            :host {
                display: block;
                background-color: #99C68E;
            }

            .container {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 280px;
                position: relative;
                padding: 10px;
            }

            .frog {
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                height: 200px;
                transform: scale(0.7);
                margin-top: -30px;
                cursor: pointer;
                -webkit-app-region: no-drag;
                user-select: none;
            }    

            .frogface {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                background-color: #53b28f;
                height: 80px;
                width: 200px;
                border-radius: 45%;
                top: 40px;
                z-index: 2;
            }

            .eye {
                background-color: white; 
                height: 55px;
                width: 45px;
                border-radius: 50%;
                position: absolute;
                z-index: 2;
            }

            .eye.one {
                left: calc(50% - 100px);
                top: -25px;
            }

            .eye.two {
                left: calc(50% + 55px);
                top: -25px;
            }

            .pupil {
                background-color: black; 
                height: 30px;
                width: 20px;
                border-radius: 50%;
                position: absolute;
                z-index: 3;
            }

            .pupil.one {
                left: 5px;
                top: 10px;
                transform: rotate(-6deg);
            }

            .pupil.two {
                right: 5px;
                top: 10px;
                transform: rotate(6deg);
            }

            .frogmouth {
                position: absolute;
                width: 60px;
                height: 10px;
                left: 50%; 
                transform: translateX(-50%); 
                bottom: 4.5px; 
                background-color: #000;
                border-radius: 70px; 
            }

            .dialog-box {
                position: relative;
                background: white;
                border-radius: 20px;
                padding: 10px;
                margin-bottom: 20px;
                border: 2px solid #333;
                width: 180px;
                height: 40px;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .dialog-box p {
                margin: 0;
                padding: 0;
            }

            .dialog-box:after {
                content: '';
                position: absolute;
                bottom: -10px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-top: 10px solid white;
            }

            @keyframes jump {
                0%, 100% { transform: translateY(0) scale(0.7); }
                50% { transform: translateY(-40px) scale(0.7); }
            }

            @keyframes float {
                0% { transform: translateY(0); opacity: 1; }
                100% { transform: translateY(-100px); opacity: 0; }
            }

            .bubble {
                position: absolute;
                width: 10px;
                height: 10px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                bottom: 100px;
                animation: float 1s ease-out forwards;
                pointer-events: none;
            }

            .pupil {
                transition: transform 0.1s ease-out;
                will-change: transform;
            }

            /* Prevent dragging on interactive elements */
            .frog *, .dialog-box, .bubble {
                -webkit-app-region: no-drag;
                pointer-events: auto;
            }
        `;
    }

    setupBehavior() {
        // Get elements from shadow DOM
        const frog = this.shadowRoot.querySelector('.frog');
        const container = this.shadowRoot.querySelector('.container');
        const leftPupil = this.shadowRoot.querySelector(".pupil.one");
        const rightPupil = this.shadowRoot.querySelector(".pupil.two");
        const leftEye = this.shadowRoot.querySelector(".eye.one");
        const rightEye = this.shadowRoot.querySelector(".eye.two");

        const messages = [
            "I'm just here for the hops!",
            "Feeling froggy today!",
            "Don't croak under pressure!",
            "Why are frogs so happy? They eat whatever bugs them!"
        ];

        // Simplified eye movement function
        const movePupils = (event) => {
            const rect = this.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            [leftPupil, rightPupil].forEach(pupil => {
                const pupilRect = pupil.getBoundingClientRect();
                const centerX = pupilRect.left + pupilRect.width / 2 - rect.left;
                const centerY = pupilRect.top + pupilRect.height / 2 - rect.top;

                const deltaX = x - centerX;
                const deltaY = y - centerY;
                const angle = Math.atan2(deltaY, deltaX);

                const distance = Math.min(5, Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 10);
                const moveX = Math.cos(angle) * distance;
                const moveY = Math.sin(angle) * distance;

                pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        };

        // Simplified jump function
        const jumpFrog = () => {
            frog.style.animation = 'none';
            frog.offsetHeight; // Trigger reflow
            frog.style.animation = 'jump 0.5s ease-in-out';
            
            // Create bubbles
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const bubble = document.createElement('div');
                    bubble.className = 'bubble';
                    bubble.style.left = `${50 + Math.random() * 20 - 10}%`;
                    container.appendChild(bubble);
                    setTimeout(() => bubble.remove(), 1000);
                }, i * 100);
            }
        };

        // Event listeners
        document.addEventListener('mousemove', movePupils);
        
        frog.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const quoteElement = this.shadowRoot.getElementById('frog-quote');
            quoteElement.textContent = messages[Math.floor(Math.random() * messages.length)];
        });

        frog.addEventListener('dblclick', (e) => {
            e.preventDefault();
            e.stopPropagation();
            jumpFrog();
        });
    }
}

customElements.define('frog-pet', FrogPetWidget); 