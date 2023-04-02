
/* 
   En este SCRIPT estamos haciendo uso del API Wake Lock.
   Con esta API podemos bloquear la pantalla y evitar que se 
   oscurezca ya que de no hacerlo nuestra aplicacion
   se detendria.
*/

let wakeLockObj;
function keepScreenOn() {
    if ("wakeLock" in navigator) {
        console.log("El navegador ES COMPATIBLE con WakeLock");
        wakeLockObj = null;

        navigator.wakeLock.request('screen').then((Obj) => {
            wakeLockObj = Obj;
            console.log("El BLOQUEO de pantalla se ha activado correctamente");
        }).catch((error) => {
            console.log("No se pudo activar el bloqueo de pantalla");
        });
    } else {
        console.log("El navegador NO ES compatible con WakeLock");

    }
}

function unlockScreen() {
    if (wakeLockObj) {
        wakeLockObj.release();
        wakeLockObj = null;
        console.log("La pantalla se ha desbloqueado correctamente");
    }
}