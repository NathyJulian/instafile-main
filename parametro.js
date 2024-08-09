// Obtén la URL actual
const urlActual = window.location.href;

// Verifica si el parámetro 'MariaPJ' ya está presente en la URL
const parametros = new URLSearchParams(window.location.search);
let carpetaNombre = parametros.get("MariaPJ");

if (!carpetaNombre) {
    // Si 'MariaPJ' no está presente, genera una cadena aleatoria
    carpetaNombre = generarCadenaAleatoria();
    // Agrega el parámetro 'MariaPJ' a la URL
    const urlConParametro = urlActual.includes("?") ? `${urlActual}&MariaPJ=${carpetaNombre}` : `${urlActual}?MariaPJ=${carpetaNombre}`;
    // Redirige a la nueva URL con el parámetro 'MariaPJ'
    window.location.href = urlConParametro;
} else {
    // Llama a la función para crear la carpeta con el nombre obtenido
    crearCarpeta(carpetaNombre);
}

// Función para generar una cadena aleatoria
function generarCadenaAleatoria() {
    const caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let cadenaAleatoria = '';
    for (let i = 0; i < 3; i++) {
        const caracterAleatorio = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        cadenaAleatoria += caracterAleatorio;
    }
    return cadenaAleatoria;
}

// Función para crear la carpeta
function crearCarpeta(carpetaNombre) {
    $.ajax({
        url: 'crearCarpeta.php',
        type: 'POST',
        data: { nombreCarpeta: carpetaNombre },
        success: function(response) {
            console.log('Carpeta creada con éxito:', response);
        },
        error: function(xhr, status, error) {
            console.error('Error al crear la carpeta:', error);
        }
    });
}

// Obtén el formulario y el área de arrastre
const dropArea = document.getElementById('drop-area');
const Form = document.getElementById('form');

// Agrega los eventos a la zona de arrastre
dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('drag-over');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('drag-over');
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    handleFiles(files);
});

// Función para manejar varios archivos
function handleFiles(files) {
    for (const file of files) {
        console.log('Archivo seleccionado:', file.name);
        // Aquí puedes agregar el código para subir cada archivo si lo deseas
    }
}

// Agrega la función para manejar el evento de envío del formulario
Form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fileInput = Form.querySelector('#archivo');
    const files = fileInput.files;
    if (files.length > 0) {
        console.log('Subir archivos:', files.length);
        // Aquí puedes agregar el código para subir los archivos al servidor
    } else {
        alert('Por favor, seleccione al menos un archivo.');
    }
});

// Función para mostrar la barra de progreso
function uploadFile(carpetaRuta, inputId) {
    const archivoInput = document.getElementById(inputId);
    const archivos = archivoInput.files;
    const progressBar = document.getElementById('progressBar');

    for (const archivo of archivos) {
        const formData = new FormData();
        formData.append('archivo', archivo);

        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = function (event) {
            if (event.lengthComputable) {
                const percentComplete = (event.loaded / event.total) * 100;
                progressBar.value = percentComplete;
            }
        };

        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log('Archivo subido con éxito');
                // Puedes realizar acciones adicionales después de la carga aquí
            } else {
                console.error('Error al subir el archivo');
            }
        };

        xhr.open('POST', 'upload.php', true);
        xhr.send(formData);
    }
}
