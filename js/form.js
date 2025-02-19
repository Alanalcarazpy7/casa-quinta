$(document).ready(function () {
  // Inicializar datepicker en los inputs de fecha
  $(".datepicker").datepicker({
    format: "dd/mm/yyyy",
    autoclose: true,
    todayHighlight: true,
    startDate: new Date(), // Esto asegura que no se puedan seleccionar fechas pasadas
    language: "es",
  });

  // Evento al hacer clic en el botón "Reservar ahora"
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("book_btn")) {
      e.preventDefault();

      // Obtener valores del formulario
      const fechaEntrada = document.getElementById("fecha_llegada").value;
      const fechaSalida = document.getElementById("fecha_salida").value;
      const personas = document.getElementById("personas").value;
      const comentarios =
        document.getElementById("comentarios").value || "Ninguno";
      //console.log(fechaEntrada);
      //console.log(fechaSalida);
      // Validaciones
      if (!fechaEntrada || !fechaSalida) {
        alert("Por favor, complete ambas fechas.");
        return;
      }
      
      // Validar que la fecha de entrada no sea posterior a la fecha de salida
      const fechaEntradaObj = new Date(
        fechaEntrada.split("/").reverse().join("-")
      );
      const fechaSalidaObj = new Date(
        fechaSalida.split("/").reverse().join("-")
      );

      if (fechaEntradaObj >= fechaSalidaObj) {
        alert("La fecha de llegada debe ser menor a la fecha de salida.");
        return;
      }

      // Validar que la fecha de entrada no sea pasada
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      if (fechaEntradaObj < hoy) {
        alert(
          "La fecha de llegada no puede ser menor o igual a la fecha actual."
        );
        return;
      }

      // Validar el número de personas
      if (!personas || personas < 1 || personas > 30) {
        alert("Ingrese un número válido de personas (entre 1 y 30).");
        return;
      }

      console.log(fechaEntrada, fechaSalida, personas, comentarios);

      // Construcción del mensaje de WhatsApp
      const mensaje = `Hola, me gustaría reservar la casa quinta con los siguientes datos:%0A
        *Fecha de llegada:* ${fechaEntrada}%0A
        *Fecha de salida:* ${fechaSalida}%0A
        *Número de personas:* ${personas}%0A
        *Comentarios adicionales:* ${comentarios}`;

      // Número de WhatsApp del hotel
      const numeroWhatsApp = "595982880043";

      // Redirigir a WhatsApp con el mensaje prellenado
      window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, "_blank");
    }
  });
});
