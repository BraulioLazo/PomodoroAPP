function startAPP(){
    temporizadorStyles()
    window.onresize = () => {temporizadorStyles();};
}
window.addEventListener("load", startAPP);