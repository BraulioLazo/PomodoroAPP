function temporizadorStyles(){
    const timer = document.querySelector(".p__app__termporizador");
    let timerWidth = timer.getBoundingClientRect().width;
    timer.style.height = `${timerWidth}px`
}