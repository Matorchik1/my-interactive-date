// =============================
// Печатання заголовка
// =============================

const text = "Ласкаво просимо до моєї свідомості";

const typing = document.getElementById("typing");

let index = 0;

function type() {

    if (index < text.length) {

        typing.innerHTML += text[index];

        index++;

        setTimeout(type, 55);

    }

}

type();

const heartReveal =
    document.getElementById("heartReveal");


function showHeartReveal() {

    heartReveal.classList.add("show");


    setTimeout(() => {

        heartReveal.classList.remove("show");

        secretOverlay.classList.add("show");


    }, 2500);


}

// =============================
// Прогрес проходження
// =============================

const viewedPages = new Set(["page1"]);

const progressFill = document.getElementById("progressFill");
const progressHeart = document.querySelector(".progress-heart");

// =============================
// Прочитані розділи
// =============================


const menuCards = document.querySelectorAll(".menu-card");


menuCards.forEach(card => {


    card.addEventListener("click", () => {


        const page = card.dataset.page;


        // записуємо що відкрили

        localStorage.setItem(
            "read_" + page,
            "true"
        );


        card.classList.add("readed");


    });


});



// Відновлення після перезавантаження

menuCards.forEach(card => {


    const page = card.dataset.page;


    if (localStorage.getItem("read_" + page)) {

        card.classList.add("readed");

    }

});


const secretOverlay = document.getElementById("secretOverlay");
const openLetter = document.getElementById("openLetter");

let secretOpened = false;
let secretReady = false;

const totalPages = [
    "aboutPage",
    "characterPage",
    "valuesPeoplePage",
    "principlesPage",
    "lifePage",
    "dreamsPage",
    "joyPage",
    "tastePage",
    "stylePage",
    "carePage",
    "relationshipPage",
    "girlPage",
    "momentsPage"
];

function updateProgress() {


    const total = menuCards.length;


    const read = document.querySelectorAll(
        ".menu-card.readed"
    ).length;


    const percent = (read / total) * 100;


    progressFill.style.width = percent + "%";

    if (read === total) {


        progressHeart.classList.add("finish");


        // НЕ відкриваємо одразу


    } else {


        progressHeart.classList.remove("finish");


    }


    updateMusicByProgress();

}

function checkSecret() {

    const total = menuCards.length;

    const read = document.querySelectorAll(
        ".menu-card.readed"
    ).length;


    if (read === total) {

        if (!secretOpened) {

            secretOpened = true;


            setTimeout(() => {

                showHeartReveal();

            }, 50);

        }

    }

}

const letterText =
    document.getElementById("letterText");


let originalText = "";

if (letterText) {

    originalText = letterText.innerHTML;

}


const letterParagraphs =
    document.querySelectorAll("#letterText p");


function typeLetter() {


    letterText.innerHTML = "";


    let paragraphIndex = 0;


    function writeParagraph() {


        if (paragraphIndex >= letterParagraphs.length) {

            setTimeout(() => {

                const button = document.getElementById("finishButton");

                button.classList.add("show");

                for (let i = 0; i < 5; i++) {
                    createHeart();
                }

            }, 100);

            return;
        }


        const text = letterParagraphs[paragraphIndex].innerText;


        const p = document.createElement("p");

        letterText.appendChild(p);


        let i = 0;


        const timer = setInterval(() => {


            p.innerHTML += text[i];


            i++;


            if (i >= text.length) {


                clearInterval(timer);


                paragraphIndex++;


                setTimeout(() => {

                    writeParagraph();

                }, 700); // пауза між абзацами


            }


        }, 35); // швидкість друку


    }


    writeParagraph();

}

menuCards.forEach(card => {

    card.addEventListener("click", () => {

        const page = card.dataset.page;

        localStorage.setItem(
            "read_" + page,
            "true"
        );

        card.classList.add("readed");

        updateProgress();

    });

});

// =============================
// Навігація
// =============================

function showPage(currentId, nextId) {

    const current = document.getElementById(currentId);
    const next = document.getElementById(nextId);

    if (!current || !next) return;


    current.classList.add("leaving");


    setTimeout(() => {

        current.classList.remove("active");
        current.classList.remove("leaving");


        next.classList.add("active");


    }, 500);


}

function fadeMusic(volume, time) {

    let step =
        (volume - music.volume) / 20;


    let fade = setInterval(() => {

        music.volume += step;


        if (
            Math.abs(music.volume - volume) < 0.01
        ) {

            clearInterval(fade);

        }

    }, time / 20);

}

function updateMusicByProgress() {

    const total = menuCards.length;

    const read = document.querySelectorAll(
        ".menu-card.readed"
    ).length;


    const progress = read / total;


    // мінімум 15%, максимум 60%
    const volume = 0.15 + (progress * 0.45);


    fadeMusic(volume, 1500);

}

// =============================
// Почати
// =============================

const startModal = document.getElementById("startModal");

document.getElementById("startButton").addEventListener("click", () => {

    startModal.classList.add("show");

});

