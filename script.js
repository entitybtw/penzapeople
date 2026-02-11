const peopleData = [
    {
        id: 1,
        name: "Виссарион Белинский",
        birthdate: "11 июня 1811",
        birthplace: "Пенза",
        years: "1811-1848",
        activity: "Литературный критик",
        category: "Литература",
        fame: "Критик XIX века",
        image: "images/belinsky.jpg",
        biography: `Белинский — русский литературный критик и публицист. Родился в Пензе. Оказал огромное влияние на русскую литературу.`,
        gallery: [
            "images/belinsky_1.jpg",
            "images/belinsky_2.jpg"
        ],
        audio: "audio/belinsky.mp3",
        audioTranscript: `Белинский — выдающийся литературный критик XIX века.`
    },
    {
        id: 2,
        name: "Михаил Лермонтов",
        birthdate: "15 октября 1814",
        birthplace: "Пензенская губерния",
        years: "1814-1841",
        activity: "Поэт",
        category: "Литература",
        fame: "Великий русский поэт",
        image: "images/lermontov.jpg",
        biography: `Лермонтов — русский поэт и писатель, детство связано с Пензенской губернией.`,
        gallery: [
            "images/lermontov_1.jpg",
            "images/lermontov_2.jpg"
        ],
        audio: "audio/lermontov.mp3",
        audioTranscript: `Лермонтов — один из величайших поэтов России.`
    },
    {
        id: 3,
        name: "Александр Иванович Куприн",
        birthdate: "26 августа (7 сентября) 1870",
        birthplace: "Наровчат, Пензенская область",
        years: "1870-1938",
        activity: "Писатель-реалист, прозаик, поэт, драматург, переводчик",
        category: "Литература",
        fame: "Классик русской литературы",
        image: "images/kuprin.jpg",
        biography: "Александр Куприн — русский писатель-реалист. Родился в семье чиновника. Рано потерял отца. Образование получил в Московской Разумовской школе и Александровском военном училище. Четыре года служил офицером, что дало материал для будущих книг. В 1894 году ушёл в отставку и посвятил себя литературе. Дебютировал рассказом «Последний дебют» в 1889 году. Расцвет творчества пришёлся на начало XX века. Участвовал в общественной жизни, его произведения часто поднимали остросоциальные темы. После революции эмигрировал, но в 1937 году вернулся в СССР. Скончался в Ленинграде в 1938 году.",
        gallery: [
            "images/kuprin_1.jpg",
            "images/kuprin_2.jpg"
        ],
        audio: "audio/kuprin.mp3",
        audioTranscript: "Александр Иванович Куприн — выдающийся русский писатель-реалист, автор знаменитых повестей «Поединок», «Олеся» и «Гранатовый браслет». Его творчество, известное глубоким психологизмом и состраданием к человеку, остаётся живым в многочисленных экранизациях и театральных постановках."
    }
];

let currentPerson = null;
let audioElement;

document.addEventListener("DOMContentLoaded", () => {
    audioElement = document.getElementById("real-audio");
    initCatalog();
    setupEventListeners();
    setupMobileMenu();

    if (peopleData.length > 0) selectPerson(peopleData[0].id);
    document.getElementById("people-count").textContent = peopleData.length;
});

function initCatalog() {
    const list = document.getElementById("people-list");

    peopleData.forEach(p => {
        const li = document.createElement("li");
        li.dataset.id = p.id;
        li.innerHTML = `${p.name}<span class="person-category">${p.category}</span>`;
        li.onclick = () => selectPerson(p.id);
        list.appendChild(li);
    });
}

function selectPerson(id) {
    document.querySelectorAll("#people-list li").forEach(li => {
        li.classList.toggle("active", parseInt(li.dataset.id) === id);
    });

    const p = peopleData.find(x => x.id === id);
    if (!p) return;

    currentPerson = p;
    updateTextFormat(p);
    updateAudioFormat(p);
    
    if (window.innerWidth <= 768) {
        document.getElementById("mobile-person-name").textContent = p.name;
    }
}

