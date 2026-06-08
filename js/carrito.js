const contenedorItems = document.getElementById('items-carrito');
const totalPago = document.getElementById('total-pago');
const btnPagar = document.getElementById('btn-pagar');

function renderizarCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    contenedorItems.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        contenedorItems.innerHTML = "<p>Tu carrito está vacío. ¡Ve al catálogo a comprar algo!</p>";
        totalPago.innerText = "0.00";
        return;
    }

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        contenedorItems.innerHTML += `
            <article class="item-carrito">
                <p style="width: 40%;"><strong>${item.titulo}</strong></p>
                <p>$${item.precio.toFixed(2)}</p>
                <input type="number" value="${item.cantidad}" min="1" 
                       onchange="actualizarCantidad(${index}, this.value)">
                <p class="subtotal-item">$${subtotal.toFixed(2)}</p>
                <button onclick="eliminarDelCarrito(${index})" style="background-color: #ff4757; width: auto; padding: 5px 10px; margin: 0;">X</button>
            </article>
        `;
    });

    totalPago.innerText = total.toFixed(2);
}

window.actualizarCantidad = function(index, nuevaCantidad) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito[index].cantidad = parseInt(nuevaCantidad);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito(); // Volvemos a dibujar
}

window.eliminarDelCarrito = function(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1); // Quitamos ese elemento del arreglo
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
}

btnPagar.addEventListener('click', () => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    if (carrito.length === 0) {
        alert("Agrega juegos a tu carrito antes de pagar.");
        return;
    }

    const password = document.getElementById('password').value;
    const terminos = document.getElementById('terminos').checked;
    
    if (password.trim() === "") {
        alert("¡Falta tu NIP o CVV!");
        return;
    }
    
    if (!terminos) {
        alert("Debes aceptar los términos y condiciones.");
        return;
    }

    alert('¡Pago procesado con éxito, tus juegos están en tu perfil!');
    
    let misJuegos = JSON.parse(localStorage.getItem('misJuegos')) || [];
    misJuegos = misJuegos.concat(carrito);
    localStorage.setItem('misJuegos', JSON.stringify(misJuegos));

    localStorage.removeItem('carrito');
    document.getElementById('formulario-pago').reset();
    renderizarCarrito();
});

renderizarCarrito();