const parametrosURL = new URLSearchParams(window.location.search);
const idJuegoActual = parametrosURL.get("id");

const imgDestacada = document.getElementById("img-destacada");
const miniaturas = document.querySelectorAll(".miniatura");
const btnAgregar = document.getElementById("btn-agregar-carrito");

function cambiarImagen(evento) {
    const miniaturaClickeada = evento.target;
    imgDestacada.src = miniaturaClickeada.src;
    miniaturas.forEach(img => img.classList.remove("activa"));
    miniaturaClickeada.classList.add("activa");
}

miniaturas.forEach(miniatura => {
    miniatura.addEventListener("click", cambiarImagen);
});

btnAgregar.addEventListener("click", () => {
    alert("¡Juego agregado a tu carrito desde detalles!");
});

if (idJuegoActual) {
    fetch('data/videojuegos.xml')
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const juegos = data.getElementsByTagName("videojuego");
            
            for (let i = 0; i < juegos.length; i++) {
                if (juegos[i].getAttribute("id") === idJuegoActual) {
                    
                    document.getElementById("det-titulo").innerText = juegos[i].getElementsByTagName("titulo")[0].textContent;
                    document.getElementById("det-genero").innerText = juegos[i].getElementsByTagName("genero")[0].textContent;
                    document.getElementById("det-precio").innerText = "$" + juegos[i].getElementsByTagName("precio")[0].textContent + " MXN";
                    document.getElementById("det-plataformas").innerText = "Plataformas: " + juegos[i].getElementsByTagName("plataformas")[0].textContent;
                    
                    const imagenXML = juegos[i].getElementsByTagName("imagen")[0].textContent;
                    imgDestacada.src = imagenXML;
                    
                    miniaturas.forEach(miniatura => {
                        miniatura.src = imagenXML;
                    });

                    break;
                }
            }
        })
        .catch(error => console.error(error));
} else {
    document.getElementById("det-titulo").innerText = "Juego no encontrado";
}