function updateTextFormat(p) {
    document.getElementById("person-name").textContent = p.name;
    document.getElementById("person-years").textContent = p.years;
    document.getElementById("person-birthdate").textContent = p.birthdate;
    document.getElementById("person-birthplace").textContent = p.birthplace;
    document.getElementById("person-activity").textContent = p.activity;
    document.getElementById("person-fame").textContent = p.fame;
    document.getElementById("person-biography").innerHTML = p.biography.replace(/\n/g, "<br><br>");

    const img = document.getElementById("person-image");
    img.src = p.image;

    const gal = document.getElementById("person-gallery");
    gal.innerHTML = "";

    p.gallery.forEach(src => {
        const d = document.createElement("div");
        d.className = "gallery-item";
        d.innerHTML = `<img src="${src}" alt="Фото ${p.name}">`;
        gal.appendChild(d);
    });
}

function updateAudioFormat(p) {
    document.getElementById("audio-person-name").textContent = p.name;
    document.getElementById("audio-description").textContent = `Аудиобиография ${p.name}`;
    document.getElementById("audio-transcript").innerHTML = p.audioTranscript.replace(/\n/g, "<br><br>");
    
    const audioImg = document.getElementById("audio-image");
    audioImg.src = p.image;
    audioImg.alt = p.name;

    audioElement.src = p.audio || "";

    audioElement.onloadedmetadata = () => {
        const d = convertSecondsToTime(Math.floor(audioElement.duration));
        document.getElementById("audio-duration").textContent = `Длительность: ${d}`;
        document.getElementById("total-time").textContent = d;
    };
}

function setupEventListeners() {
    document.getElementById("text-format-btn").onclick = () => {
        document.getElementById("text-format-btn").classList.add("active");
        document.getElementById("audio-format-btn").classList.remove("active");
        document.getElementById("text-content").classList.add("active");
        document.getElementById("audio-content").classList.remove("active");
    };

    document.getElementById("audio-format-btn").onclick = () => {
        document.getElementById("audio-format-btn").classList.add("active");
        document.getElementById("text-format-btn").classList.remove("active");
        document.getElementById("audio-content").classList.add("active");
        document.getElementById("text-content").classList.remove("active");
    };

    document.getElementById("play-btn").onclick = toggleAudioPlayback;
    document.getElementById("rewind-btn").onclick = () =>
        audioElement.currentTime = Math.max(0, audioElement.currentTime - 10);

    document.getElementById("forward-btn").onclick = () =>
        audioElement.currentTime = Math.min(audioElement.duration, audioElement.currentTime + 10);

    document.getElementById("volume-slider").oninput = e =>
        audioElement.volume = e.target.value / 100;

    audioElement.addEventListener("timeupdate", () => {
        const p = (audioElement.currentTime / audioElement.duration) * 100;
        document.getElementById("progress-bar").style.width = p + "%";
        document.getElementById("current-time").textContent =
            convertSecondsToTime(Math.floor(audioElement.currentTime));
    });
}

function setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const closeBtn = document.querySelector('.catalog-close');
    const catalog = document.querySelector('.catalog');
    const overlay = document.querySelector('.menu-overlay');

    function toggleMenu() {
        catalog.classList.toggle('mobile-visible');
        overlay.classList.toggle('mobile-visible');
    }

    if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
    if (closeBtn) closeBtn.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', toggleMenu);

    const catalogItems = document.querySelectorAll('.catalog li');
    catalogItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });
}

function toggleAudioPlayback() {
    const icon = document.querySelector("#play-btn i");

    if (audioElement.paused) {
        audioElement.play();
        icon.classList.replace("fa-play", "fa-pause");
    } else {
        audioElement.pause();
        icon.classList.replace("fa-pause", "fa-play");
    }
}

function convertSecondsToTime(s) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? "0" : ""}${sec}`;
}