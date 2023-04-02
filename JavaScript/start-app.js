function startAPP() {
    keepScreenOn();
    lockPotraitOrientation();
    temporizadorStyles();
    window.onresize = () => { temporizadorStyles(); };

    let buttonStartTimer = document.querySelector("#p__app__btn__play");
    buttonStartTimer.addEventListener("click", () => {
        startTimer();
    });

}
window.addEventListener("load", startAPP);

