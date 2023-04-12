const timerAPP = {
    minuts: 0,
    seconds: 0,
    worksCounter: 0,
    totalSeconds: 0,
    actualSeconds: 0,
    totalRounds: null,
    isBreakTime: false,


    setDefaultTimer: () => {

        if (localStorage.getItem("defaultMinuts")) {
            timerAPP.minuts = parseInt(localStorage.getItem("defaultMinuts"));
            document.querySelector(".minuts__container").innerHTML = timerAPP.minuts;

            if (timerAPP.minuts < 10) {
                document.querySelector(".minuts__container").innerHTML = "0" + timerAPP.minuts;
            }
        } else {
            localStorage.setItem("defaultMinuts", "25");
            timerAPP.minuts = parseInt(localStorage.getItem("defaultMinuts"));
            document.querySelector(".minuts__container").innerHTML = timerAPP.minuts;

            if (timerAPP.minuts < 10) {
                document.querySelector(".minuts__container").innerHTML = "0" + timerAPP.minuts;
            }
        }

        if (localStorage.getItem("shortBreak")) {
            timerAPP.shortBreak = parseInt(localStorage.getItem("shortBreak"));
        } else {
            localStorage.setItem("shortBreak", "5");
            timerAPP.shortBreak = parseInt(localStorage.getItem("shortBreak"));
        }

        if (localStorage.getItem("longBreak")) {
            timerAPP.longBreak = parseInt(localStorage.getItem("longBreak"));
        } else {
            localStorage.setItem("longBreak", "15");
            timerAPP.longBreak = parseInt(localStorage.getItem("longBreak"));

        }

        if (localStorage.getItem("worksCounter")) {
            timerAPP.worksCounter = parseInt(localStorage.getItem("worksCounter"));
        } else {
            localStorage.setItem("worksCounter", "0");
            timerAPP.worksCounter = parseInt(localStorage.getItem("worksCounter"));
        }

        if (localStorage.getItem("totalRounds")) {
            timerAPP.totalRounds = parseInt(localStorage.getItem("totalRounds"));
            document.querySelector(".total__rounds").innerHTML = timerAPP.totalRounds;

        } else {
            localStorage.setItem("totalRounds", "3");
            timerAPP.totalRounds = parseInt(localStorage.getItem("totalRounds"));
            document.querySelector(".total__rounds").innerHTML = timerAPP.totalRounds;
        }

        timerAPP.totalSeconds = timerAPP.minuts * 60;
        timerAPP.actualSeconds = timerAPP.totalSeconds;
    },

    startTimerAPP: () => {
       
        wakeLockAPI.checkWakeLockCompatibility();

        localStorage.setItem("is_Work_or_Break", timerAPP.minuts);

        const interval = setInterval(() => {
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
                    clearInterval(interval);
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

                        if (timerAPP.isBreakTime === true && timerAPP.worksCounter > 2) {
                            timerAPP.startLongBreak();
                            timerAPP.worksCounter = 0;
                            localStorage.setItem("worksCounter", timerAPP.worksCounter);
                            roundsAPP.updateRoundsCounter();
                            roundsAPP.updateBreakStatus();
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
            '<button class="p__app__btn" id="p__app__btn__pause" onclick="timerAPP.isPaused(\'' + interval + '\')">' +
            '<img src="Images/app__pause__image.png" alt="">' +
            'Pause' +
            '</button>';

        document.querySelector("#p__app__reset__button").onclick = () => {
            timerAPP.restartTimerAPP(interval);
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

    updateProgressBar: () => {
        const progressBar = document.querySelector('.p__app__progress__bar');
        progressBar.style.backgroundImage = `conic-gradient(var(--color-main-dark), ${timerAPP.actualSeconds * 360 / timerAPP.totalSeconds}deg, var(--color-black-medium) 0deg)`;
    },

    isPaused: (interval) => {
        clearInterval(interval);
        document.querySelector("#p__app__btn__pause").outerHTML =
            '<button class="p__app__btn" id="p__app__btn__play" onclick="timerAPP.startTimerAPP()">' +
            '<img src="Images/app__play__image.png" alt="">' +
            'Start' +
            '</button>';
    },

    restartTimerAPP: (interval) => {
        clearInterval(interval);

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
    },

    temporaryReset: () => {
        localStorage.clear();
        location.reload();
    }

};