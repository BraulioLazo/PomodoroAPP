function startAPP() {
    temporizadorStyles();
    window.onresize = () => { temporizadorStyles(); };

    settingAPP.defaultSetting();

    const buttonStartTimer = document.querySelector("#p__app__btn__play");
    buttonStartTimer.addEventListener("click", () => {
        timerAPP.startTimerAPP();
    });

    document.querySelector("#p__app__customize__button").onclick = () => {
        settingAPP.deploySetting();
    };

    document.querySelector("#setting__form").addEventListener("submit", (event) => {
        event.preventDefault();
        settingAPP.userSetting();
    });

    document.querySelector("#factory__reset__btn").addEventListener("click", () => {
        settingAPP.factoryReset();
        settingAPP.defaultSetting();
    })
}
window.addEventListener("load", startAPP);

