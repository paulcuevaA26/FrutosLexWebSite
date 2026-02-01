/* ==========================================================================
   1. CONEXIÓN GOOGLE SHEETS (TUS DATOS)
   ========================================================================== */
const hojaID = '1XDUrbpSYsMzJ3Py5ECZ6_BHb19WDQWQVnaPNaZ_jUhU';
const nombreHoja = 'productos'; // Nombre exacto de la pestaña inferior
const url = `https://opensheet.elk.sh/${hojaID}/${nombreHoja}`;

// Traer los datos
fetch(url)
    .then(respuesta => respuesta.json())
    .then(datos => {
        console.log("Datos recibidos:", datos);

        const lista = document.getElementById('lista-productos');
        if (lista) {
            lista.innerHTML = ''; // Limpia la lista por si acaso

            datos.forEach(fila => {
                const item = document.createElement('li');

                const nombre = fila.Productos || 'Producto';
                const precioKg = fila['precio x kg'] || '0.00';
                const cantidad = fila.Cantidad || '0';

                item.innerHTML = `
                    <strong>${nombre}</strong> <br>
                    💰 Precio x Kg: S/ ${precioKg} <br>
                    📦 Stock: ${cantidad} un.
                    <hr>
                `;
                lista.appendChild(item);
            });
        }
    })
    .catch(error => console.error('Error cargando datos:', error));


/* ==========================================================================
   2. MENÚ MÓVIL
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const btnMenu = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');

    if (btnMenu && mobileNav) {
        btnMenu.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
        });
    }
});


/* ==========================================================================
   3. SLIDER PRINCIPAL (BANNER)
   ========================================================================== */
let slideIndex = 0;
let slides = document.querySelectorAll(".slider-wrapper .slide");
let dots = document.querySelectorAll(".dot");
let timer;

if (slides.length > 0) {
    showSlides(slideIndex);
    startAutoSlide();
}

function showSlides(n) {
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;

    slides.forEach(slide => slide.style.display = "none");
    dots.forEach(dot => dot.classList.remove("active"));

    if (slides[slideIndex]) {
        slides[slideIndex].style.display = "block";
    }
    if (dots[slideIndex]) {
        dots[slideIndex].classList.add("active");
    }
}

function moveSlide(n) {
    clearInterval(timer);
    slideIndex += n;
    showSlides(slideIndex);
    startAutoSlide();
}

function currentSlide(n) {
    clearInterval(timer);
    slideIndex = n;
    showSlides(slideIndex);
    startAutoSlide();
}

function startAutoSlide() {
    timer = setInterval(() => {
        slideIndex++;
        showSlides(slideIndex);
    }, 4000);
}


/* ==========================================================================
   4. NUEVO CARRUSEL 3D (REEMPLAZA A SWIPER)
   ========================================================================== */
/* ==========================================================================
   4. CARRUSEL 3D SPLIT VIEW (CON DESCRIPCIÓN DINÁMICA)
   ========================================================================== */
var carousel = document.getElementById("carousel");
var currdeg = 0;
var angle = 360 / 5; // Ángulo para 5 elementos
var items = document.querySelectorAll(".item");

// Referencias al panel de información
const infoTitle = document.getElementById('info-title');
const infoDesc = document.getElementById('info-desc');
const infoContent = document.getElementById('info-content');

// Datos de los productos (En orden de aparición en el HTML)
const productosInfo = [
    {
        titulo: "Especias y Condimentos",
        desc: "Potencia el sabor de tus comidas con nuestra selección de especias naturales de la más alta calidad. Desde lo clásico hasta lo exótico.",
        link: "https://www.google.com"
    },
    {
        titulo: "Féculas y Repostería",
        desc: "Los mejores ingredientes para tus postres. Harinas, féculas y todo lo necesario para crear dulzura en tu cocina.",
        link: "#reposteria"
    },
    {
        titulo: "Frutos Secos",
        desc: "Energía natural y saludable. Una variedad premium de nueces, almendras y mix de frutos secos para tu día a día.",
        link: "#frutos-secos"
    },
    {
        titulo: "Granos y Semillas",
        desc: "Nutrición esencial. Descubre nuestra variedad de granos andinos y semillas ricas en fibra y proteínas.",
        link: "#granos"
    },
    {
        titulo: "Hierbas e Infusiones",
        desc: "Relájate y disfruta. Hierbas aromáticas seleccionadas para infusiones que reconfortan el cuerpo y el alma.",
        link: "#hierbas"
    }
];

