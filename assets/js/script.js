// Theme handling
function initTheme() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
    } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    }
}

// Función para navegar al detalle del evento
function navegarADetalle(eventoId) {
    window.location.href = `../curso-python.html?id=${eventoId}`;
}

// Función para crear una tarjeta de evento
function crearTarjetaEvento(evento) {
    const cantidadInfo = evento.tipo === 'academico-investigativo' 
        ? `<i class="fas fa-chalkboard-teacher w-5"></i><span class="ml-2 text-sm">${evento.cantidadPonencias} ponencias</span>`
        : `<i class="fas fa-chalkboard w-5"></i><span class="ml-2 text-sm">${evento.cantidadTalleres} talleres</span>`;

    return `
        <div class="group">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-200 dark:border-gray-700">
                <div class="relative aspect-video overflow-hidden">
                    <img src="${evento.imagen}" alt="${evento.titulo}" 
                         class="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <span class="absolute bottom-4 left-4 px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-white">
                        ${formatearTipo(evento.tipo)}
                    </span>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">${evento.titulo}</h3>
                    <div class="space-y-3">
                        <div class="flex items-center text-gray-600 dark:text-gray-300">
                            <i class="fas fa-calendar-alt w-5"></i>
                            <span class="ml-2 text-sm">Desde ${formatearFecha(evento.fechaInicio)}</span>
                        </div>
                        <div class="flex items-center text-gray-600 dark:text-gray-300">
                            <i class="fas fa-calendar-check w-5"></i>
                            <span class="ml-2 text-sm">Hasta ${formatearFecha(evento.fechaFin)}</span>
                        </div>
                        <div class="flex items-center text-gray-600 dark:text-gray-300">
                            <i class="fas fa-map-marker-alt w-5"></i>
                            <span class="ml-2 text-sm">${evento.lugar}</span>
                        </div>
                        <div class="flex items-center text-gray-600 dark:text-gray-300">
                            ${cantidadInfo}
                        </div>
                    </div>
                    <button onclick="navegarADetalle(${evento.id})" 
                            class="mt-6 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-xl transition-colors duration-200 flex items-center justify-center group-hover:bg-accent">
                        <span>Ver detalles</span>
                        <i class="fas fa-arrow-right ml-2 transform transition-transform group-hover:translate-x-1"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Función para formatear la fecha
function formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Función para formatear el tipo de evento
function formatearTipo(tipo) {
    const tipos = {
        'academico-investigativo': 'Académico-Investigativo',
        'capacitacion': 'Capacitación'
    };
    return tipos[tipo] || tipo;
}

// Cargar todos los eventos al inicio
function cargarEventos(filtro = 'todos') {
    const contenedor = document.getElementById('eventos-container');
    const eventosFiltrados = filtro === 'todos' 
        ? eventos 
        : eventos.filter(evento => evento.tipo === filtro);
    
    contenedor.innerHTML = eventosFiltrados
        .map(evento => crearTarjetaEvento(evento))
        .join('');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    
    // Filter buttons
    const botonesFilter = document.querySelectorAll('.filter-btn');
    botonesFilter.forEach(boton => {
        boton.addEventListener('click', () => {
            botonesFilter.forEach(b => b.classList.remove('active', 'bg-blue-50', 'dark:bg-blue-900/50', 'text-blue-700', 'dark:text-blue-300'));
            botonesFilter.forEach(b => b.classList.add('bg-gray-100', 'dark:bg-gray-700/50', 'text-gray-700', 'dark:text-gray-300'));
            
            boton.classList.remove('bg-gray-100', 'dark:bg-gray-700/50', 'text-gray-700', 'dark:text-gray-300');
            boton.classList.add('active', 'bg-blue-50', 'dark:bg-blue-900/50', 'text-blue-700', 'dark:text-blue-300');
            
            cargarEventos(boton.getAttribute('data-filter'));
        });
    });
    
    // Load initial events
    cargarEventos();
});
