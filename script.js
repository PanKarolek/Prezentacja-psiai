const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentSpan = document.getElementById('current');
const totalSpan = document.getElementById('total');
const progressBar = document.getElementById('progressBar');

// Tworzymy unikalny klucz dla danej strony HTML, żeby zapis slajdów się nie mieszał
const storageKey = 'currentSlideIndex_' + window.location.pathname.split('/').pop();

if (totalSpan) {
    totalSpan.innerText = slides.length;
}

const savedIndex = parseInt(localStorage.getItem(storageKey), 10);
let currentSlideIndex = (!isNaN(savedIndex) && savedIndex >= 0 && savedIndex < slides.length) ? savedIndex : 0;

function updateProgress() {
    if (slides.length === 0) return;
    const progressPercentage = ((currentSlideIndex + 1) / slides.length) * 100;
    if (progressBar) {
        progressBar.style.width = progressPercentage + '%';
    }
}

function showSlide(index) {
    if (slides.length === 0) return;

    if (index < 0) {
        currentSlideIndex = 0;
    } else if (index >= slides.length) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }

    localStorage.setItem(storageKey, currentSlideIndex);

    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    slides[currentSlideIndex].classList.add('active');

    if (currentSpan) {
        currentSpan.innerText = currentSlideIndex + 1;
    }

    updateProgress();

    // Ukrywamy rozwiązanie przy przechodzeniu między slajdami
    const solutionBox = document.getElementById('solutionBox');
    const revealBtn = document.getElementById('revealBtn');
    if (solutionBox && revealBtn) {
        solutionBox.style.display = 'none';
        revealBtn.innerHTML = '<span class="material-symbols-outlined">visibility</span> Pokaż rozwiązanie';
    }

    if (window.Prism) {
        Prism.highlightAll();
    }
}

if (slides.length > 0) {
    showSlide(currentSlideIndex);

    if (nextBtn) {
        nextBtn.addEventListener('click', () => showSlide(currentSlideIndex + 1));
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => showSlide(currentSlideIndex - 1));
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            showSlide(currentSlideIndex + 1);
        } else if (event.key === 'ArrowLeft') {
            showSlide(currentSlideIndex - 1);
        }
    });
}

// Logika resetu linku z prezentacji o pseudoklasach
const resetLinkBtn = document.getElementById('resetLinkBtn');
const interactiveLink = document.getElementById('interactiveLink');

if (resetLinkBtn && interactiveLink) {
    resetLinkBtn.addEventListener('click', () => {
        interactiveLink.href = `super-strona.html?reset=${Date.now()}`;
    });
}

// Logika przycisku pokazującego zadanie
const revealBtn = document.getElementById('revealBtn');
const solutionBox = document.getElementById('solutionBox');

if (revealBtn && solutionBox) {
    revealBtn.addEventListener('click', () => {
        // Poprawiony warunek omijający błąd z odczytem stylów CSS
        if (solutionBox.style.display === 'block') {
            solutionBox.style.display = 'none';
            revealBtn.innerHTML = '<span class="material-symbols-outlined">visibility</span> Pokaż rozwiązanie';
        } else {
            solutionBox.style.display = 'block';
            revealBtn.innerHTML = '<span class="material-symbols-outlined">visibility_off</span> Ukryj rozwiązanie';
        }
    });
}