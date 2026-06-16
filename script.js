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
            mostrarAlerta('<strong>Campos incompletos:</strong> Por favor, llene todos los espacios requeridos marcados con (*).', 'error');
            return;
        }

        if (personas <= 0 || isNaN(personas)) {
            mostrarAlerta('<strong>Cantidad incorrecta:</strong> El número de asistentes para la reservación debe ser mayor a cero.', 'error');
            return;
        }

        const fechaSeleccionada = new Date(fecha + 'T00:00:00');
        const fechaActual = new Date();
        fechaActual.setHours(0, 0, 0, 0);

        if (fechaSeleccionada < fechaActual) {
            mostrarAlerta('<strong>Fecha inválida:</strong> No es posible programar citas para días del pasado. Seleccione hoy o una fecha futura.', 'error');
            return;
        }

        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const regexTelefono = /^[0-9]{8,}$/;

        if (!regexCorreo.test(contacto) && !regexTelefono.test(contacto)) {
            mostrarAlerta('<strong>Contacto inválido:</strong> Ingrese un correo electrónico real o un número telefónico válido de mínimo 8 dígitos.', 'error');
            return;
        }

        const resumenExito = `
            <strong>¡Cita Solicitada con Éxito!</strong><br><br>
            <strong>Resumen de tu espacio en el Studio:</strong><br>
            • Cliente: ${nombre}<br>
            • Medio de contacto: ${contacto}<br>
            • Fecha agendada: ${fecha}<br>
            • Cantidad de personas: ${personas}<br>
            • Detalles o notas: ${comentarios ? comentarios : 'Ninguno especificado'}
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