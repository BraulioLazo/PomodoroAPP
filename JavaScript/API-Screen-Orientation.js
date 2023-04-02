
// Esta funcion hace uso del API Scren Orientation y bloquea
// la pantalla solo si la ventana es menor o igual a 1024 px.

function lockPotraitOrientation() {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    if (mediaQuery.matches && screen.orientation) {
        screen.orientation.lock('portrait');
    } else {
        console.log('La API Screen Orientation no es compatible con este navegador o la pantalla es demasiado grande.');
    }
}