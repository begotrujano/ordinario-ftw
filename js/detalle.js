const imgDestacada = document.getElementById("img-destacada");
const miniaturas = document.querySelectorAll(".miniatura");
const btnAgregar = document.getElementById("btn-agregar-carrito");

// Función para cambiar la imagen principal
function cambiarImagen(evento) {
    // 1. Obtener la miniatura que recibió el clic
    const miniaturaClickeada = evento.target;

    // 2. Cambiar la ruta de la imagen destacada por la ruta de la miniatura
    imgDestacada.src = miniaturaClickeada.src;

    // 3. Quitarle la clase "activa" a todas las miniaturas
    miniaturas.forEach(img => img.classList.remove("activa"));

    // 4. Ponerle la clase "activa" solo a la que clickeamos
    miniaturaClickeada.classList.add("activa");
}

// Le agregamos el evento click a cada miniatura
miniaturas.forEach(miniatura => {
    miniatura.addEventListener("click", cambiarImagen);
});

// Evento simple para el botón de compra
btnAgregar.addEventListener("click", () => {
    alert("¡Juego agregado a tu carrito!");
});