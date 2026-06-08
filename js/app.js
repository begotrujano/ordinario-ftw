const contenedor = document.getElementById("contenedor-juegos");
const btnFiltrar = document.getElementById("btn-filtrar");
const filtroGenero = document.getElementById("filtro-genero");
const inputBusqueda = document.getElementById("busqueda");

let listaJuegos = [];

window.agregarAlCarrito = function(id, titulo, precio, imagen) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const existe = carrito.find(item => item.id === id);
    
    if(existe) {
        existe.cantidad += 1;
    } else {
        carrito.push({ id, titulo, precio: parseFloat(precio), cantidad: 1, imagen: imagen });
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert("🛒 ¡" + titulo + " añadido al carrito!");
}

const TarjetaVideojuego = (id, titulo, genero, precio, imagen, plataformas) => {
    return `
        <article class="tarjeta-juego">
            <a href="detalle.html?id=${id}">
                <figure>
                    <img src="${imagen}" alt="${titulo}">
                </figure>
            </a>
            <div class="info-tarjeta">
                <h3>${titulo}</h3>
                <p class="plataformas-txt">🎮 ${plataformas}</p>
                <div class="precio-row">
                    <span class="precio">$${precio}</span>
                    <button class="btn-azul" onclick="agregarAlCarrito('${id}', '${titulo}', ${precio}, '${imagen}')">AGREGAR</button>
                </div>
            </div>
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
                    id: juegosXML[i].getAttribute("id"),
                    titulo: juegosXML[i].getElementsByTagName("titulo")[0].textContent,
                    genero: juegosXML[i].getElementsByTagName("genero")[0].textContent,
                    precio: juegosXML[i].getElementsByTagName("precio")[0].textContent,
                    imagen: juegosXML[i].getElementsByTagName("imagen")[0].textContent,
                    plataformas: juegosXML[i].getElementsByTagName("plataformas")[0].textContent
                });
            }
            mostrarJuegos(listaJuegos);
        })
        .catch(error => console.error(error));
}

function mostrarJuegos(juegos) {
    contenedor.innerHTML = "";
    if (juegos.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron videojuegos.</p>";
        return;
    }
    juegos.forEach(j => {
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