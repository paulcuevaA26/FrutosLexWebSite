// 1. Tus datos reales
const hojaID = '1XDUrbpSYsMzJ3Py5ECZ6_BHb19WDQWQVnaPNaZ_jUhU';
const nombreHoja = 'productos'; // Nombre exacto de la pestaña inferior

// 2. La URL de conexión
const url = `https://opensheet.elk.sh/${hojaID}/${nombreHoja}`;

// 3. Traer los datos
fetch(url)
  .then(respuesta => respuesta.json())
.then(datos => {
console.log("Datos recibidos:", datos); // Muestra los datos en la consola para verificar

const lista = document.getElementById('lista-productos');
lista.innerHTML = ''; // Limpia la lista por si acaso

datos.forEach(fila => {
const item = document.createElement('li');

// OJO AQUÍ: Usamos ['Nombre Columna'] cuando hay espacios
const nombre = fila.Productos; 
const precioKg = fila['precio x kg']; 
const cantidad = fila.Cantidad;

// Diseñamos cómo se ve cada producto
item.innerHTML = `
<strong>${nombre}</strong> <br>
💰 Precio x Kg: S/ ${precioKg} <br>
📦 Stock: ${cantidad} un.
<hr>
`;

lista.appendChild(item);
});
  })
.catch(error => console.error('Error cargando datos:', error));



document.addEventListener('DOMContentLoaded', () => {
    const btnMenu = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');

    // Función para alternar el menú
    btnMenu.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
    });
});


// --- MENÚ MÓVIL ---
document.addEventListener('DOMContentLoaded', () => {
    const btnMenu = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    if(btnMenu && mobileNav){
        btnMenu.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
        });
    }
});

// --- SLIDER PRINCIPAL (BANNER) ---
let slideIndex = 0;
let slides = document.querySelectorAll(".slider-wrapper .slide");
let dots = document.querySelectorAll(".dot");
let timer;

if(slides.length > 0){
    showSlides(slideIndex);
    startAutoSlide();
}

function showSlides(n) {
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;
    
    slides.forEach(slide => slide.style.display = "none");
    dots.forEach(dot => dot.classList.remove("active"));
    
    slides[slideIndex].style.display = "block";
    dots[slideIndex].classList.add("active");
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

/* --- CONFIGURACIÓN CARRUSEL 3D (SWIPER) --- */
/* ¡AQUÍ ESTÁ LA MAGIA! NO CAMBIES ESTOS VALORES */
/* --- CONFIGURACIÓN CARRUSEL 3D (ESTABILIZADA) --- */

var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    
    /* CAMBIO CLAVE 1: Usamos '3' en lugar de 'auto'.
       Esto fuerza la simetría perfecta: 1 al centro, 1 a cada lado. */
    slidesPerView: 3, 
    
    loop: true, // Ahora funcionará perfecto porque duplicaste los ítems
    
    coverflowEffect: {
        rotate: 30,         /* Bajamos la rotación para que no se vea tan "caótico" */
        stretch: 10,        /* CAMBIO CLAVE 2: Pon 0 o 10 positivo para separarlas un poco y ordenarlas */
        depth: 200,         /* Profundidad estándar */
        modifier: 1,
        slideShadows: true,
    },
    
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    
    /* Esto ayuda a que el clic sea preciso */
    slideToClickedSlide: true, 
});