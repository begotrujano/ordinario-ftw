const contenedor = document.getElementById("contenedor-juegos");
const btnFiltrar = document.getElementById("btn-filtrar");
const filtroGenero = document.getElementById("filtro-genero");
const inputBusqueda = document.getElementById("busqueda");

let listaJuegos = [];

// 1. Aquí recibimos el 'id' como primer parámetro
const TarjetaVideojuego = (id, titulo, genero, precio, imagen, plataformas) => {
    return `
        <article class="tarjeta-juego">
            <a href="detalle.html?id=${id}">
                <figure>
                    <img src="${imagen}" alt="${titulo}">
                </figure>
            </a>
            <h3>${titulo}</h3>
            <p><strong>Género:</strong> ${genero}</p>
            <p><strong>Plataformas:</strong> ${plataformas}</p>
            <p class="precio">$${precio} MXN</p>
            <button onclick="console.log('Añadido: ${titulo}')">Añadir al Carrito</button>
            <a href="detalle.html?id=${id}" style="display:block; margin-top:10px; color: var(--acento-neon); text-decoration: none;">Ver Detalles</a>
        </article>
    `;
}

function cargarDatos() {
    fetch('data/videojuegos.xml')
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const juegosXML = data.getElementsByTagName("videojuego");
            listaJuegos = []; 
            
            for (let i = 0; i < juegosXML.length; i++) {
                listaJuegos.push({
                    id: juegosXML[i].getAttribute("id"), // 2. Aquí leemos el ID del XML
                    titulo: juegosXML[i].getElementsByTagName("titulo")[0].textContent,
                    genero: juegosXML[i].getElementsByTagName("genero")[0].textContent,
                    precio: juegosXML[i].getElementsByTagName("precio")[0].textContent,
                    imagen: juegosXML[i].getElementsByTagName("imagen")[0].textContent,
                    plataformas: juegosXML[i].getElementsByTagName("plataformas")[0].textContent
                });
            }
            mostrarJuegos(listaJuegos);
        })
        .catch(error => console.error("Error cargando XML:", error));
}

function mostrarJuegos(juegos) {
    contenedor.innerHTML = "";
    if (juegos.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron videojuegos.</p>";
        return;
    }
    juegos.forEach(j => {
        // 3. Y aquí le inyectamos el j.id a la tarjeta cuando se dibuja
        contenedor.innerHTML += TarjetaVideojuego(j.id, j.titulo, j.genero, j.precio, j.imagen, j.plataformas);
    });
}

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

btnFiltrar.addEventListener("click", filtrarJuegos);
inputBusqueda.addEventListener("input", filtrarJuegos);

cargarDatos();