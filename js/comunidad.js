const estrellas = document.querySelectorAll(".estrella");
const inputCalificacion = document.getElementById("calificacion-oculta");

estrellas.forEach(estrella => {
    estrella.addEventListener("click", function() {
        const valor = this.getAttribute("data-valor");
        inputCalificacion.value = valor; 
        estrellas.forEach(e => {
            if (e.getAttribute("data-valor") <= valor) {
                e.classList.add("activa");
            } else {
                e.classList.remove("activa");
            }
        });
    });
});

const formResena = document.getElementById("formulario-resena");
const listaResenas = document.getElementById("lista-resenas");

formResena.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const juego = document.getElementById("juego-resena").value;
    const texto = document.getElementById("texto-resena").value;
    const calificacion = inputCalificacion.value;

    if (!calificacion) {
        alert("Por favor, selecciona una calificación con estrellas.");
        return;
    }

    let estrellasHTML = "";
    for(let i = 1; i <= 5; i++) {
        estrellasHTML += i <= calificacion ? "★" : "☆";
    }

    const nuevaResenaHTML = `
        <article class="tarjeta-resena">
            <div class="cabecera-resena">
                <h4>Diego (Tú)</h4>
                <span class="calificacion-visual">${estrellasHTML}</span>
            </div>
            <p><strong>${juego}</strong></p>
            <p>${texto}</p>
        </article>
    `;

    listaResenas.insertAdjacentHTML('afterbegin', nuevaResenaHTML);

    formResena.reset();
    inputCalificacion.value = "";
    estrellas.forEach(e => e.classList.remove("activa"));
});