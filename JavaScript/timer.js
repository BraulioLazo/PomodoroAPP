const minutsContainer = document.querySelector(".minuts__container");
const secondsContainer = document.querySelector(".seconds__container");
let minuts;
let seconds = 0;

function startTimer() {

    if (localStorage.getItem("workingCustomTime")) {
        const workingCustomTime = parseInt(localStorage.getItem("workingCustomTime"));
        minuts = workingCustomTime;
    } else {
        localStorage.setItem("workingCustomTime", "25");
        const workingCustomTime = parseInt(localStorage.getItem("workingCustomTime"));
        minuts = workingCustomTime;
    }

    function timer() {
        seconds--;

        if (seconds < 0) {
            seconds = 59;
            minuts--;

            minutsContainer.innerHTML = minuts;

            if (minuts < 10) {
                minutsContainer.innerHTML = "0" + minuts;
            }
        }

        secondsContainer.innerHTML = seconds;

        if (seconds < 10) {
            secondsContainer.innerHTML = "0" + seconds;
        }

        document.querySelector("#p__app__btn__pause").addEventListener("click", () => {
            pauseTimer(timerInterval);
        });
    }
    let timerInterval = setInterval(timer, 1000);

    document.querySelector(".p__app__btn__play__container").innerHTML =
        '<button class="p__app__btn" id="p__app__btn__pause" onclick="pauseTimer(\'' + timerInterval + '\')">' +
        '<img src="Images/app__pause__image.png" alt="">' +
        'Pause';
    '</button>';
}

function pauseTimer(intervalo) {
    clearInterval(intervalo);
    document.querySelector(".p__app__btn__play__container").innerHTML = '<button class="p__app__btn" id="p__app__btn__play" onclick="startTimer()">' +
        '<img src="Images/app__play__image.png" alt="">' +
        'Start';
    '</button>';
}