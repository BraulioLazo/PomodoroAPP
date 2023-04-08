
/* 
   En este SCRIPT estamos haciendo uso del API Wake Lock.
   Con esta API podemos bloquear la pantalla y evitar que se 
   oscurezca ya que de no hacerlo, nuestra aplicacion
   detendría su funcionamiento.
*/


const wakeLockAPI = {
    wakeLockObj: null,

    checkCompatibility: () => {
        if ("wakeLock" in navigator) {
            wakeLockAPI.requestScreenLock();
        } else {
            console.log("Navegador no compatible con el API Wake Lock");
        }
    },

    requestScreenLock: async () => {
        try {
            wakeLockAPI.wakeLockObj = await navigator.wakeLock.request('screen');
            console.log("La pantalla ha sido BLOQUEADA: ");
            console.log(wakeLockAPI.wakeLockObj);
        } catch (error) {
            console.error("Error al bloquear: " + error);
        }
    },

    unlockScreen: async () => {
        try {
            await wakeLockAPI.wakeLockObj.release();
            console.log("Pantalla desbloqueda");
            console.log(wakeLockAPI.wakeLockObj);
            wakeLockAPI.wakeLockObj = null;
        } catch (error) {
            console.error("Error al desbloquear la pantalla: " + error);
        }
    }

};

