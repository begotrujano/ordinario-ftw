const inputsCantidad = document.querySelectorAll('.cantidad-item');
const totalPago = document.getElementById('total-pago');
const btnPagar = document.getElementById('btn-pagar');


function calcularTotal() {
    let total = 0;
    
    inputsCantidad.forEach(input => {
        const precio = parseFloat(input.getAttribute('data-precio'));
        const cantidad = parseInt(input.value);
        const subtotal = precio * cantidad;
        
        // Actualizamos el texto del subtotal de esa fila
        input.nextElementSibling.innerText = `$${subtotal.toFixed(2)}`;
        total += subtotal;
    });
    
    totalPago.innerText = total.toFixed(2);
}

inputsCantidad.forEach(input => {
    input.addEventListener('input', calcularTotal);
});

btnPagar.addEventListener('click', () => {
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

    alert('¡Pago procesado con éxito, gracias por tu compra!');
});