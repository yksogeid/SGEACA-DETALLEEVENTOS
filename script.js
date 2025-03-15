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

// Datos de ejemplo de eventos
const eventos = [
    {
        id: 1,
        tipo: 'academico',
        titulo: 'Seminario de Innovación Educativa',
        fecha: '2025-04-15',
        hora: '14:00',
        lugar: 'Auditorio Principal',
        imagen: 'assets/images/congreso.jpg',
        descripcion: 'Seminario enfocado en nuevas metodologías de enseñanza y tecnologías educativas.',
        ponente: 'Dra. María González',
        cupos: 50,
        duracion: '3 horas',
        requisitos: 'Docentes y personal académico',
        objetivos: [
            'Explorar nuevas metodologías de enseñanza',
            'Implementar tecnologías educativas innovadoras',
            'Mejorar la experiencia de aprendizaje del estudiante'
        ]
    },
    {
        id: 2,
        tipo: 'investigacion',
        titulo: 'Congreso de Investigación Científica',
        fecha: '2025-05-20',
        hora: '09:00',
        lugar: 'Centro de Convenciones',
        imagen: 'assets/images/congreso.jpg',
        descripcion: 'Presentación de proyectos de investigación y avances científicos.',
        ponente: 'Dr. Carlos Ramírez',
        cupos: 100,
        duracion: '2 días',
        requisitos: 'Investigadores y estudiantes de posgrado',
        objetivos: [
            'Compartir resultados de investigaciones recientes',
            'Fomentar la colaboración entre investigadores',
            'Promover la innovación científica'
        ]
    },
    {
        id: 3,
        tipo: 'capacitacion',
        titulo: 'Taller de Desarrollo Profesional',
        fecha: '2025-06-10',
        hora: '10:00',
        lugar: 'Sala de Capacitación',
        imagen: 'assets/images/congreso.jpg',
        descripcion: 'Taller práctico para el desarrollo de habilidades profesionales.',
        ponente: 'Lic. Ana Martínez',
        cupos: 30,
        duracion: '4 horas',
        requisitos: 'Personal administrativo y docente',
        objetivos: [
            'Desarrollar habilidades de liderazgo',
            'Mejorar la comunicación efectiva',
            'Fortalecer el trabajo en equipo'
        ]
    }
];

// Función para obtener el ID del evento de la URL
function obtenerEventoId() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id')) || 1; // Devolver 1 como valor predeterminado si no hay ID
}

// Función para formatear la fecha
function formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Función para capitalizar la primera letra
function capitalizarPrimeraLetra(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// Función para mostrar el detalle del evento
function mostrarDetalleEvento(evento) {
    const contenedor = document.getElementById('evento-detalle');
    
    contenedor.innerHTML = `
        <div class="relative h-96">
            <img src="${evento.imagen}" alt="${evento.titulo}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-8">
                <span class="inline-block px-3 py-1 text-sm font-semibold text-white bg-primary rounded-full mb-4">
                    ${capitalizarPrimeraLetra(evento.tipo)}
                </span>
                <h1 class="text-4xl font-bold text-white mb-2">${evento.titulo}</h1>
                <div class="flex flex-wrap gap-4 text-white/90">
                    <div class="flex items-center">
                        <i class="fas fa-calendar mr-2"></i>
                        <span>${formatearFecha(evento.fecha)}</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-clock mr-2"></i>
                        <span>${evento.hora}</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-map-marker-alt mr-2"></i>
                        <span>${evento.lugar}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-8">
            <div class="max-w-4xl mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- Información Principal -->
                    <div class="md:col-span-2 space-y-6">
                        <div>
                            <h2 class="text-2xl font-semibold mb-4 dark:text-white">Descripción</h2>
                            <p class="text-gray-600 dark:text-gray-400">${evento.descripcion}</p>
                        </div>
                        
                        <div>
                            <h2 class="text-2xl font-semibold mb-4 dark:text-white">Objetivos</h2>
                            <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                                ${evento.objetivos.map(obj => `<li>${obj}</li>`).join('')}
                            </ul>
                        </div>
                    </div>

                    <!-- Información Adicional -->
                    <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                        <h2 class="text-xl font-semibold mb-6 dark:text-white">Información del Evento</h2>
                        
                        <div class="space-y-4">
                            <div>
                                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Ponente</h3>
                                <p class="mt-1 text-gray-900 dark:text-white">${evento.ponente}</p>
                            </div>
                            
                            <div>
                                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Duración</h3>
                                <p class="mt-1 text-gray-900 dark:text-white">${evento.duracion}</p>
                            </div>
                            
                            <div>
                                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Cupos Disponibles</h3>
                                <p class="mt-1 text-gray-900 dark:text-white">${evento.cupos}</p>
                            </div>
                            
                            <div>
                                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Requisitos</h3>
                                <p class="mt-1 text-gray-900 dark:text-white">${evento.requisitos}</p>
                            </div>
                        </div>

                        <button class="w-full mt-8 px-6 py-3 bg-primary hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200">
                            Inscribirse al Evento
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

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

        // Remove active class and reset transitions
        slides.forEach(slide => {
            slide.classList.remove('active');
            // Force a reflow to restart animations
            void slide.offsetWidth;
        });
        
        dots.forEach(dot => dot.classList.remove('bg-white', 'bg-white/50'));
        
        // Add active class to trigger animations
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

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    bannerSlider.init();
});

// Global functions for navigation arrows
window.nextSlide = () => bannerSlider.nextSlide();
window.prevSlide = () => bannerSlider.prevSlide();

// Cargar el evento cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    const eventoId = obtenerEventoId();
    
    // Configurar el botón de tema oscuro
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        // Guardar la preferencia del tema
        if (document.documentElement.classList.contains('dark')) {
            localStorage.theme = 'dark';
        } else {
            localStorage.theme = 'light';
        }
    });

    // Verificar si hay un tema guardado
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }

    // Simular obtención del evento desde una API
    const evento = eventos.find(e => e.id === eventoId) || eventos[0]; // Usar el primer evento como fallback
    mostrarDetalleEvento(evento);
});
