const contenedor = document.getElementById("contenedor-juegos");

// Definición del componente - plantilla javascript
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

// Función para recuperar de un XML datos
function cargarCatalogo() {
    fetch('data/videojuegos.xml')
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const juegos = data.getElementsByTagName("videojuego");
            contenedor.innerHTML = ""; // Limpiamos el texto de "Cargando..."
            
            for (let i = 0; i < juegos.length; i++) {
                let titulo = juegos[i].getElementsByTagName("titulo")[0].textContent;
                let genero = juegos[i].getElementsByTagName("genero")[0].textContent;
                let precio = juegos[i].getElementsByTagName("precio")[0].textContent;
                let imagen = juegos[i].getElementsByTagName("imagen")[0].textContent;
                let plataformas = juegos[i].getElementsByTagName("plataformas")[0].textContent;
                
                // Imprimimos la plantilla en el HTML
                contenedor.innerHTML += TarjetaVideojuego(titulo, genero, precio, imagen, plataformas);
            }
        })
        .catch(error => console.error("Error al cargar el XML:", error));
}

// Ejecutamos la función al iniciar
cargarCatalogo();