// Inicializar SOLO si existe el carrusel
if (carousel) {
    highlightActive();

    // Rotación Automática (Opcional, para que sea más dinámico)
    let autoRotate3D = setInterval(() => {
        rotate("n");
    }, 5000); // Gira cada 5 segundos

    // Pausar rotación al pasar el mouse por el carrusel o la info
    const splitLayout = document.querySelector('.carousel-split-layout');
    if (splitLayout) {
        splitLayout.addEventListener('mouseenter', () => clearInterval(autoRotate3D));
        splitLayout.addEventListener('mouseleave', () => {
            clearInterval(autoRotate3D);
            autoRotate3D = setInterval(() => rotate("n"), 5000);
        });
    }
}

// Función de rotación
function rotate(direction) {
    if (direction == "n") {
        currdeg -= angle;
    } else if (direction == "p") {
        currdeg += angle;
    }

    if (carousel) {
        carousel.style.transform = "rotateY(" + currdeg + "deg)";
        highlightActive();
    }
}

// Función Principal: Calcula activo y actualiza info
function highlightActive() {
    // 1. Calcular índice
    let index = Math.round((-currdeg / angle) % 5);
    if (index < 0) index = 5 + index;

    // 2. Actualizar clases del carrusel
    items.forEach(item => item.classList.remove("active"));
    if (items[index]) {
        items[index].classList.add("active");

        // 3. Actualizar Panel de Información
        updateInfoPanel(index);
    }
}

function updateInfoPanel(index) {
    if (!productosInfo[index]) return;

    // Efecto de desvanecimiento simple para el texto
    infoContent.style.opacity = 0;

    setTimeout(() => {
        infoTitle.textContent = productosInfo[index].titulo;
        infoDesc.textContent = productosInfo[index].desc;

        // Actualizamos el enlace del botón
        const btnVerMas = document.querySelector('.btn-ver-mas');
        if (btnVerMas) {
            btnVerMas.href = productosInfo[index].link;
        }

        infoContent.style.opacity = 1;
    }, 300); // Espera 300ms (mitad de la transición CSS) para cambiar texto
}

// --- SOPORTE TÁCTIL Y MOUSE (DRAG) ---
let startX = 0;
let isDragging = false;
const container3D = document.querySelector('.carousel-col');

if (container3D) {
    // Configurar cursor para indicar interactividad
    container3D.style.cursor = 'grab';

    // --- EVENTOS TOUCH (Móviles) ---
    container3D.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    container3D.addEventListener('touchend', e => {
        if (!isDragging) return;
        let endX = e.changedTouches[0].clientX;
        handleSwipe(startX, endX);
        isDragging = false;
    }, { passive: true });

    // --- EVENTOS MOUSE (Desktop) ---
    container3D.addEventListener('mousedown', e => {
        startX = e.clientX;
        isDragging = true;
        container3D.style.cursor = 'grabbing';
        e.preventDefault(); // Evita selección de texto
    });

    container3D.addEventListener('mouseup', e => {
        if (!isDragging) return;
        let endX = e.clientX;
        handleSwipe(startX, endX);
        isDragging = false;
        container3D.style.cursor = 'grab';
    });

    container3D.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            container3D.style.cursor = 'grab';
        }
    });
}

function handleSwipe(start, end) {
    let diff = start - end;
    // Umbral de 50px para considerar arrastre
    if (Math.abs(diff) > 50) {
        if (diff > 0) rotate("n"); // Arrastrar a izquierda -> Siguiente
        else rotate("p");          // Arrastrar a derecha -> Anterior
    }
}