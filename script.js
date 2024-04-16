

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


// Agregar eventos para mostrar/ocultar submenús en pantallas pequeñas
document.addEventListener("DOMContentLoaded", function() {
    var menuItems = document.querySelectorAll('.menu-list > li');

    for (var i = 0; i < menuItems.length; i++) {
        menuItems[i].addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                var submenu = this.querySelector('.sub-menu');
                if (submenu) {
                    e.preventDefault();
                    if (submenu.style.display === 'block') {
                        submenu.style.display = 'none';
                    } else {
                        submenu.style.display = 'block';
                    }
                }
            }
        });
    }
});


// Función para rastrear el documento
function trackDocument() {
    var imageContainer = document.getElementById("imageContainer");
    var trackingNumber = document.getElementById("trackingNumber").value;
    var resultElement = document.getElementById("result");

    // Obtener los datos de seguimiento del almacenamiento local
    var folios = JSON.parse(localStorage.getItem('folios')) || {};

    var requisition = folios.find(folio => folio.folio === trackingNumber);

    if (requisition) {
        resultElement.textContent = "Estado del documento: " + requisition.estado;

        // URL base para las imágenes
        var baseUrl = "img/";

        // Determinar la URL de la imagen según el estado de la requisición
        var imageUrl;
        switch (requisition.estado) {
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

                // Mostrar un botón de eliminación
                var deleteButton = document.createElement("button");
                deleteButton.textContent = "Eliminar registro";
                deleteButton.onclick = function() {
                    // Eliminar el folio del almacenamiento local
                    var index = folios.findIndex(folio => folio.folio === requisition.folio);
                    if (index !== -1) {
                        folios.splice(index, 1);
                        localStorage.setItem('folios', JSON.stringify(folios));
                        // Actualizar la interfaz
                        trackDocument();
                    }
                };
                resultElement.appendChild(deleteButton);
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

document.addEventListener("DOMContentLoaded", function() {
    // Obtener referencia al botón de guardar datos
    var guardarDatosButton = document.getElementById("guardarDatos");

    // Verificar si se encontró el botón
    if (guardarDatosButton) {
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
    } 
});




document.addEventListener("DOMContentLoaded", function() {
    // Función para consultar y mostrar los datos del almacenamiento local en formato de tabla
    function mostrarDatosEnTabla() {
        // Verificar si hay datos previos almacenados en localStorage
        var folios = localStorage.getItem('folios') ? JSON.parse(localStorage.getItem('folios')) : [];

        // Verificar si hay algún dato almacenado
        if (folios.length > 0) {
            // Construir la tabla con los datos
            var tablaHTML = "<table>";
            // Crear encabezados de columna
            tablaHTML += "<tr><th>Folio</th><th>Departamento</th><th>Estado</th></tr>";
            // Agregar filas con los datos
            folios.forEach(function(folio) {
                tablaHTML += "<tr><td>" + folio.folio + "</td><td>" + folio.departamento + "</td><td>" + folio.estado + "</td></tr>";
            });
            tablaHTML += "</table>";

            // Mostrar la tabla en el elemento con id="tablaDatos"
            document.getElementById("tablaDatos").innerHTML = tablaHTML;
        } else {
            // Mostrar un mensaje si no hay datos almacenados
            document.getElementById("tablaDatos").innerHTML = "No hay datos almacenados.";
        }
    }

    // Llamar a la función al cargar la página
    mostrarDatosEnTabla();
});


// Definir los usuarios y contraseñas para cada departamento
var users = {
    "Direccion": { username: "Direccion", password: "j#5sG@9u" },
    "Compras": { username: "Compras", password: "dW7&k3tM" },
    "Planeacion": { username: "Planeacion", password: "fR*6j@2z" }
};

// Login para control interno de planeación
document.addEventListener("DOMContentLoaded", function() {
    // Referencia al formulario de inicio de sesión
    var loginForm = document.getElementById("loginFormPlan");

    // Agregar un controlador de eventos para el evento submit del formulario
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe de forma tradicional

        // Obtener los valores de usuario y contraseña ingresados por el usuario
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        // Verificar si el usuario y la contraseña coinciden con los permitidos para Planeacion
        if (username === "Planeacion" && password === "fR*6j@2z") {
            // Si las credenciales son correctas, redirigir a la página de inicio de Planeacion
            window.location.href = "file:///C:/Users/heimena/Desktop/TRACKING/Planeacion.html";
        } else {
            // Si las credenciales son incorrectas, mostrar un mensaje de error
            document.getElementById("message").textContent = "Credenciales incorrectas. Por favor, inténtelo de nuevo.";
        }
    });
});



// Login en la página de modificar
document.addEventListener("DOMContentLoaded", function() {
    // Agregar un controlador de eventos al formulario para el evento submit
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe de manera tradicional

        // Llamar a la función login() al enviar el formulario
        login();
    });
});


