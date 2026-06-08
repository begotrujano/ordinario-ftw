function abrirPestana(evento, nombrePestana) {

    const contenidos = document.querySelectorAll(".tab-contenido");
    contenidos.forEach(contenido => {
        contenido.style.display = "none";
    });

  
    const botones = document.querySelectorAll(".tab-btn");
    botones.forEach(boton => {
        boton.classList.remove("activo");
    });

    document.getElementById(nombrePestana).style.display = "block";

    evento.currentTarget.classList.add("activo");
}