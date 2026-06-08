const botonesAcordeon = document.querySelectorAll(".acordeon-btn");

botonesAcordeon.forEach(boton => {
    boton.addEventListener("click", function() {

        this.classList.toggle("activo");

        const panel = this.nextElementSibling;

        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
});

const formTicket = document.getElementById("formulario-ticket");

formTicket.addEventListener("submit", function(evento) {

    evento.preventDefault(); 

    const descripcion = document.getElementById("descripcion").value;

    if (descripcion.trim().length < 20) {
        alert("Tu descripción es muy corta. Por favor, danos más detalles (mínimo 20 caracteres).");
    } else {
        alert("¡Ticket enviado con éxito! El equipo de soporte te contactará por correo electrónico.");
        formTicket.reset();
    }
});