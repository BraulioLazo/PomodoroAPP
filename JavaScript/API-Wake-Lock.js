const wakeLockAPI = {

    wakeLockObj: null,

    checkWakeLockCompatibility: () => {
        if ("wakeLock" in navigator) {
            wakeLockAPI.requestScreenLock();
        } else {
            console.log("El navegador no es compatible con el API Wake Lock");
        }
    },

    requestScreenLock: async () => {
        try {
            if (wakeLockAPI.wakeLockObj != null) {
                console.log("La pantalla ya esta bloqueda");
                return;
            }
            wakeLockAPI.wakeLockObj = await navigator.wakeLock.request('screen');
            console.log("pantalla Bloqueda correctamente");
            console.log(wakeLockAPI.wakeLockObj);
        } catch (error) {
            console.error("Error al bloquear pantalla: " + error);
        }
    },

    unlockScreen: async () => {
        try {
            if (wakeLockAPI.wakeLockObj === null) {
                console.log("La pantalla ya esta desbloqueda");
                return;
            }
            await wakeLockAPI.wakeLockObj.release();
            console.log("Pantalla desbloqueada");
            console.log(wakeLockAPI.wakeLockObj);
            wakeLockAPI.wakeLockObj = null;

        } catch (error) {
            console.error("Error al desbloquear pantalla: " + error);
        }
    }
};