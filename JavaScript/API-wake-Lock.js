
/* 
   En este SCRIPT estamos haciendo uso del API Wake Lock.
   Con esta API podemos bloquear la pantalla y evitar que se 
   oscurezca ya que de no hacerlo, nuestra aplicacion
   detendría su funcionamiento.
*/


/* 
   Es importante verificar la compatibilidad de esta API
   con el navegador antes de hacer la peticion
*/
function compatibilityWakeLock() {
    if ("wakeLock" in navigator) {
        requestScreenLock();
    } else {
        console.log("Su navegador no soporta el API Wake Lock");
    }
}

/* En esta función hacemos la petición de bloqueo a la API*/
let wakeLock = null;
async function requestScreenLock() {
    try {
        wakeLock = await navigator.wakeLock.request();
        console.log("La pantalla ha sido bloqueda correctamente");
        console.log(wakeLock);
    } catch (error) {
        console.error("Error al bloquear pantalla: " + error);
    }
}

/* 
   En esta función liberamos el bloqueo de la pantalla. Es importante no abusar 
   del uso del bloqueo ya que esto representa un mayor gasto en la batería del dispositivo.
*/
async function disableScreenLock() {
    try {
        if (wakeLock === null) {
            console.log("La pantalla ya esta desbloqueda");
            return;
        }
        await wakeLock.release();
        console.log("Pantalla Desbloqueada");
        console.log(wakeLock);
        wakeLock = null;

    } catch (error) {
        console.error("Error al Desbloquear pantalla: " + error);
    }
}