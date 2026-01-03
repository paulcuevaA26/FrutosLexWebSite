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
