function abrirPestana(evento, nombrePestana) {
    const contenidos = document.querySelectorAll(".tab-contenido");
    contenidos.forEach(contenido => contenido.style.display = "none");

    const botones = document.querySelectorAll(".tab-btn");
    botones.forEach(boton => boton.classList.remove("activo"));

    document.getElementById(nombrePestana).style.display = "block";
    evento.currentTarget.classList.add("activo");
}

function cargarMisJuegos() {
    const contenedor = document.querySelector("#mis-juegos .grid-juegos");
    let comprados = JSON.parse(localStorage.getItem('misJuegos')) || [];
    
    if(comprados.length === 0) {
        contenedor.innerHTML = "<p>Aún no tienes juegos. ¡Ve al catálogo y compra algunos!</p>";
        return;
    }
    
    contenedor.innerHTML = "";
    comprados.forEach(juego => {
        contenedor.innerHTML += `
            <article class="tarjeta-juego">
                <img src="${juego.imagen}" alt="${juego.titulo}" style="width:100%; border-radius: 10px;">
                <h4>${juego.titulo}</h4>
            </article>
        `;
    });
}

cargarMisJuegos();