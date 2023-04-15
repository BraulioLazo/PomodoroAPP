function startAPP() {
    temporizadorStyles();
    window.onresize = () => { temporizadorStyles(); };

    settingAPP.defaultSetting();
    roundsAPP.updateRoundsElements();
    roundsAPP.updateRoundsCounter()

    const buttonStartTimer = document.querySelector("#p__app__btn__play");
    buttonStartTimer.addEventListener("click", () => {
        timerAPP.startTimerAPP();
    });

    document.querySelector("#p__app__customize__button").onclick = () => {
        clearInterval(timerAPP.interval)
        settingAPP.deploySetting();

    };

    document.querySelector("#setting__form").addEventListener("submit", (event) => {
        event.preventDefault();
        settingAPP.userSetting();
    });

    document.querySelector("#factory__reset__btn").onclick =  () => {
        settingAPP.factoryReset();
    }
}
window.addEventListener("load", startAPP);

