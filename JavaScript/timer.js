const minutsContainer = document.querySelector(".minuts__container");
const secondsContainer = document.querySelector(".seconds__container");
let minuts;
let seconds = 0;

function setDefaultCustomTime() {
    if (localStorage.getItem("workingCustomTime")) {
        const workingCustomTime = parseInt(localStorage.getItem("workingCustomTime"));
        minuts = workingCustomTime;
    } else {
        localStorage.setItem("workingCustomTime", "25");
        const workingCustomTime = parseInt(localStorage.getItem("workingCustomTime"));
        minuts = workingCustomTime;
    }
}
setDefaultCustomTime();

const workingCustomTime = parseInt(localStorage.getItem("workingCustomTime") * 60);
let newWorkingCustomTime = workingCustomTime;

function startTimer() {


    wakeLockAPI.checkCompatibility();

    function timer() {
        seconds--;
        newWorkingCustomTime--;
        console.log(newWorkingCustomTime);
        progressBar(newWorkingCustomTime);

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

        if (minuts === 0 && seconds == 0) {
            clearInterval(timerInterval);
            wakeLockAPI.unlockScreen();

            document.querySelector(".p__app__btn__play__container").innerHTML =
                '<button class="p__app__btn" id="p__app__btn__play" onclick="startTimer()">' +
                '<img src="Images/app__play__image.png" alt="">' +
                'Start';
            '</button>';
        }
    }
    let timerInterval = setInterval(timer, 1000);

    document.querySelector(".p__app__btn__play__container").innerHTML =
        '<button class="p__app__btn" id="p__app__btn__pause" onclick="pauseTimer(\'' + timerInterval + '\')">' +
        '<img src="Images/app__pause__image.png" alt="">' +
        'Pause';
    '</button>';

    resetTimer(timerInterval);
}


function pauseTimer(intervalo) {
    clearInterval(intervalo);
    document.querySelector(".p__app__btn__play__container").innerHTML =
        '<button class="p__app__btn" id="p__app__btn__play" onclick="startTimer()">' +
        '<img src="Images/app__play__image.png" alt="">' +
        'Start';
    '</button>';
}

function resetTimer(interval) {
    const resetButton = document.querySelector("#p__app__reset__button");
  
    resetButton.onclick = () => {
      clearInterval(interval);
      wakeLockAPI.unlockScreen();
  
      const workingCustomTime = parseInt(localStorage.getItem("workingCustomTime"));
      const newWorkingCustomTime = workingCustomTime * 60;
  
      progressBar(newWorkingCustomTime);
  
      minutsContainer.innerHTML = workingCustomTime;
      secondsContainer.innerHTML = "00";
      minuts = workingCustomTime;
      seconds = 0;
  
      document.querySelector(".p__app__btn__play__container").innerHTML =
        '<button class="p__app__btn" id="p__app__btn__play" onclick="startTimer()">' +
        '<img src="Images/app__play__image.png" alt="">' +
        'Start' +
        '</button>';
    };
  }
  


function progressBar(newWorkingCustomTime) {
    const progressBar = document.querySelector(".p__app__progress__bar");
    const workingCustomTime = parseInt(localStorage.getItem("workingCustomTime") * 60);
    let porcent = (newWorkingCustomTime * 100 / workingCustomTime) * 3.6;
    progressBar.style.backgroundImage = `conic-gradient(var(--color-main-dark), ${porcent}deg, var(--color-black-medium) 0deg)`;
}