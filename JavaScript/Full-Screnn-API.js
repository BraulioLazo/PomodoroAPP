const fullScreenAPI = {

    isFullScreenEnabled: false,

    fullScreenCompatibility: () => {
        if (document.fullscreenEnabled) {
            fullScreenAPI.goFullScreen();
        } else {
            console.log("El navegador no admite la API Full Screen");
        }
    },

    goFullScreen: () => {
        try {
            if (fullScreenAPI.isFullScreenEnabled === true) {
                console.log("Ya estamos en pantalla completa");
                return;
            }

            const sectionAPP = document.querySelector(".p__app__section__home");
            if (sectionAPP.requestFullscreen) {
                sectionAPP.requestFullscreen();

            } else if (sectionAPP.webkitRequestFullscreen) {
                sectionAPP.webkitRequestFullscreen();

            } else if (sectionAPP.msRequestFullscreen) {
                sectionAPP.msRequestFullscreen();
            }

            fullScreenAPI.isFullScreenEnabled = true;

            console.log(fullScreenAPI.isFullScreenEnabled);
        } catch (error) {
            console.error("Error en la peticion FULL SCREEN:" + error);
        }

    },

    cancelFullScreen: () => {
        try {
            if (fullScreenAPI.isFullScreenEnabled === false) {
                console.log("FULL SCREEN ya no esta en uso");
                return;
            }

            if (document.exitFullscreen) {
                document.exitFullscreen();

            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();

            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }

            fullScreenAPI.isFullScreenEnabled = false;
        } catch (error) {
            console.error("Error en cancelacion de FULL SCREEN: " + error);
        }
    },

    handleFullScreenChange: () => {
        if (document.fullscreenElement) {
            fullScreenAPI.isFullScreenEnabled = true;
            document.querySelector("#full__screen__btn").outerHTML =
                '<button class="p__app__btn" id="full__screen__btn" onclick="fullScreenAPI.cancelFullScreen();">' +
                    'Cancel Full Screen' +
                '</button>';
            console.log("isFullScreenEnabled: " + fullScreenAPI.isFullScreenEnabled);

        } else {
            fullScreenAPI.isFullScreenEnabled = false;
            document.querySelector("#full__screen__btn").outerHTML =
            '<button class="p__app__btn" id="full__screen__btn" onclick="fullScreenAPI.goFullScreen()">' +
                'Active Full Screen' +
            '</button>';
            console.log("isFullScreenEnabled: " + fullScreenAPI.isFullScreenEnabled);
        }
    }
};