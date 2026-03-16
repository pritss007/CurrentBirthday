// Photo Upload Functionality
function initPhotoUpload() {
    for (let i = 1; i <= 3; i++) {
        const photoInput = document.getElementById(`photo${i}`);
        if (!photoInput) continue;

        const photoPlaceholder = photoInput.closest('.photo');

        if (photoPlaceholder) {
            photoPlaceholder.addEventListener('click', () => {
                photoInput.click();
            });

            photoInput.addEventListener('change', (e) => {
                handlePhotoUpload(e, photoPlaceholder);
            });
        }
    }
}

function handlePhotoUpload(event, photoElement) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            // Remove placeholder
            const placeholder = photoElement.querySelector('.photo-placeholder');
            if (placeholder) {
                placeholder.style.display = 'none';
            }

            // Create or update image
            let img = photoElement.querySelector('img');
            if (!img) {
                img = document.createElement('img');
                photoElement.appendChild(img);
            }
            img.src = e.target.result;
            img.style.display = 'block';

            // Add animation
            img.style.animation = 'fadeIn 0.5s ease-in-out';
        };
        reader.readAsDataURL(file);
    }
}

// ===== CAROUSEL FUNCTIONALITY =====
let currentImageIndex = 0;

function initCarousel() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');

    if (prevBtn) prevBtn.addEventListener('click', showPreviousImage);
    if (nextBtn) nextBtn.addEventListener('click', showNextImage);
    
    indicators.forEach(indicator => {
        indicator.addEventListener('click', (e) => {
            currentImageIndex = parseInt(e.target.dataset.index);
            updateCarousel();
        });
    });

    // Optional: Auto-advance carousel every 8 seconds
    // setInterval(showNextImage, 8000);
}

function showNextImage() {
    const items = document.querySelectorAll('.carousel-item');
    currentImageIndex = (currentImageIndex + 1) % items.length;
    updateCarousel();
}

function showPreviousImage() {
    const items = document.querySelectorAll('.carousel-item');
    currentImageIndex = (currentImageIndex - 1 + items.length) % items.length;
    updateCarousel();
}

function updateCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');

    items.forEach((item, index) => {
        item.classList.remove('active');
        if (index === currentImageIndex) {
            item.classList.add('active');
        }
    });

    indicators.forEach((indicator, index) => {
        indicator.classList.remove('active');
        if (index === currentImageIndex) {
            indicator.classList.add('active');
        }
    });
}

// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        document.getElementById('nextBtn')?.click();
    } else if (e.key === 'ArrowLeft') {
        document.getElementById('prevBtn')?.click();
    }
});

// Surprise Button Click Handler
function initSurpriseButton() {
    const surpriseBtn = document.getElementById('surpriseBtn');
    const surpriseContent = document.querySelector('.surprise-content');

    if (surpriseBtn) {
        surpriseBtn.addEventListener('click', () => {
            surpriseContent.classList.toggle('hidden');
            if (!surpriseContent.classList.contains('hidden')) {
                createConfetti();
                generateBalloons();
            }
        });
    }
}

// Confetti Animation
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    if (!confettiContainer) return;

    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#fa709a', '#fee140'];

    for (let i = 0; i < 50; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.className = 'confetti-piece';
        confettiPiece.style.left = Math.random() * 100 + '%';
        confettiPiece.style.top = '-10px';
        confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confettiPiece.style.width = Math.random() * 8 + 5 + 'px';
        confettiPiece.style.height = confettiPiece.style.width;
        confettiPiece.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
        confettiPiece.style.animationDelay = Math.random() * 0.5 + 's';

        confettiContainer.appendChild(confettiPiece);

        // Remove piece after animation
        setTimeout(() => {
            confettiPiece.remove();
        }, 5000);
    }
}

// Balloon Creation on Surprise
function generateBalloons() {
    const surpriseSection = document.querySelector('.surprise');
    if (!surpriseSection) return;

    const balloonColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];

    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const balloon = document.createElement('div');
            balloon.style.position = 'fixed';
            balloon.style.width = '30px';
            balloon.style.height = '40px';
            balloon.style.borderRadius = '50% 50% 50% 0';
            balloon.style.backgroundColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
            balloon.style.left = Math.random() * window.innerWidth + 'px';
            balloon.style.top = window.innerHeight + 'px';
            balloon.style.zIndex = '9999';
            balloon.style.animation = 'balloonRise 4s ease-in forwards';
            balloon.style.pointerEvents = 'none';
            
            document.body.appendChild(balloon);

            setTimeout(() => {
                balloon.remove();
            }, 4000);
        }, i * 150);
    }
}

// Smooth scroll to sections
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for animation triggering
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .bounce').forEach(el => {
        observer.observe(el);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initPhotoUpload();
    initCarousel();
    initSurpriseButton();
    initSmoothScroll();
    createInitialConfetti();
});

// Create confetti when page loads (optional, for hero section)
function createInitialConfetti() {
    const confettiContainer = document.getElementById('confetti');
    if (!confettiContainer) return;

    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'];

    for (let i = 0; i < 30; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.className = 'confetti-piece';
        confettiPiece.style.left = Math.random() * 100 + '%';
        confettiPiece.style.top = Math.random() * 100 + '%';
        confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confettiPiece.style.width = Math.random() * 8 + 3 + 'px';
        confettiPiece.style.height = confettiPiece.style.width;
        confettiPiece.style.animationDuration = (Math.random() * 4 + 4) + 's';
        confettiPiece.style.animationDelay = Math.random() * 2 + 's';
        confettiPiece.style.opacity = Math.random() * 0.5 + 0.3;

        confettiContainer.appendChild(confettiPiece);

        // Remove piece after animation
        setTimeout(() => {
            confettiPiece.remove();
        }, 8000);
    }
}

// Add keyboard navigation for page scrolling
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        window.scrollBy(0, window.innerHeight);
    } else if (e.key === 'ArrowUp') {
        window.scrollBy(0, -window.innerHeight);
    }
});
