function startAPP() {
    temporizadorStyles();
    window.onresize = () => { temporizadorStyles(); };

    timerAPP.setDefaultTimer();

    const buttonStartTimer = document.querySelector("#p__app__btn__play");
    buttonStartTimer.addEventListener("click", () => {
        timerAPP.startTimerAPP();
    });
}
window.addEventListener("load", startAPP);

