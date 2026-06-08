const cuerpoTabla = document.getElementById("cuerpo-tabla");

window.eliminarFila = function(boton, titulo) {
    if(confirm('¿Seguro que deseas eliminar ' + titulo + ' del inventario?')) {
        const fila = boton.closest('tr');
        fila.remove();
    }
}

const FilaVideojuego = (id, titulo, genero, plataformas, precio) => {
    return `
        <tr>
            <td>${id}</td>
            <td><strong>${titulo}</strong></td>
            <td>${genero}</td>
            <td>${plataformas}</td>
            <td>$${precio}</td>
            <td><button class="btn-accion" onclick="eliminarFila(this, '${titulo}')">Eliminar</button></td>
        </tr>
    `;
}

function cargarTablaAdmin() {
    fetch('data/videojuegos.xml')
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const juegos = data.getElementsByTagName("videojuego");
            cuerpoTabla.innerHTML = ""; 
            
            for (let i = 0; i < juegos.length; i++) {
                let id = juegos[i].getAttribute("id"); 
                let titulo = juegos[i].getElementsByTagName("titulo")[0].textContent;
                let genero = juegos[i].getElementsByTagName("genero")[0].textContent;
                let plataformas = juegos[i].getElementsByTagName("plataformas")[0].textContent;
                let precio = juegos[i].getElementsByTagName("precio")[0].textContent;
                
                cuerpoTabla.innerHTML += FilaVideojuego(id, titulo, genero, plataformas, precio);
            }
        })
        .catch(error => {
            console.error(error);
            cuerpoTabla.innerHTML = "<tr><td colspan='6'>Error cargando datos.</td></tr>";
        });
}

cargarTablaAdmin();