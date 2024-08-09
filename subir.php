<?php
// Nombre de la carpeta a crear (obtenido del parámetro)
$carpetaNombre = $_GET['nombre'];

// Ruta donde deseas crear la carpeta (por ejemplo, en la carpeta 'descarga')
$carpetaRuta = "./descarga/" . $carpetaNombre;

// Verifica si la carpeta ya existe antes de crearla
if (!file_exists($carpetaRuta)) {
    // Crea la carpeta con permisos adecuados (por ejemplo, 0755)
    mkdir($carpetaRuta, 0755, true);
    $mensaje = "Carpeta '$carpetaNombre' creada con éxito.";
} else {
    $mensaje = "La carpeta '$carpetaNombre' ya existe.";
}

// Manejo de archivos subidos
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verifica si se han subido archivos
    if (isset($_FILES['archivo'])) {
        $archivos = $_FILES['archivo'];

        // Verifica si hay múltiples archivos
        if (is_array($archivos['name'])) {
            foreach ($archivos['name'] as $key => $nombreArchivo) {
                $tmpNombre = $archivos['tmp_name'][$key];
                $rutaArchivo = $carpetaRuta . '/' . $nombreArchivo;

                if (move_uploaded_file($tmpNombre, $rutaArchivo)) {
                    echo "Archivo '$nombreArchivo' subido con éxito.<br>";
                } else {
                    echo "Error al subir el archivo '$nombreArchivo'.<br>";
                }
            }
        } else {
            // Caso para un solo archivo
            $nombreArchivo = $archivos['name'];
            $tmpNombre = $archivos['tmp_name'];
            $rutaArchivo = $carpetaRuta . '/' . $nombreArchivo;

            if (move_uploaded_file($tmpNombre, $rutaArchivo)) {
                echo "Archivo '$nombreArchivo' subido con éxito.<br>";
            } else {
                echo "Error al subir el archivo '$nombreArchivo'.<br>";
            }
        }
    }
}
?>
