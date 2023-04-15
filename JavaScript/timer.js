const timerAPP = {
    interval: null,
    minuts: 0,
    seconds: 0,
    worksCounter: 0,
    totalSeconds: 0,
    actualSeconds: 0,
    totalRounds: null,
    isBreakTime: false,

    startTimerAPP: () => {

        wakeLockAPI.checkWakeLockCompatibility();
        timerAPP.isWorkOrBreak();

        timerAPP.interval = setInterval(() => {
            timerAPP.seconds--;
            timerAPP.actualSeconds--;
            timerAPP.updateProgressBar();

            const minutsContainer = document.querySelector(".minuts__container");
            if (timerAPP.seconds < 0) {
                timerAPP.seconds = 59;

                timerAPP.minuts--;
                minutsContainer.innerHTML = timerAPP.minuts;

                if (timerAPP.minuts < 10) {
                    minutsContainer.innerHTML = "0" + timerAPP.minuts;
                }
                if (timerAPP.minuts <= 0) {
                    clearInterval(timerAPP.interval);
                    wakeLockAPI.unlockScreen();
                    timerAPP.updateProgressBar();
                    timerAPP.seconds = 0;

                    document.querySelector("#p__app__btn__pause").outerHTML =
                        '<button class="p__app__btn" id="p__app__btn__play" onclick="timerAPP.startTimerAPP()">' +
                        '<img src="Images/app__play__image.png" alt="">' +
                        'Start' +
                        '</button>';

                    timerAPP.isBreakTime = !timerAPP.isBreakTime;
                    if (timerAPP.isBreakTime === true) {
                        timerAPP.worksCounter++;
                        localStorage.setItem("worksCounter", timerAPP.worksCounter);

                        if (timerAPP.isBreakTime === true && timerAPP.worksCounter == timerAPP.totalRounds) {
                            timerAPP.startLongBreak();
                            timerAPP.worksCounter = 0;
                            localStorage.setItem("worksCounter", timerAPP.worksCounter);
                            roundsAPP.updateRoundsCounter();
                            roundsAPP.updateBreakStatus();
                            timerAPP.updateProgressBar();
                            return;
                        }

                        roundsAPP.updateRoundsCounter();
                        roundsAPP.updateBreakStatus();
                        timerAPP.startShortBreak();

                    } else {
                        timerAPP.minuts = parseInt(localStorage.getItem("defaultMinuts"));
                        const minutsContainer = document.querySelector(".minuts__container");
                        minutsContainer.innerHTML = timerAPP.minuts;
                        roundsAPP.updateRoundsCounter();
                        timerAPP.totalSeconds = timerAPP.minuts * 60;
                        timerAPP.actualSeconds = timerAPP.totalSeconds;
                        timerAPP.updateProgressBar();

                        if (timerAPP.minuts < 10) {
                            minutsContainer.innerHTML = "0" + timerAPP.minuts;
                        }
                    }
                }
            }
            const secondsContainer = document.querySelector(".seconds__container");
            secondsContainer.innerHTML = timerAPP.seconds;

            if (timerAPP.seconds < 10) {
                secondsContainer.innerHTML = "0" + timerAPP.seconds;
            }
        }, 1000);

        document.querySelector("#p__app__btn__play").outerHTML =
            '<button class="p__app__btn" id="p__app__btn__pause" onclick="timerAPP.isPaused(\'' + timerAPP.interval + '\')">' +
            '<img src="Images/app__pause__image.png" alt="">' +
            'Pause' +
            '</button>';

        document.querySelector("#p__app__reset__button").onclick = () => {
            timerAPP.restartTimerAPP();
        };
    },

    startShortBreak: () => {
        timerAPP.minuts = parseInt(localStorage.getItem("shortBreak"));
        const minutsContainer = document.querySelector(".minuts__container");
        minutsContainer.innerHTML = timerAPP.minuts;
        timerAPP.totalSeconds = timerAPP.minuts * 60;
        timerAPP.actualSeconds = timerAPP.totalSeconds;
        timerAPP.updateProgressBar();

        if (timerAPP.minuts < 10) {
            minutsContainer.innerHTML = "0" + timerAPP.minuts;
        }
    },

    startLongBreak: () => {
        timerAPP.minuts = parseInt(localStorage.getItem("longBreak"));
        const minutsContainer = document.querySelector(".minuts__container");
        minutsContainer.innerHTML = timerAPP.minuts;
        timerAPP.totalSeconds = timerAPP.minuts * 60;
        timerAPP.actualSeconds = timerAPP.totalSeconds;
        console.log("Long Break");

        if (timerAPP.minuts < 10) {
            minutsContainer.innerHTML = "0" + timerAPP.minuts;
        }
    },

    isWorkOrBreak: () => {
        if (timerAPP.isBreakTime === false) {
            const workTime = localStorage.getItem("defaultMinuts");
            localStorage.setItem("is_Work_or_Break", workTime);
        } else {
            if (timerAPP.worksCounter < timerAPP.totalRounds) {
                const shortBreak = localStorage.getItem("shortBreak");
                localStorage.setItem("is_Work_or_Break", shortBreak);
            } else if (timerAPP.worksCounter == timerAPP.totalRounds) {
                const longBreak = localStorage.getItem("longBreak");
                localStorage.setItem("is_Work_or_Break", longBreak);
            }
        }
    },

    updateProgressBar: () => {
        const progressBar = document.querySelector('.p__app__progress__bar');
        progressBar.style.backgroundImage = `conic-gradient(var(--color-main-dark), ${timerAPP.actualSeconds * 360 / timerAPP.totalSeconds}deg, var(--color-black-medium) 0deg)`;
    },

    isPaused: () => {
        clearInterval(timerAPP.interval);
        document.querySelector("#p__app__btn__pause").outerHTML =
            '<button class="p__app__btn" id="p__app__btn__play" onclick="timerAPP.startTimerAPP()">' +
            '<img src="Images/app__play__image.png" alt="">' +
            'Start' +
            '</button>';
    },

    restartTimerAPP: () => {
        clearInterval(timerAPP.interval);

        document.querySelector(".p__app__btn__play__container").innerHTML =
            '<button class="p__app__btn" id="p__app__btn__play" onclick="timerAPP.startTimerAPP()">' +
            '<img src="Images/app__play__image.png" alt="">' +
            'Start ' +
            '</button>';

        timerAPP.actualSeconds = timerAPP.totalSeconds;
        timerAPP.updateProgressBar();

        timerAPP.minuts = parseInt(localStorage.getItem("is_Work_or_Break"));
        if (timerAPP.minuts < 10) {
            document.querySelector(".minuts__container").innerHTML = "0" + timerAPP.minuts;
        } else {
            document.querySelector(".minuts__container").innerHTML = timerAPP.minuts;
        }

        timerAPP.seconds = 0;
        document.querySelector(".seconds__container").innerHTML = "0" + timerAPP.seconds;

        wakeLockAPI.unlockScreen();
    }

};