// Función para realizar el inicio de sesión
function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    var department = getDepartment(username); // Obtener el departamento del usuario
    
    if (!department) {
        document.getElementById("message").innerHTML = "Usuario no encontrado";
        return false;
    }
    
    var user = users[department]; // Obtener los datos del usuario del departamento
    
    if (!user || user.username !== username || user.password !== password) {
        document.getElementById("message").innerHTML = "Nombre de usuario o contraseña incorrectos";
        return false;
    }
    
    // Autenticación exitosa, redirigir al usuario a la página de inicio del departamento
    window.location.href = "file:///C:/Users/heimena/Desktop/TRACKING/modificar" + department.toLowerCase() + ".html";
    return false;
}

// Función para obtener el departamento del usuario a partir del nombre de usuario
function getDepartment(username) {
    for (var dept in users) {
        if (users.hasOwnProperty(dept) && users[dept].username === username) {
            return dept;
        }
    }
    return null; // Devolver null si el usuario no pertenece a ningún departamento
}


// Definir un objeto que mapee los estados a su índice numérico
var estados = {
    "Default": 0,
    "Direccion": 1,
    "Compras": 2,
    "Planeacion": 3,
    "Comprado": 4,
    "Enviado": 5,
    "Recibido": 6
};

document.addEventListener("DOMContentLoaded", function() {
    // Agregar controladores de eventos a los botones
    document.getElementById("Direccion").addEventListener("click", function() {
        modificarEstado("Direccion");
    });

});

document.addEventListener("DOMContentLoaded", function() {
    // Agregar controladores de eventos a los botones
    document.getElementById("Direccion").addEventListener("click", function() {
        modificarEstado("Direccion");
    });

    document.getElementById("Compras").addEventListener("click", function() {
        modificarEstado("Compras");
    });

    document.getElementById("Planeacion").addEventListener("click", function() {
        modificarEstado("Planeacion");
    });

    document.getElementById("Comprado").addEventListener("click", function() {
        modificarEstado("Comprado");
    });

    document.getElementById("Enviado").addEventListener("click", function() {
        modificarEstado("Enviado");
    });

    document.getElementById("Recibido").addEventListener("click", function() {
        modificarEstado("Recibido");
    });
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("Planeacion").addEventListener("click", function() {
        modificarEstado("Planeacion");
    });
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("Compras").addEventListener("click", function() {
        modificarEstado("Compras");
    });

    document.getElementById("Comprado").addEventListener("click", function() {
        modificarEstado("Comprado");
    });

    document.getElementById("Enviado").addEventListener("click", function() {
        modificarEstado("Enviado");
    });

    document.getElementById("Recibido").addEventListener("click", function() {
        modificarEstado("Recibido");
    });
});

