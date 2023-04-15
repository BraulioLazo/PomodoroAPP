const defaultValues = {
    defaultMinuts: 25,
    shortBreak: 5,
    longBreak: 15,
    worksCounter: 0,
    totalRounds: 3,
};

const settingAPP = {
    defaultSetting: () => {
        if (localStorage.getItem("defaultMinuts")) {
            timerAPP.minuts = parseInt(localStorage.getItem("defaultMinuts"));
            document.querySelector(".minuts__container").innerHTML = timerAPP.minuts;

            if (timerAPP.minuts < 10) {
                document.querySelector(".minuts__container").innerHTML = "0" + timerAPP.minuts;
            }
        } else {
            localStorage.setItem("defaultMinuts", defaultValues.defaultMinuts);
            timerAPP.minuts = defaultValues.defaultMinuts;
            document.querySelector(".minuts__container").innerHTML = timerAPP.minuts;

            if (timerAPP.minuts < 10) {
                document.querySelector(".minuts__container").innerHTML = "0" + timerAPP.minuts;
            }
        }

        /* Short Break default DURATION */
        if (localStorage.getItem("shortBreak")) {
            timerAPP.shortBreak = parseInt(localStorage.getItem("shortBreak"));
        } else {
            localStorage.setItem("shortBreak", defaultValues.shortBreak);
            timerAPP.shortBreak = defaultValues.shortBreak;
        }

        /* LONG Break default DURATION */
        if (localStorage.getItem("longBreak")) {
            timerAPP.longBreak = parseInt(localStorage.getItem("longBreak"));
        } else {
            localStorage.setItem("longBreak", defaultValues.longBreak);
            timerAPP.longBreak = defaultValues.longBreak;

        }

        /* Default Work Counter*/
        if (localStorage.getItem("worksCounter")) {
            timerAPP.worksCounter = parseInt(localStorage.getItem("worksCounter"));
        } else {
            localStorage.setItem("worksCounter", defaultValues.worksCounter);
            timerAPP.worksCounter = defaultValues.worksCounter;
        }

        /* Default Rounds*/
        if (localStorage.getItem("totalRounds")) {
            timerAPP.totalRounds = parseInt(localStorage.getItem("totalRounds"));
            document.querySelector(".total__rounds").innerHTML = timerAPP.totalRounds;

        } else {
            localStorage.setItem("totalRounds", defaultValues.totalRounds);
            timerAPP.totalRounds = defaultValues.totalRounds;
            document.querySelector(".total__rounds").innerHTML = timerAPP.totalRounds;
        }

        timerAPP.totalSeconds = timerAPP.minuts * 60;
        timerAPP.actualSeconds = timerAPP.totalSeconds;
    },

    userSetting: () => {
        const workTime = document.querySelector("#work__time").value;
        const shortBreak = document.querySelector("#short__break").value;
        const longBreak = document.querySelector("#long__break").value;
        const totalRounds = document.querySelector("#total__rounds").value;

        localStorage.setItem("defaultMinuts", workTime);
        localStorage.setItem("shortBreak", shortBreak);
        localStorage.setItem("longBreak", longBreak);
        localStorage.setItem("totalRounds", totalRounds);

        timerAPP.totalRounds = totalRounds;

        timerAPP.totalSeconds = timerAPP.minuts * 60;
        timerAPP.actualSeconds = timerAPP.totalSeconds;

        timerAPP.isWorkOrBreak();
        roundsAPP.updateRoundsElements();
        roundsAPP.updateRoundsCounter();
        timerAPP.restartTimerAPP();
        timerAPP.updateProgressBar();
        
        settingAPP.deploySetting();
    },

    factoryReset: () => {
         localStorage.clear();
         settingAPP.defaultSetting();
         roundsAPP.updateRoundsElements();
        roundsAPP.updateRoundsCounter();
        timerAPP.updateProgressBar();

        settingAPP.deploySetting();
    },

    deploySetting: () => {
        document.querySelector(".p__app__section__setting").classList.toggle("p__app__deploy__section");

        document.querySelector("#work__time").value = localStorage.getItem("defaultMinuts");
        document.querySelector("#short__break").value = localStorage.getItem("shortBreak");
        document.querySelector("#long__break").value = localStorage.getItem("longBreak");
        document.querySelector("#total__rounds").value = localStorage.getItem("totalRounds");
    }
};

