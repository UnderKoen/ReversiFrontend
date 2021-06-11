Game.Reversi = (function () {
    let configMap = {
        boardTemplate: "board.body",
    }

    function _init() {
        showApiData();
    }

    function showBoard(bord) {
        const board = document.querySelector(".board");

        board.innerHTML = Game.Template.parseTemplate(configMap.boardTemplate, {
            board: bord,
        });

        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                let place = document.querySelector(`.board__row__element--y-${y}.board__row__element--x-${x}`);
                place.addEventListener("click", evt => {
                    if (place.children.length > 0) return;
                    Game.placeFiche(x, y);
                })
            }
        }
    }

    function showFiche(x, y, player) {
        let place = document.querySelector(`.board__row__element--y-${y}.board__row__element--x-${x}`);

        let fiche = document.createElement("div");
        fiche.classList.add("fiche");
        fiche.classList.add(`fiche--${player}`);

        place.innerHTML = "";
        place.append(fiche);
    }

    async function showApiData() {
        let number = Math.floor(Math.random() * 1000);
        let even = await Game.API.isEven(number);

        let x = document.querySelector(".apiData");

        x.innerHTML = Game.Template.parseTemplate("api.isEven", {number: number, even: even});
    }

    return {
        init: _init,
        showFiche,
        showBoard,
    }
})()