// Función para modificar el estado del folio
function modificarEstado(nuevoEstado) {
    var trackingNumber = document.getElementById("trackingNumber").value;
    // Obtener los folios del almacenamiento local
    var folios = localStorage.getItem('folios') ? JSON.parse(localStorage.getItem('folios')) : [];
    // Buscar el folio por su número
    var folio = folios.find(f => f.folio === trackingNumber);
    if (folio) {
        // Verificar si el nuevo estado es válido
        if (estados[nuevoEstado] === estados[folio.estado] + 1) {
            // Modificar el estado del folio
            folio.estado = nuevoEstado;
            // Actualizar los folios en el almacenamiento local
            localStorage.setItem('folios', JSON.stringify(folios));
            // Mostrar mensaje de éxito
            document.getElementById("message").textContent = "Estado del folio modificado correctamente a: " + nuevoEstado;

        } else if (estados[nuevoEstado] === estados[folio.estado]) {
            // Mostrar mensaje de éxito si el estado es el mismo
            document.getElementById("message").textContent = "Estado del folio es el mismo que el que se tiene registrado";

        } else if (estados[nuevoEstado] > estados[folio.estado]) {
            // Mostrar mensaje de error si el nuevo estado no es válido
            document.getElementById("message").textContent = "El estado seleccionado no corresponde al siguiente proceso";
            // Mostrar cuadro de confirmación
            if (window.confirm("¿Desea completar los registros faltantes para este folio?")) {
                // Modificar el estado del folio
                folio.estado = nuevoEstado;
                // Actualizar los folios en el almacenamiento local
                localStorage.setItem('folios', JSON.stringify(folios));
                // Mostrar mensaje de éxito
                document.getElementById("message").textContent = "Estado del folio modificado correctamente a: " + nuevoEstado;
            } else {
                // Mostrar mensaje de cancelación
                document.getElementById("message").textContent = "Operación cancelada"; 
            }
        } else {
            // Mostrar mensaje de error si el nuevo estado es anterior al estado actual
            document.getElementById("message").textContent = "El estado seleccionado no corresponde al proceso actual";
        }
    } else {
        // Mostrar mensaje de error si el folio no se encuentra
        document.getElementById("message").textContent = "Folio no encontrado";
    }
}

// Guardar la información del formulario de planeación
document.addEventListener("DOMContentLoaded", function() {
    // Obtener referencia al botón "Guardar Registro"
    var guardarRegistroButton = document.getElementById("guardarRegistro");

    // Agregar un controlador de eventos al botón "Guardar Registro"
    guardarRegistroButton.addEventListener("click", function() {
        // Obtener los datos del formulario
        var formData = obtenerDatosFormulario();

        // Obtener registros existentes del localStorage (si los hay)
        var registros = JSON.parse(localStorage.getItem('registros')) || [];

        // Agregar el nuevo registro a la lista
        registros.push(formData);

        // Guardar la lista actualizada en el localStorage
        localStorage.setItem('registros', JSON.stringify(registros));

        // Limpiar el formulario después de guardar el registro
        limpiarFormulario();

        // Mostrar un mensaje de éxito
        alert("Registro guardado correctamente.");
    });

    // Función para obtener los datos del formulario
    function obtenerDatosFormulario() {
        var data = {
            fechaRecepcion: document.getElementById("fechaRecepcion").value,
            numeroRequisicion: document.getElementById("numeroRequisicion").value,
            entregaSubdireccion: document.getElementById("entregaSubdireccion").checked,
            reciboSubdireccion: document.getElementById("reciboSubdireccion").checked,
            entregaDireccion: document.getElementById("entregaDireccion").checked,
            reciboDireccion: document.getElementById("reciboDireccion").checked,
            observaciones: document.getElementById("observaciones").value,
            departamentoEntregado: document.getElementById("departamentoEntregado").value
        };
        return data;
    }

    // Función para limpiar el formulario después de guardar el registro
    function limpiarFormulario() {
        document.getElementById("fechaRecepcion").value = "";
        document.getElementById("numeroRequisicion").value = "";
        document.getElementById("entregaSubdireccion").checked = false;
        document.getElementById("reciboSubdireccion").checked = false;
        document.getElementById("entregaDireccion").checked = false;
        document.getElementById("reciboDireccion").checked = false;
        document.getElementById("observaciones").value = "";
        document.getElementById("departamentoEntregado").value = "";
    }
});


// Cargar registros al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    cargarRegistros();
});

