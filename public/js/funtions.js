// Espera a que todo el contenido del HTML esté cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Obtener el botón de calcular por su ID
    const btnCalcular = document.getElementById('calculateButton');

    // Añadir un "escuchador" para el evento 'click'
    btnCalcular.addEventListener('click', function() {
        // --- 1. Obtener valores del formulario ---
        const nombre = document.getElementById('productoNombre').value;
        const precio = parseFloat(document.getElementById('productoPrecio').value);
        const tipoCliente = document.getElementById('clienteTipo').value;
        const pago = document.getElementById('formaPago').value;
        const divResultado = document.getElementById('divResultado');

        // --- Validación simple ---
        if (!nombre || isNaN(precio) || precio <= 0 || !tipoCliente || !pago) {
            // Si hay un error, muestra un mensaje de error y detente
            divResultado.classList.remove('d-none', 'alert-success');
            divResultado.classList.add('alert-danger');
            divResultado.innerHTML = '<h4 class="alert-heading">Error</h4><p>Por favor, complete todos los campos correctamente.</p>';
            return; 
        }

        // --- 2. Lógica de Descuento (if...else) ---
        let descuentoCliente = 0;

        if (tipoCliente === 'estudiante') {
            descuentoCliente = 20; // 20%
        } else if (tipoCliente === 'adulto') {
            descuentoCliente = 10; // 10%
        } else if (tipoCliente === 'jubilado') {
            descuentoCliente = 30; // 30%
        }

        // --- 3. Lógica de Descuento Adicional (Operador Ternario) ---
        // 5% si es 'efectivo', 0% en cualquier otro caso
        const descuentoAdicional = (pago === 'efectivo') ? 5 : 0;

        // --- 4. Lógica de Mensaje (switch) ---
        let mensaje = '';
        switch (tipoCliente) {
            case 'estudiante':
                mensaje = '¡Sigue estudiando duro! Tu descuento te ayuda.';
                break;
            case 'adulto':
                mensaje = '¡Gracias por tu compra! Disfruta tu producto.';
                break;
            case 'jubilado':
                mensaje = '¡Disfruta de tu merecido descuento!';
                break;
            default:
                mensaje = '¡Gracias por preferirnos!';
        }

        // --- 5. Cálculos Finales ---
        const descuentoTotal = descuentoCliente + descuentoAdicional;
        const precioFinal = precio * (1 - (descuentoTotal / 100));

        // --- 6. Mostrar Resultados en Pantalla ---
        
        // Primero, nos aseguramos de que la alerta sea de 'éxito'
        divResultado.classList.remove('alert-danger');
        divResultado.classList.add('alert-success');

        // Segundo, restauramos la estructura HTML original (en caso de que hubiera un error antes)
        // Esto es un poco más complejo, pero la forma más simple es rellenar los 'span'
        // Para este ejemplo, asumiremos que los 'span' no se borraron.
        // Si la validación falló antes, el 'innerHTML' fue reemplazado. 
        // Por simplicidad, recargaremos la estructura interna.
        divResultado.innerHTML = `
            <h4 class="alert-heading">¡Cálculo Exitoso!</h4>
            <p><strong>Producto:</strong> <span id="resultadoNombre"></span></p>
            <p><strong>Precio Original:</strong> $<span id="resultadoPrecioOriginal"></span></p>
            <p><strong>Descuento Total:</strong> <span id="resultadoDescuento"></span>%</p>
            <p><strong>Precio Final:</strong> $<span id="resultadoPrecioFinal"></span></p>
            <hr>
            <p class="mb-0"><strong>Mensaje:</strong> <span id="resultadoMensaje"></span></p>`;

        // Tercero, poblamos los 'span' con los resultados
        document.getElementById('resultadoNombre').textContent = nombre;
        document.getElementById('resultadoPrecioOriginal').textContent = precio.toFixed(2);
        document.getElementById('resultadoDescuento').textContent = descuentoTotal;
        document.getElementById('resultadoPrecioFinal').textContent = precioFinal.toFixed(2);
        document.getElementById('resultadoMensaje').textContent = mensaje;

        // Finalmente, mostramos el div de resultados
        divResultado.classList.remove('d-none');
    });
});