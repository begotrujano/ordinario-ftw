const imgDestacada = document.getElementById("img-destacada");
const miniaturas = document.querySelectorAll(".miniatura");
const btnAgregar = document.getElementById("btn-agregar-carrito");
const parametrosURL = new URLSearchParams(window.location.search);
const idJuegoActual = parametrosURL.get("id");

if (idJuegoActual) {
    fetch('data/videojuegos.xml')
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const juegos = data.getElementsByTagName("videojuego");
            
            // Buscamos el juego que coincida con el ID de la URL
            for (let i = 0; i < juegos.length; i++) {
                if (juegos[i].getAttribute("id") === idJuegoActual) {
                    
                    // Llenamos los datos en el HTML
                    document.getElementById("det-titulo").innerText = juegos[i].getElementsByTagName("titulo")[0].textContent;
                    document.getElementById("det-genero").innerText = juegos[i].getElementsByTagName("genero")[0].textContent;
                    document.getElementById("det-precio").innerText = "$" + juegos[i].getElementsByTagName("precio")[0].textContent + " MXN";
                    document.getElementById("det-plataformas").innerText = "Plataformas: " + juegos[i].getElementsByTagName("plataformas")[0].textContent;
                    
                    // Actualizamos la imagen principal y la primera miniatura
                    const imagenXML = juegos[i].getElementsByTagName("imagen")[0].textContent;
                    document.getElementById("img-destacada").src = imagenXML;
                    document.querySelector(".miniatura").src = imagenXML; // Cambia la primera miniatura
                    break;
                }
            }
        })
        .catch(error => console.error("Error cargando detalles del XML:", error));
} else {
    document.getElementById("det-titulo").innerText = "Juego no encontrado";
}
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