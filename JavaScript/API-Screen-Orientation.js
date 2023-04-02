
// Esta funcion hace uso del API Scren Orientation y bloquea
// la pantalla solo si la ventana es menor o igual a 1024 px.

function lockPotraitOrientation() {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 1024) {
        if (screen.orientation) {
            // Bloquear la orientación en modo retrato
            screen.orientation.lock('portrait');
        } else {
            console.log('La API Screen Orientation no es compatible con este navegador.');
        }
    }
}