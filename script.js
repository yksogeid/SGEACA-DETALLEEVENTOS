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

    // Add styles for timeline
    const timelineStyles = document.createElement('style');
    timelineStyles.textContent = `
        .timeline-dot {
            @apply w-6 h-6 bg-white dark:bg-gray-800 rounded-full border-4 border-[#4EABC4] z-10 relative;
            transition: all 0.3s ease;
        }

        .timeline-dot::before {
            content: '';
            @apply absolute w-12 h-12 bg-[#4EABC4] rounded-full opacity-0;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            transition: all 0.3s ease;
        }

        .timeline-item:hover .timeline-dot::before {
            opacity: 0.2;
            transform: translate(-50%, -50%) scale(1);
        }

        .timeline-item {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
        }

        .timeline-item.visible {
            opacity: 1;
            transform: translateY(0);
        }

        @media (max-width: 768px) {
            .timeline-item {
                position: relative;
                padding-left: 2rem;
            }

            .timeline-item::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                width: 2px;
                background: linear-gradient(to bottom, #3B93E6, #4EABC4, #61C3A1);
            }

            .timeline-dot {
                position: absolute;
                left: -0.75rem;
                top: 1.5rem;
            }
        }
    `;
    document.head.appendChild(timelineStyles);

    // Function to animate timeline items when they come into view
    function animateTimelineItems() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }

    animateTimelineItems();

    // Add styles for horizontal timeline
    const horizontalTimelineStyles = document.createElement('style');
    horizontalTimelineStyles.textContent = `
        .horizontal-timeline {
            position: relative;
            padding: 40px 80px;
            overflow: hidden;
            max-width: 100%;
            background: rgb(249 250 251 / 0.7);
            border-radius: 8px;
            transition: all 0.3s ease;
        }

        .dark .horizontal-timeline {
            background: rgb(17 24 39 / 0.7);
        }

        .timeline-container {
            display: flex;
            gap: 120px;
            overflow-x: auto;
            scroll-behavior: smooth;
            padding: 20px;
            -ms-overflow-style: none;
            scrollbar-width: none;
            margin: 0 -20px;
        }

        .timeline-container::-webkit-scrollbar {
            display: none;
        }

        .timeline-item {
            flex: 0 0 180px;
            position: relative;
            opacity: 0.6;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .timeline-item.active {
            opacity: 1;
        }

        .timeline-dot {
            width: 12px;
            height: 12px;
            background: white;
            border: 2px solid #3B93E6;
            border-radius: 50%;
            margin-bottom: 16px;
            position: relative;
            z-index: 2;
            box-shadow: 0 0 0 4px rgba(59, 147, 230, 0.2);
            transition: all 0.3s ease;
        }

        .timeline-dot::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 24px;
            height: 24px;
            background: #3B93E6;
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: -1;
        }

        .timeline-item:hover .timeline-dot::before,
        .timeline-item.active .timeline-dot::before {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.2;
        }

        .timeline-content {
            text-align: center;
            transform: translateY(0);
            transition: all 0.3s ease;
            padding-top: 12px;
        }

        .timeline-content h3 {
            font-size: 0.875rem;
            font-weight: 600;
            margin-bottom: 6px;
            color: rgb(17 24 39);
            transition: color 0.3s ease;
        }

        .dark .timeline-content h3 {
            color: rgb(249 250 251);
        }

        .timeline-content p {
            font-size: 0.75rem;
            color: rgb(75 85 99);
            max-width: 160px;
            margin: 0 auto;
            line-height: 1.4;
            transition: color 0.3s ease;
        }

        .dark .timeline-content p {
            color: rgb(156 163 175);
        }

        .timeline-nav-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: rgb(249 250 251);
            border: 1px solid #3B93E6;
            color: #3B93E6;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 2;
        }

        .dark .timeline-nav-btn {
            background: rgb(17 24 39);
        }

        .timeline-nav-btn:hover {
            background: #3B93E6;
            color: white;
        }

        .timeline-nav-btn.prev {
            left: 20px;
        }

        .timeline-nav-btn.next {
            right: 20px;
        }

        .timeline-nav-btn svg {
            width: 16px;
            height: 16px;
            stroke-width: 2.5;
        }

        .timeline-nav-btn.disabled {
            opacity: 0.5;
            cursor: not-allowed;
            pointer-events: none;
        }

        @media (max-width: 768px) {
            .horizontal-timeline {
                padding: 30px 50px;
            }

            .timeline-container {
                gap: 80px;
            }

            .timeline-item {
                flex: 0 0 140px;
            }

            .timeline-content h3 {
                font-size: 0.75rem;
            }

            .timeline-content p {
                font-size: 0.7rem;
                max-width: 120px;
            }

            .timeline-nav-btn {
                width: 24px;
                height: 24px;
            }

            .timeline-nav-btn.prev {
                left: 10px;
            }

            .timeline-nav-btn.next {
                right: 10px;
            }
        }
    `;
    document.head.appendChild(horizontalTimelineStyles);

    // Initialize timeline functionality
    function initializeTimeline() {
        const container = document.querySelector('.timeline-container');
        const items = document.querySelectorAll('.timeline-item');
        const prevBtn = document.querySelector('.timeline-nav-btn.prev');
        const nextBtn = document.querySelector('.timeline-nav-btn.next');
        const visibleItems = 4; // Number of items visible at once
        let currentIndex = 0;

        // Set initial active states
        updateActiveStates();

        // Navigation button click handlers
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                scrollToItem(currentIndex);
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < items.length - visibleItems) {
                currentIndex++;
                scrollToItem(currentIndex);
            }
        });

        // Scroll to specific item
        function scrollToItem(index) {
            const itemWidth = container.offsetWidth / visibleItems;
            const scrollLeft = index * itemWidth;
            container.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
            updateActiveStates();
        }

        // Update active states based on scroll position
        function updateActiveStates() {
            const scrollLeft = container.scrollLeft;
            const containerWidth = container.offsetWidth;

            items.forEach((item, index) => {
                const itemLeft = item.offsetLeft - container.offsetLeft;
                const itemCenter = itemLeft + (item.offsetWidth / 2);
                const isVisible = itemCenter >= scrollLeft && itemCenter <= (scrollLeft + containerWidth);
                item.classList.toggle('active', isVisible);
            });

            // Update button states
            prevBtn.classList.toggle('disabled', currentIndex === 0);
            nextBtn.classList.toggle('disabled', currentIndex >= items.length - visibleItems);
        }

        // Listen for scroll events
        container.addEventListener('scroll', () => {
            const itemWidth = container.offsetWidth / visibleItems;
            currentIndex = Math.round(container.scrollLeft / itemWidth);
            updateActiveStates();
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            const itemWidth = container.offsetWidth / visibleItems;
            scrollToItem(currentIndex);
        });

        // Initial active state
        items[0].classList.add('active');
    }

    initializeTimeline();

    // Global functions for navigation arrows
    window.nextSlide = () => bannerSlider.nextSlide();
    window.prevSlide = () => bannerSlider.prevSlide();
});
