const roundsAPP = {
    round: 0,
    roundsContainer: null,

    updateRoundsElements: () => {
        const roundsElementsContainer =  document.querySelector(".round__position__qty");
        roundsElementsContainer.innerHTML = "";

        for (let index = 0; index < timerAPP.totalRounds; index++) {
            const roundElement = document.createElement("div");
            roundElement.classList.add("round");
            roundsElementsContainer.appendChild(roundElement);
        }
    },

    updateRoundsCounter: () => {
        roundsAPP.round = parseInt(localStorage.getItem("worksCounter"));
        roundsAPP.roundsContainer = document.querySelector(".rounds__counter");
        roundsAPP.roundsContainer.innerHTML =
            '<div class="actual__round">' +
            `Round ${roundsAPP.round + 1}` + " / " +
            '</div>' +
            '<div class="total__rounds">' +
            `${timerAPP.totalRounds}` +
            '</div>';

            const rounds = document.querySelectorAll(".round");
            rounds.forEach(() => {
                rounds[roundsAPP.round].classList.add("round__position");
                
                rounds.forEach((element) => {
                    if (element != rounds[roundsAPP.round]) {
                        element.classList.remove("round__position");
                    }
                });
            });
    },

    updateBreakStatus: () => {
        const roundsContainer = document.querySelector(".rounds__counter");
        roundsContainer.innerHTML = '<p>' + "Taking a Break" + '</p>';
    }
};
