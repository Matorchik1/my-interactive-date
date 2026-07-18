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

const pageOrder = [
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
    "momentsPage",
    "secretPage"
];

function markPageAsRead(pageId) {

    const card = document.querySelector(
        `.menu-card[data-page="${pageId}"]`
    );

    if (!card || card.classList.contains("readed")) {
        return;
    }

    localStorage.setItem("read_" + pageId, "true");
    card.classList.add("readed");

    updateProgress();
}

menuCards.forEach(card => {


    card.addEventListener("click", () => {


        const page = card.dataset.page;


        // записуємо що відкрили

        markPageAsRead(page);


    });


});

const secretOverlay = document.getElementById("secretOverlay");
const openLetter = document.getElementById("openLetter");

let secretOpened = false;

function updateProgress() {


    const total = menuCards.length;
    const read = document.querySelectorAll(".menu-card.readed").length;

    const percent = (read / total) * 100;

    progressFill.style.width = percent + "%";

    document.querySelectorAll(".sectionProgress").forEach(el => {

        if (read === total) {

            el.textContent = "👇 Натисни на мене";

            el.classList.add("ready");

        } else {

            el.textContent = `${read} із ${total}`;

            el.classList.remove("ready");

        }

    });

    if (read === total) {
        progressHeart.classList.add("finish");
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

function playEnding() {

    poemButton.style.display = "none";
    finishButton.style.display = "none";

    const words = document.querySelector(".floating-words");
    const text = document.querySelector(".final-text");
    const heart = document.getElementById("finalHeart");

    words.style.transition = "3s";
    text.style.transition = "3s";

    words.style.opacity = 0;
    text.style.opacity = 0;

    setTimeout(() => {
        heart.classList.add("show");
    }, 2500);

}

const letterText =
    document.getElementById("letterText");

const letterCountdown =
    document.getElementById("letterCountdown");

const finalScene =
    document.getElementById("finalScene");

const letterParagraphs =
    document.querySelectorAll("#letterSource p");


async function startLetterCountdown() {

    const values = ["3", "2", "1", "💌"];

    letterCountdown.style.display = "block";

    for (const value of values) {

        letterCountdown.textContent = value;
        letterCountdown.classList.add("show");

        await new Promise(r => setTimeout(r, 800));

        letterCountdown.classList.remove("show");

        await new Promise(r => setTimeout(r, 250));

    }

    letterCountdown.style.display = "none";

    typeLetter();

}

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

                }, 500); // пауза між абзацами


            }


        }, 25); // швидкість друку


    }


    writeParagraph();

}

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

        // Позначаємо відкриту сторінку прочитаною
        if (pageOrder.includes(nextId)) {
            markPageAsRead(nextId);
        }

        updateNavigation();

    }, 500);
}

function fadeMusic(targetVolume, time) {

    clearInterval(fadeMusic.timer);

    targetVolume = Math.max(0, Math.min(1, targetVolume));

    const steps = 30;

    const step =
        (targetVolume - music.volume) / steps;

    fadeMusic.timer = setInterval(() => {

        let nextVolume = music.volume + step;

        nextVolume = Math.max(0, Math.min(1, nextVolume));

        music.volume = nextVolume;

        if (Math.abs(music.volume - targetVolume) <= Math.abs(step)) {

            music.volume = targetVolume;

            clearInterval(fadeMusic.timer);

        }

    }, time / steps);

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
document.querySelectorAll(".page").forEach(page => {

    const prev = page.querySelector(".nav-prev");
    const menu = page.querySelector(".nav-menu");
    const next = page.querySelector(".nav-next");

    if (!prev) return;

    prev.addEventListener("click", () => {

        const index = pageOrder.indexOf(page.id);

        if (index > 0) {

            const prevPage = pageOrder[index - 1];

            showPage(page.id, prevPage);

            markPageAsRead(prevPage);

        }

    });

    next.addEventListener("click", () => {

        const index = pageOrder.indexOf(page.id);

        if (index < pageOrder.length - 1) {

            const nextPage = pageOrder[index + 1];

            showPage(page.id, nextPage);

            markPageAsRead(nextPage);

        }

    });

    menu.addEventListener("click", () => {

        showPage(page.id, "menuPage");

        setTimeout(checkSecret, 500);

    });

});

function updateNavigation() {

    const current = document.querySelector(".page.active");

    if (!current) return;

    const prev = current.querySelector(".nav-prev");
    const next = current.querySelector(".nav-next");
    const menu = current.querySelector(".nav-menu");

    if (!prev) return;

    const index = pageOrder.indexOf(current.id);

    // Перша сторінка
    prev.style.visibility = (index === 0)
        ? "hidden"
        : "visible";

    // Остання сторінка
    next.style.visibility = (index === pageOrder.length - 1)
        ? "hidden"
        : "visible";

    // Блимання "В меню" після проходження всіх розділів
    const read = document.querySelectorAll(".menu-card.readed").length;

    if (read === pageOrder.length) {

        menu.classList.add("blink");

    } else {

        menu.classList.remove("blink");

    }

}


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
const typeSound = document.getElementById("typeSound");


const musicButton = document.getElementById("musicButton");
const equalizer = document.querySelector(".equalizer");

music.volume = 0.15;
typeSound.volume = 0.08;

// =============================
// Відновлення прогресу
// =============================

menuCards.forEach(card => {

    const page = card.dataset.page;

    if (localStorage.getItem("read_" + page) === "true") {
        card.classList.add("readed");
    }

});

// =============================
// Стартовий прогрес
// =============================

updateProgress();
updateNavigation();

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

    document.querySelectorAll(".page")
        .forEach(p => p.classList.remove("active"));

    const page = document.getElementById("letterPage");

    page.classList.add("active");

    const envelope =
        document.getElementById("envelope");

    setTimeout(() => {

        envelope.classList.add("open");

    }, 700);

    setTimeout(() => {

        document
            .getElementById("envelopeScene")
            .style.opacity = 0;

    }, 3500);

    setTimeout(() => {

        document
            .getElementById("envelopeScene")
            .style.display = "none";

        startLetterCountdown();

    }, 4300);

});

// =============================
// Фінальна кнопка листа
// =============================

const finishButton = document.getElementById("finishButton");

const poemButton = document.getElementById("poemButton");
const poemModal = document.getElementById("poemModal");
const closePoem = document.getElementById("closePoem");

const finalMessage =
    document.getElementById("finalMessage");

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


        document
            .getElementById("finalMessage")
            .classList.add("show");


        poemButton.classList.remove("hidden");

        poemButton.classList.add("show");


    }, 1000);


});



// Відкрити вірш

poemButton.addEventListener("click", () => {

    poemModal.classList.add("show");

});



// Закрити вірш

closePoem.addEventListener("click", () => {

    poemModal.classList.remove("show");

    poemButton.classList.add("hidden");

    finishButton.classList.add("hidden");
    finalMessage.classList.add("hidden");
    letterText.classList.add("hidden");

    finalScene.classList.remove("hidden");
    finalScene.classList.add("show");

    poemButton.classList.remove("show");
    poemButton.classList.add("hidden");

    fadeMusic(0.02, 5000);

    setTimeout(playEnding, 9000);

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
        updateNavigation();
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

