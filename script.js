// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileDropdowns = document.querySelectorAll('#mobile-menu .relative');

    // Toggle mobile menu with slide animation
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        // Add slide animation after removing hidden to trigger transition
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.style.maxHeight = '0';
            requestAnimationFrame(() => {
                mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
            });
        } else {
            mobileMenu.style.maxHeight = '0';
        }
    });

    // Handle mobile dropdowns
    mobileDropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('button');
        const content = dropdown.querySelector('div');
        const icon = button.querySelector('i');

        button.addEventListener('click', () => {
            // Close other dropdowns
            mobileDropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    const otherContent = otherDropdown.querySelector('div');
                    const otherIcon = otherDropdown.querySelector('i');
                    otherContent.classList.add('hidden');
                    otherIcon.classList.remove('fa-chevron-up');
                    otherIcon.classList.add('fa-chevron-down');
                }
            });

            // Toggle current dropdown
            content.classList.toggle('hidden');
            if (!content.classList.contains('hidden')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            mobileMenu.style.maxHeight = '0';
            
            // Reset all dropdowns
            mobileDropdowns.forEach(dropdown => {
                const content = dropdown.querySelector('div');
                const icon = dropdown.querySelector('i');
                content.classList.add('hidden');
                icon.style.transform = 'rotate(0deg)';
            });
        }
    });
});

// Banner slider functionality
const bannerSlider = {
    currentSlide: 0,
    slides: [
        {
            image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1920',
            title: 'Bienvenido a SGEACA',
            description: 'Sistema de Gestión de Eventos Académicos y Control de Asistencia',
            buttonText: 'Inscríbete Ahora',
            buttonLink: '/inscripcion'
        },
        {
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920',
            title: 'Gestiona tus Eventos',
            description: 'Organiza y controla la asistencia de tus eventos académicos',
            buttonText: 'Ver Calendario',
            buttonLink: '/calendario'
        },
        {
            image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1920',
            title: 'Únete a la Comunidad',
            description: 'Participa en eventos académicos y comparte conocimiento',
            buttonText: 'Conoce Más',
            buttonLink: '/comites'
        }
    ],
    init() {
        this.preloadImages().then(() => {
            this.createSlides();
            this.showSlide(0);
            this.startAutoSlide();
            this.setupDots();
        });
    },
    preloadImages() {
        const imagePromises = this.slides.map(slide => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = reject;
                img.src = slide.image;
            });
        });
        return Promise.all(imagePromises);
    },
    createSlides() {
        const slider = document.getElementById('banner-slider');
        if (!slider) return;

        slider.innerHTML = this.slides.map((slide, index) => `
            <div class="slide absolute inset-0">
                <img src="${slide.image}" alt="Banner ${index + 1}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-black/40">
                    <div class="container mx-auto px-4 h-full flex items-center">
                        <div class="max-w-2xl text-white">
                            <h1 class="text-5xl font-bold mb-4">${slide.title}</h1>
                            <p class="text-xl mb-8">${slide.description}</p>
                            <a href="${slide.buttonLink}" class="inline-block px-6 py-3 bg-[#FF9F3F] text-white rounded-md hover:bg-[#ff8c1a] transition-colors duration-200">
                                ${slide.buttonText}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    },
    showSlide(index) {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.bottom-8 button');
        if (!slides.length || !dots.length) return;

        slides.forEach(slide => {
            slide.classList.remove('active');
            void slide.offsetWidth;
        });
        
        dots.forEach(dot => dot.classList.remove('bg-white', 'bg-white/50'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('bg-white');
        dots.forEach((dot, i) => {
            if (i !== index) dot.classList.add('bg-white/50');
        });
        
        this.currentSlide = index;
    },
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(nextIndex);
    },
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex);
    },
    setupDots() {
        const dots = document.querySelectorAll('.bottom-8 button');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.showSlide(index));
        });
    },
    startAutoSlide() {
        setInterval(() => this.nextSlide(), 5000);
    }
};

// Stats animation
function animateStats() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElement = entry.target;
                const targetNumber = parseInt(numberElement.getAttribute('data-target'));
                animateNumber(numberElement, targetNumber);
                observer.unobserve(numberElement);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-target]').forEach(el => observer.observe(el));
}

function animateNumber(element, target) {
    let current = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const animate = () => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
        } else {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(animate);
        }
    };
    
    animate();
}

// Countdown Timer Configuration
const EVENT_DATE = '2025-03-20T23:59:59-05:00'; // Set your event date here

// Countdown Timer Logic
function updateCountdown() {
    const now = new Date().getTime();
    const eventDate = new Date(EVENT_DATE).getTime();
    const timeLeft = eventDate - now;

    // If event has passed, stop countdown
    if (timeLeft < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    // Calculate time units
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Update DOM with padded numbers
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    // Add animation class for seconds change
    document.getElementById('seconds').classList.add('number-updated');
    setTimeout(() => {
        document.getElementById('seconds').classList.remove('number-updated');
    }, 300);
}

// Initialize countdown
document.addEventListener('DOMContentLoaded', () => {
    bannerSlider.init();
    animateStats();
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        if (document.documentElement.classList.contains('dark')) {
            localStorage.theme = 'dark';
        } else {
            localStorage.theme = 'light';
        }
    });

    // Check saved theme
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }

    // Add CSS for countdown animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes numberUpdate {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .number-updated {
            animation: numberUpdate 0.3s ease-in-out;
        }
        
        .countdown-item {
            transition: transform 0.3s ease-in-out;
        }
        
        .countdown-item:hover {
            transform: translateY(-5px);
        }
    `;
    document.head.appendChild(style);
});

// Global functions for navigation arrows
window.nextSlide = () => bannerSlider.nextSlide();
window.prevSlide = () => bannerSlider.prevSlide();
