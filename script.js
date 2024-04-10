// JavaScript para ocultar o mostrar la barra de inicio al hacer scroll
        var lastScrollTop = 0;
        var header = document.getElementById("header");

        window.addEventListener("scroll", function() {
            var currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            if (currentScroll > lastScrollTop) {
                header.style.top = "-80px"; // Ocultar la barra de inicio al hacer scroll hacia abajo
            } else {
                header.style.top = "0"; // Mostrar la barra de inicio al hacer scroll hacia arriba
            }
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Para dispositivos móviles
        });



// Función para simular el seguimiento del documento
function trackDocument() {
    var imageContainer = document.getElementById("imageContainer");
    var trackingNumber = document.getElementById("trackingNumber").value;
    var resultElement = document.getElementById("result");

    // Simulación de datos de seguimiento
    var trackingData = {
        "123456789": "Comprado",
        "987654321": "Compras",
        "456789123": "Direccion",
        // Agrega más números de seguimiento y estados aquí
    };

    var requisitionStatus = trackingData[trackingNumber];

    if (requisitionStatus) {
        resultElement.textContent = "Estado del documento: " + requisitionStatus;

        // URL base para las imágenes
        var baseUrl = "file:///C:/Users/heimena/Desktop/TRACKING/img/";

        // Determinar la URL de la imagen según el estado de la requisición
        var imageUrl;
        switch (requisitionStatus) {
            case "Direccion":
                imageUrl = baseUrl + "Direccion.png";
                break;
            case "Compras":
                imageUrl = baseUrl + "Compras.png";
                break;
            case "Planeacion":
                imageUrl = baseUrl + "Planeacion.png";
                break;
            case "Comprado":
                imageUrl = baseUrl + "Comprado.png";
                break;
            case "Enviado":
                imageUrl = baseUrl + "Enviado.png";
                break;
            case "Recibido":
                imageUrl = baseUrl + "Recibido.png";
                break;
            default:
                imageUrl = baseUrl + "Default.png";
        }
    } else {
        resultElement.textContent = "Número de folio no encontrado";
        imageUrl = baseUrl + "Default.png";
    }

    // Crear elemento de imagen y establecer la URL
    var imageElement = document.createElement("img");
    imageElement.src = imageUrl;

    // Limpiar el contenedor de imágenes y agregar la nueva imagen
    imageContainer.innerHTML = "";
    imageContainer.appendChild(imageElement);
}

// Obtener referencia al botón de guardar datos
var guardarDatosButton = document.getElementById("guardarDatos");

// Agregar un controlador de eventos al botón de guardar datos
guardarDatosButton.addEventListener("click", function() {
    // Obtener los datos del formulario
    var formData = new FormData(document.getElementById("altaForm"));

    // Crear un objeto para el nuevo folio con número, departamento y estado
    var nuevoFolio = {
        folio: formData.get('trackingNumber'),
        departamento: formData.get('Departamento'),
        estado: 'Default' // Estado inicial, puedes cambiarlo según tus necesidades
    };

    // Verificar si hay datos previos almacenados en localStorage
    var folios = localStorage.getItem('folios') ? JSON.parse(localStorage.getItem('folios')) : [];

    // Agregar el nuevo folio a la lista
    folios.push(nuevoFolio);

    // Guardar la lista actualizada en el almacenamiento local
    localStorage.setItem('folios', JSON.stringify(folios));

    // Vaciar los campos de información del formulario
    document.getElementById("trackingNumber").value = "";
    document.getElementById("Departamento").value = "";

    // Mostrar un mensaje de éxito
    document.getElementById("message").textContent = "Datos guardados correctamente.";
});



