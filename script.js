const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentSpan = document.getElementById('current');
const totalSpan = document.getElementById('total');
const progressBar = document.getElementById('progressBar');

totalSpan.innerText = slides.length;

const savedIndex = parseInt(localStorage.getItem('currentSlideIndex'), 10);
let currentSlideIndex = (!isNaN(savedIndex) && savedIndex >= 0 && savedIndex < slides.length) ? savedIndex : 0;

function updateProgress() {
    const progressPercentage = ((currentSlideIndex + 1) / slides.length) * 100;
    progressBar.style.width = progressPercentage + '%';
}

function showSlide(index) {
    if (index < 0) {
        currentSlideIndex = 0;
    } else if (index >= slides.length) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }

    localStorage.setItem('currentSlideIndex', currentSlideIndex);

    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    slides[currentSlideIndex].classList.add('active');
    currentSpan.innerText = currentSlideIndex + 1;

    updateProgress();

    if (window.Prism) {
        Prism.highlightAll();
    }
}

showSlide(currentSlideIndex);

nextBtn.addEventListener('click', () => {
    showSlide(currentSlideIndex + 1);
});

prevBtn.addEventListener('click', () => {
    showSlide(currentSlideIndex - 1);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        showSlide(currentSlideIndex + 1);
    } else if (event.key === 'ArrowLeft') {
        showSlide(currentSlideIndex - 1);
    }
});

const resetLinkBtn = document.getElementById('resetLinkBtn');
const interactiveLink = document.getElementById('interactiveLink');

if (resetLinkBtn && interactiveLink) {
    resetLinkBtn.addEventListener('click', () => {
        interactiveLink.href = `super-strona.html?reset=${Date.now()}`;
    });
}