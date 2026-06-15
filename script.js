document.addEventListener('DOMContentLoaded', () => {
    
    const formulario = document.getElementById('form-reservacion');
    const contenedorMensaje = document.getElementById('mensaje-sistema');

    formulario.addEventListener('submit', (evento) => {
        
        evento.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const contacto = document.getElementById('contacto').value.trim();
        const fecha = document.getElementById('fecha').value;
        const personasInput = document.getElementById('personas').value;
        const personas = parseInt(personasInput, 10);
        const comentarios = document.getElementById('comentarios').value.trim();

        contenedorMensaje.classList.add('oculto');
        contenedorMensaje.classList.remove('error', 'exito');

        if (nombre === "" || contacto === "" || fecha === "" || personasInput === "") {
            mostrarAlerta('Por favor, complete todos los campos obligatorios.', 'error');
            return;
        }

        if (personas <= 0 || isNaN(personas)) {
            mostrarAlerta('La cantidad de personas debe ser mayor a cero.', 'error');
            return;
        }

        const fechaSeleccionada = new Date(fecha + 'T00:00:00');
        const fechaActual = new Date();
        fechaActual.setHours(0, 0, 0, 0);

        if (fechaSeleccionada < fechaActual) {
            mostrarAlerta('La fecha seleccionada no puede ser anterior al día de hoy.', 'error');
            return;
        }

        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const regexTelefono = /^[0-9]{8}$/;

        if (!regexCorreo.test(contacto) && !regexTelefono.test(contacto)) {
            mostrarAlerta('Ingrese un correo válido o un teléfono de 8 dígitos.', 'error');
            return;
        }

        const resumenExito = `
            <strong>¡Cita Solicitada con Éxito!</strong><br><br>
            <strong>Detalles de la reservación:</strong><br>
            • Cliente: ${nombre}<br>
            • Contacto: ${contacto}<br>
            • Fecha: ${fecha}<br>
            • Personas: ${personas}<br>
            • Notas: ${comentarios ? comentarios : 'Ninguna'}
        `;

        mostrarAlerta(resumenExito, 'exito');
        formulario.reset();
    });

    function mostrarAlerta(texto, tipoClase) {
        contenedorMensaje.innerHTML = texto;
        contenedorMensaje.classList.remove('oculto');
        contenedorMensaje.classList.add(tipoClase);
    }
});