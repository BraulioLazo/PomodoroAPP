const wakeLockAPI = {

    wakeLockObj: null,

    requestScreenLock: async () => {
        try {
            wakeLockAPI.wakeLockObj = await navigator.wakeLock.request('screen');
            console.log("pantalla Bloqueda correctamente");
            console.log(wakeLockAPI.wakeLockObj);
        } catch (error) {
            console.error("Error al bloquear pantalla: " + error);
        }
    },

    unlockScreen: async () => {
        try {
            await wakeLockAPI.wakeLockObj.release();
            console.log("Pantalla desbloqueada");
            console.log(wakeLockAPI.wakeLockObj);
        } catch (error) {
            console.error("Error al desbloquear pantalla: " + error);
        }
    }
};