document.getElementById("acceptDate").addEventListener("click", async () => {

    startModal.classList.remove("show");

    try {

        music.volume = 0;

        await music.play();

        fadeMusic(.5, 3000);

    } catch (error) {

        console.error(error);

    }

    showPage("page1", "menuPage");

});


// =============================
// Меню
// =============================

document.querySelectorAll(".menu-card").forEach(card => {

    card.addEventListener("click", () => {

        showPage("menuPage", card.dataset.page);

    });

});


// =============================
// Назад
// =============================
document.querySelectorAll(".backMenu").forEach(button => {

    button.addEventListener("click", () => {

        const currentPage = button.closest(".page");


        showPage(currentPage.id, "menuPage");


        setTimeout(() => {

            checkSecret();

        }, 500);

    });

});


// =============================
// Сердечка
// =============================

const heartsContainer = document.getElementById("hearts");

function createHeart() {

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = `
<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">

<defs>

<linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">

<stop offset="0%" stop-color="#ff80bf"/>
<stop offset="45%" stop-color="#ff5e94"/>
<stop offset="100%" stop-color="#ff2f74"/>

</linearGradient>

</defs>

<path
fill="url(#heartGradient)"
d="M256 472
L228 447
C110 340
32 267
32 170
32 95
91 40
165 40
208 40
248 61
256 91
264 61
304 40
347 40
421 40
480 95
480 170
480 267
402 340
284 447
Z"/>

</svg>
`;

    heart.style.left = Math.random() * 100 + "vw";

    const size = 12 + Math.random() * 28;

    heart.style.width = size + "px";
    heart.style.height = size + "px";

    const blur = Math.random() * 2.5;

    heart.style.filter = `
        blur(${blur}px)
        drop-shadow(0 0 10px rgba(255,120,180,.35))
    `;

    heart.style.animationDuration =
        (5 + Math.random() * 5) + "s";

    heart.style.opacity =
        0.2 + Math.random() * 0.4;

    heart.style.transform =
        `translateX(${Math.random() * 60 - 30}px)`;

    heartsContainer.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 10000);

}

setInterval(createHeart, 250);


// =============================
// Музика
// =============================

const music = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");
const equalizer = document.querySelector(".equalizer");

music.volume = 0.15;


// =============================
// Стартовий прогрес
// =============================

updateProgress();

// Кнопка

musicButton.addEventListener("click", async () => {

    if (music.paused) {

        try {

            await music.play();

        } catch (error) {

            console.error("Не вдалося відтворити музику:", error);

        }

    } else {

        music.pause();

    }

});

// Коли музика почала грати

music.addEventListener("play", () => {

    musicButton.classList.add("playing");

    equalizer.classList.add("playing");

});

// Коли музика поставлена на паузу

music.addEventListener("pause", () => {

    musicButton.classList.remove("playing");

    equalizer.classList.remove("playing");

});

openLetter.addEventListener("click", () => {

    fadeMusic(.08, 3000);


    secretOverlay.classList.remove("show");


    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });


    document.getElementById("letterPage").classList.add("active");


    setTimeout(() => {

        typeLetter();

    }, 300);


});

// =============================
// Фінальна кнопка листа
// =============================

const finishButton = document.getElementById("finishButton");


finishButton.addEventListener("click", () => {
    fadeMusic(0.05, 3000);

    finishButton.classList.add("finish-click");


    const rect = finishButton.getBoundingClientRect();


    for (let i = 0; i < 40; i++) {


        setTimeout(() => {


            const heart = document.createElement("div");


            heart.className = "finish-heart";

            heart.innerHTML = "❤️";


            heart.style.left =
                rect.left + rect.width / 2 + "px";


            heart.style.top =
                rect.top + rect.height / 2 + "px";


            heart.style.setProperty(
                "--x",
                (Math.random() * 300 - 150) + "px"
            );


            heart.style.setProperty(
                "--y",
                (Math.random() * -300 - 50) + "px"
            );


            document.body.appendChild(heart);


            setTimeout(() => {

                heart.remove();

            }, 1500);


        }, i * 30);


    }


    setTimeout(() => {

        finishButton.style.display = "none";

    }, 500);

    setTimeout(() => {

        document
            .getElementById("finalMessage")
            .classList.add("show");


    }, 2200);

});

// =============================
// Скидання прогресу
// =============================

const resetButton = document.getElementById("resetProgress");


resetButton.addEventListener("click", () => {


    if (confirm("Скинути весь прогрес проходження?")) {


        menuCards.forEach(card => {

            const page = card.dataset.page;


            localStorage.removeItem(
                "read_" + page
            );


            card.classList.remove("readed");

        });


        updateProgress();
    }


});


const declineDate = document.getElementById("declineDate");
const toast = document.getElementById("toast");

declineDate.addEventListener("click", () => {

    toast.classList.add("show");

    clearTimeout(toast.timer);

    toast.timer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);

});
