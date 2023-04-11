const roundsAPP = {
    round: 0,
    roundsContainer: null,

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
                console.log(roundsAPP.round);
                
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