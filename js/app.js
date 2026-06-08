const contenedor = document.getElementById("contenedor-juegos");
const btnFiltrar = document.getElementById("btn-filtrar");
const filtroGenero = document.getElementById("filtro-genero");
const inputBusqueda = document.getElementById("busqueda");

// Array global para guardar los juegos en memoria una vez cargados
let listaJuegos = [];

const TarjetaVideojuego = (titulo, genero, precio, imagen, plataformas) => {
    return `
        <article class="tarjeta-juego">
            <figure>
                <img src="${imagen}" alt="${titulo}">
            </figure>
            <h3>${titulo}</h3>
            <p><strong>Género:</strong> ${genero}</p>
            <p><strong>Plataformas:</strong> ${plataformas}</p>
            <p class="precio">$${precio} MXN</p>
            <button onclick="console.log('Añadido: ${titulo}')">Añadir al Carrito</button>
        </article>
    `;
}

// Carga inicial del XML
function cargarDatos() {
    fetch('data/videojuegos.xml')
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const juegosXML = data.getElementsByTagName("videojuego");
            listaJuegos = []; // Limpiamos
            
            for (let i = 0; i < juegosXML.length; i++) {
                listaJuegos.push({
                    titulo: juegosXML[i].getElementsByTagName("titulo")[0].textContent,
                    genero: juegosXML[i].getElementsByTagName("genero")[0].textContent,
                    precio: juegosXML[i].getElementsByTagName("precio")[0].textContent,
                    imagen: juegosXML[i].getElementsByTagName("imagen")[0].textContent,
                    plataformas: juegosXML[i].getElementsByTagName("plataformas")[0].textContent
                });
            }
            // Mostramos todos al arrancar
            mostrarJuegos(listaJuegos);
        })
        .catch(error => console.error("Error cargando XML:", error));
}

// Función para pintar las tarjetas filtradas
function mostrarJuegos(juegos) {
    contenedor.innerHTML = "";
    if (juegos.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron videojuegos.</p>";
        return;
    }
    juegos.forEach(j => {
        contenedor.innerHTML += TarjetaVideojuego(j.titulo, j.genero, j.precio, j.imagen, j.plataformas);
    });
}

// Función de filtrado dinámico
function filtrarJuegos() {
    const generoSeleccionado = filtroGenero.value.toLowerCase();
    const textoBuscar = inputBusqueda.value.toLowerCase().trim();

    const juegosFiltrados = listaJuegos.filter(juego => {
        const coincideGenero = generoSeleccionado === "todos" || juego.genero.toLowerCase() === generoSeleccionado;
        const coincideTexto = juego.titulo.toLowerCase().includes(textoBuscar);
        return coincideGenero && coincideTexto;
    });

    mostrarJuegos(juegosFiltrados);
}

// Eventos para que funcione al dar clic o al escribir
btnFiltrar.addEventListener("click", filtrarJuegos);
inputBusqueda.addEventListener("input", filtrarJuegos); // Búsqueda en tiempo real mientras escribe

// Iniciar app
cargarDatos();