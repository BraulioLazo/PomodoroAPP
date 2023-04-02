function startAPP(){
    keepScreenOn();
    temporizadorStyles()
    window.onresize = () => {temporizadorStyles();};

    let buttonStartTimer = document.querySelector("#p__app__btn__play");
    buttonStartTimer.addEventListener("click", () => {
        startTimer();
    });

}
window.addEventListener("load", startAPP);

function keepScreenOn(){
    if("wakeLock" in navigator){
        console.log("El navegador ES COMPATIBLE con WakeLock");

        navigator.wakeLock.request('screen').then((wakeLockObj)   => {
            console.log("El BLOQUEO de pantalla se ha activado correctamente");
            })
    } else {
        console.log("El navegador NO ES compatible con WakeLock");

    }
}