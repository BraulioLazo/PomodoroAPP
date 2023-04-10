

const timerAPP = {
    minuts: 0,
    seconds: 0,
    isBreakTime: false,

    setDefaultTimer: () => {

        if (localStorage.getItem("defaultMinuts")) {
            timerAPP.minuts = parseInt(localStorage.getItem("defaultMinuts"));
            document.querySelector(".minuts__container").innerHTML = timerAPP.minuts;

            if (timerAPP.minuts < 10) {
                document.querySelector(".minuts__container").innerHTML = "0" + timerAPP.minuts;
            }
        } else {
            localStorage.setItem("defaultMinuts", "8");
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
    },

    startTimerAPP: () => {
        const interval = setInterval(() => {
            timerAPP.seconds--;

            const secondsContainer = document.querySelector(".seconds__container");
            secondsContainer.innerHTML = timerAPP.seconds;

            const minutsContainer = document.querySelector(".minuts__container");
            if (timerAPP.seconds < 0) {
                timerAPP.seconds = 1;

                timerAPP.minuts--;
                minutsContainer.innerHTML = timerAPP.minuts;

                if (timerAPP.minuts < 10) {
                    minutsContainer.innerHTML = "0" + timerAPP.minuts;
                }
                if (timerAPP.minuts <= 0) {
                    clearInterval(interval);
                    timerAPP.seconds = 0;

                    timerAPP.isBreakTime = !timerAPP.isBreakTime;
                    if (timerAPP.isBreakTime === true) {
                        timerAPP.startShortBreak();
                    } else {
                        timerAPP.minuts = parseInt(localStorage.getItem("defaultMinuts"));
                        const minutsContainer = document.querySelector(".minuts__container");
                        minutsContainer.innerHTML = timerAPP.minuts;

                        if (timerAPP.minuts < 10) {
                            minutsContainer.innerHTML = "0" + timerAPP.minuts;
                        }
                    }
                }
            }

            if (timerAPP.seconds < 10) {
                secondsContainer.innerHTML = "0" + timerAPP.seconds;
            }
        }, 1000);
    },

    startShortBreak: () => {
        timerAPP.minuts = parseInt(localStorage.getItem("shortBreak"));
        const minutsContainer = document.querySelector(".minuts__container");
        minutsContainer.innerHTML = timerAPP.minuts;

        if (timerAPP.minuts < 10) {
            minutsContainer.innerHTML = "0" + timerAPP.minuts;
        }
    }

};