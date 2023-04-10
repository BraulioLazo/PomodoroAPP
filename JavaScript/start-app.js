function startAPP() {
    temporizadorStyles();
    window.onresize = () => { temporizadorStyles(); };

    timerAPP.setDefaultTimer();

    const buttonStartTimer = document.querySelector("#p__app__btn__play");
    buttonStartTimer.addEventListener("click", () => {
        timerAPP.startTimerAPP();
    });

    document.querySelector("#p__app__customize__button").onclick = () =>{
        timerAPP.temporaryReset();
    }
}
window.addEventListener("load", startAPP);