// Función para cargar los registros desde el local storage y mostrarlos en la tabla
function cargarRegistros() {
    var registros = JSON.parse(localStorage.getItem('registros')) || [];
    var tbody = document.getElementById('registrosBody');
    tbody.innerHTML = '';

    registros.forEach(function(registro) {
        var row = tbody.insertRow();
        row.insertCell(0).textContent = registro.fechaRecepcion;
        row.insertCell(1).textContent = registro.numeroRequisicion;
        row.insertCell(2).textContent = registro.entregaSubdireccion;
        row.insertCell(3).textContent = registro.reciboSubdireccion;
        row.insertCell(4).textContent = registro.entregaDireccion;
        row.insertCell(5).textContent = registro.reciboDireccion;
        row.insertCell(6).textContent = registro.observaciones;
        row.insertCell(7).textContent = registro.departamentoEntregado;
                
         // Botón de editar
        var editarButton = document.createElement('button');
        editarButton.textContent = 'Editar';
        editarButton.addEventListener('click', function() {
            editarRegistro(registro.numeroRequisicion);
        });
        row.insertCell(8).appendChild(editarButton);
    });
}

// Función para redirigir a la página de edición con el número de requisición
function editarRegistro(numeroRequisicion) {
    window.location.href = 'PlaneacionEdit.html?numeroRequisicion=' + numeroRequisicion;
}

function cargarDatosRegistro() {
    var numeroRequisicion = obtenerNumeroRequisicionDesdeURL();
    var registros = JSON.parse(localStorage.getItem('registros')) || [];
    var registro = registros.find(function(r) {
    return r.numeroRequisicion === numeroRequisicion;
});

    if (registro) {
        document.getElementById('fechaRecepcion').value = registro.fechaRecepcion;
        document.getElementById('numeroRequisicion').value = registro.numeroRequisicion;
        document.getElementById('entregaSubdireccion').value = registro.entregaSubdireccion;
        document.getElementById('reciboSubdireccion').value = registro.reciboSubdireccion;
        document.getElementById('entregaDireccion').value = registro.entregaDireccion;
        document.getElementById('reciboDireccion').value = registro.reciboDireccion;
        document.getElementById('observaciones').value = registro.observaciones;
        document.getElementById('departamentoEntregado').value = registro.departamentoEntregado;
        // Asigna los valores de los demás campos del formulario
    } 
}

function obtenerNumeroRequisicionDesdeURL() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('numeroRequisicion');
}

function guardarCambios() {
    // Capturar los datos modificados del formulario
    var newData = {
        fechaRecepcion: document.getElementById("fechaRecepcion").value,
        numeroRequisicion: document.getElementById("numeroRequisicion").value,
        entregaSubdireccion: document.getElementById("entregaSubdireccion").checked,
        reciboSubdireccion: document.getElementById("reciboSubdireccion").checked,
        entregaDireccion: document.getElementById("entregaDireccion").checked,
        reciboDireccion: document.getElementById("reciboDireccion").checked,
        observaciones: document.getElementById("observaciones").value,
        departamentoEntregado: document.getElementById("departamentoEntregado").value
    };

    // Obtener el número de requisición desde la URL
    var numeroRequisicion = obtenerNumeroRequisicionDesdeURL();

    // Obtener los registros del almacenamiento local
    var registros = JSON.parse(localStorage.getItem('registros')) || [];

    // Encontrar el índice del registro correspondiente
    var registroIndex = registros.findIndex(function(registro) {
        return registro.numeroRequisicion === numeroRequisicion;
    });

    if (registroIndex !== -1) {
        // Actualizar el registro con los nuevos datos
        registros[registroIndex] = newData;

        // Guardar los registros actualizados en el almacenamiento local
        localStorage.setItem('registros', JSON.stringify(registros));

        // Redirigir a la página PlaneacionModificar.html
        window.location.href = 'PlaneacionModificar.html';
    } else {
        alert('No se encontró el registro.');
    }
}


document.addEventListener('DOMContentLoaded', function() {
    cargarDatosRegistro();
});

        