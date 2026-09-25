const music =
    document.getElementById(
        "backgroundMusic"
    );

const musicButton =
    document.getElementById(
        "musicButton"
    );

const musicIcon =
    musicButton.querySelector(
        ".music-icon"
    );

let musicPlaying = false;


/* ========================================
   MUSIC
======================================== */

music.volume = 0.23;


async function startMusic() {

    try {

        await music.play();

        musicPlaying = true;

        musicButton.classList.add(
            "playing"
        );

        musicIcon.textContent = "❚❚";

    } catch (error) {

        console.log(
            "Браузер заблокував автоматичне відтворення.",
            error
        );

    }

}


function stopMusic() {

    music.pause();

    musicPlaying = false;

    musicButton.classList.remove(
        "playing"
    );

    musicIcon.textContent = "▶";

}


musicButton.addEventListener(
    "click",
    async () => {

        if (music.paused) {

            await startMusic();

        } else {

            stopMusic();

        }

    }
);


/* ========================================
   START
======================================== */

const startButton =
    document.getElementById(
        "startButton"
    );


startButton.addEventListener(
    "click",
    async () => {

        if (!musicPlaying) {

            await startMusic();

        }


        document
            .getElementById(
                "about"
            )
            .scrollIntoView({

                behavior: "smooth"

            });

    }
);


/* ========================================
   SCROLL REVEAL
======================================== */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry
                            .target
                            .classList
                            .add(
                                "visible"
                            );

                        observer
                            .unobserve(
                                entry.target
                            );

                    }

                }
            );

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(
    element => {

        observer.observe(
            element
        );

    }
);


/* ========================================
   SECRET
======================================== */

const secretButton =
    document.getElementById(
        "secretButton"
    );

const secretMessage =
    document.getElementById(
        "secretMessage"
    );


secretButton.addEventListener(
    "click",
    () => {

        secretMessage
            .classList
            .add(
                "open"
            );

        secretButton.textContent =
            "Тепер ти знаєш ❤️";

        secretButton.disabled = true;


        createHeartBurst(
            secretButton,
            15
        );

    }
);


/* ========================================
   CHOICE
======================================== */

const choiceButtons =
    document.querySelectorAll(
        ".choice-button"
    );

const choiceResult =
    document.getElementById(
        "choiceResult"
    );


const choiceMessages = {

    coffee:
        "☕ Гарний вибір. Тиха кав'ярня, приглушене світло, кава і розмова, яку не хочеться закінчувати.",

    walk:
        "🌃 Мені подобається. Вечір, красиві вулиці, музика десь на фоні й просто йти поруч без поспіху.",

    home:
        "🎬 Максимально затишний варіант. Щось смачне, фільм і бажано щоб нікуди більше не треба було йти 😌"

};


choiceButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                choiceButtons.forEach(
                    item => {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


                button.classList.add(
                    "selected"
                );


                const choice =
                    button.dataset.choice;


                choiceResult.textContent =
                    choiceMessages[
                        choice
                    ];


                createHeartBurst(
                    button,
                    8
                );

            }
        );

    }
);


/* ========================================
   FINAL
======================================== */

const finalButton =
    document.getElementById(
        "finalButton"
    );

const finalMessage =
    document.getElementById(
        "finalMessage"
    );


finalButton.addEventListener(
    "click",
    () => {

        finalMessage
            .classList
            .add(
                "open"
            );


        finalButton.textContent =
            "❤️";


        createHeartBurst(
            finalButton,
            30
        );


        fadeMusic(
            0.12,
            3500
        );

    }
);


/* ========================================
   HEART BURST
======================================== */

function createHeartBurst(
    element,
    amount = 15
) {

    const rect =
        element
            .getBoundingClientRect();


    const x =
        rect.left +
        rect.width / 2;


    const y =
        rect.top +
        rect.height / 2;


    const symbols = [
        "❤️",
        "💕",
        "💗",
        "♡"
    ];


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const heart =
            document.createElement(
                "span"
            );


        heart.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        heart.style.position =
            "fixed";


        heart.style.left =
            x +
            (Math.random() - 0.5)
            * 80 +
            "px";


        heart.style.top =
            y +
            "px";


        heart.style.zIndex =
            "999";


        heart.style.pointerEvents =
            "none";


        heart.style.fontSize =
            14 +
            Math.random() * 16 +
            "px";


        heart.style.transition =
            "1.5s ease-out";


        document.body
            .appendChild(
                heart
            );


        requestAnimationFrame(
            () => {

                heart.style.transform =
                    `
                    translate(
                        ${
                            (
                                Math.random()
                                - 0.5
                            ) * 220
                        }px,
                        ${
                            -100
                            - Math.random()
                            * 180
                        }px
                    )
                    rotate(
                        ${
                            (
                                Math.random()
                                - 0.5
                            ) * 80
                        }deg
                    )
                    `;


                heart.style.opacity =
                    "0";

            }
        );


        setTimeout(
            () => {

                heart.remove();

            },
            1600
        );

    }

}


/* ========================================
   BACKGROUND HEARTS
======================================== */

const hearts =
    document.getElementById(
        "hearts"
    );


function createFloatingHeart() {

    const heart =
        document.createElement(
            "span"
        );


    heart.className =
        "floating-heart";


    heart.textContent =
        Math.random() > 0.7
            ? "♡"
            : "♥";


    heart.style.left =
        Math.random()
        * 100
        + "vw";


    heart.style.fontSize =
        9 +
        Math.random()
        * 15
        + "px";


    heart.style.color =
        Math.random() > 0.5
            ? "#ff90b7"
            : "#c39aff";


    const duration =
        7 +
        Math.random()
        * 7;


    heart.style.animationDuration =
        duration
        + "s";


    hearts.appendChild(
        heart
    );


    setTimeout(
        () => {

            heart.remove();

        },

        duration * 1000

    );

}


setInterval(
    createFloatingHeart,
    800
);


/* ========================================
   MUSIC FADE
======================================== */

function fadeMusic(
    targetVolume,
    duration
) {

    clearInterval(
        fadeMusic.timer
    );


    targetVolume =
        Math.max(
            0,
            Math.min(
                1,
                targetVolume
            )
        );


    const steps = 40;


    const difference =
        targetVolume
        - music.volume;


    const step =
        difference
        / steps;


    const interval =
        duration
        / steps;


    fadeMusic.timer =
        setInterval(
            () => {

                let next =
                    music.volume
                    + step;


                next =
                    Math.max(
                        0,
                        Math.min(
                            1,
                            next
                        )
                    );


                music.volume =
                    next;


                if (
                    Math.abs(
                        music.volume
                        - targetVolume
                    )
                    <=
                    Math.abs(
                        step
                    )
                ) {

                    music.volume =
                        targetVolume;


                    clearInterval(
                        fadeMusic.timer
                    );

                }

            },

            interval

        );

}
