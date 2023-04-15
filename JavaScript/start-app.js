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

    document.querySelector(".p__app__section__setting").onclick = (event) => {
        if(event.target.classList.contains("p__app__deploy__section")){
            settingAPP.deploySetting();
            console.log(event)
        }
    };
    
}
window.addEventListener("load", startAPP);

