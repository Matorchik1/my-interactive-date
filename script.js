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


}

function checkSecret() {

    const total = menuCards.length;

    const read = document.querySelectorAll(
        ".menu-card.readed"
    ).length;


    if (read === total && secretReady) {


        if (!secretOpened) {

            secretOpened = true;


            setTimeout(() => {

                secretOverlay.classList.add("show");

            }, 800);

        }

    }

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

    current.classList.remove("active");

    setTimeout(() => {

        next.classList.add("active");

    }, 350);

    if (totalPages.includes(nextId)) {

        viewedPages.add(nextId);

        updateProgress();

    }
}


// =============================
// Почати
// =============================

document
    .getElementById("startButton")
    .addEventListener("click", async () => {

        try {

            await music.play();

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


        if (currentPage.id === "secretPage") {

            secretReady = true;

        }


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
// Стартовий прогрес
// =============================

updateProgress();

// =============================
// Музика
// =============================

const music = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");
const equalizer = document.querySelector(".equalizer");

// Гучність 50%
music.volume = 0.5;

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

    secretOverlay.classList.remove("show");

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById("letterPage").classList.add("active");

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