const Game = (function (url) {
    let configMap = {
        apiUrl: url
    }

    let stateMap = {
        prev: null,
        gameState: null,
        gameId: "",
        playerId: "",
    };

    let polling;

    async function placeFiche(x, y) {
        if (!aanDeBeurt()) return;
        await Game.Data.put(`/api/spel/${stateMap.gameId}/zet?token=${stateMap.playerId}&kolom=${y}&rij=${x}`)
        await _getCurrentGameState();
    }

    function aanDeBeurt() {
        let token = stateMap.gameState.aandeBeurt === 1 ? stateMap.gameState.speler1Token : stateMap.gameState.speler2Token;
        return token === stateMap.playerId;
    }

    async function _getCurrentGameState() {
        let first = stateMap.gameState === null;

        stateMap.gameState = await Game.Model.getGameState(stateMap.gameId);

        if (first) {
            Game.Reversi.showBoard(stateMap.gameState.bord);
            Game.Stats.addData(stateMap.gameState);
        } else {
            let changed = false;
            for (let x = 0; x < 8; x++) {
                for (let y = 0; y < 8; y++) {
                    let prev = stateMap.prev.bord[y][x];
                    let now = stateMap.gameState.bord[y][x];

                    if (prev !== now) {
                        changed = true;
                        Game.Reversi.showFiche(x, y, now)
                    }
                }
            }

            if (changed) {
                Game.Stats.addData(stateMap.gameState);
            }
        }

        let beurt = document.querySelector(".beurt");

        if (stateMap.gameState.status === 2) {
            if (aanDeBeurt()) {
                $.get(`https://localhost:5002/Spel/Finish/${stateMap.gameId}`).then(r => r);
            }

            clearInterval(polling);

            let p1 = stateMap.gameState.bord.map(v => v.filter(l => l === 1).length).reduce((i1, i2) => i1 + i2);
            let p2 = stateMap.gameState.bord.map(v => v.filter(l => l === 2).length).reduce((i1, i2) => i1 + i2);

            let isP1 = stateMap.gameState.speler1Token === stateMap.playerId;

            if (p1 > p2) {
                beurt.innerHTML = isP1 ? "Gewonnen" : "Verloren";
            } else if (p2 > p1) {
                beurt.innerHTML = isP1 ? "Verloren" : "Gewonnen";
            } else {
                beurt.innerHTML = "Gelijk spel"
            }
        } else {
            beurt.innerHTML = "Beurt: " + (aanDeBeurt() ? "Jouw" : "Hun")
        }

        stateMap.prev = stateMap.gameState;
    }

    function _init(game, player) {
        stateMap.gameId = game;
        stateMap.playerId = player;

        Game.Data.init("https://localhost:5001", "production");
        Game.Model.init();
        Game.Template.init();
        Game.API.init();
        Game.Stats.init();
        Game.Reversi.init();

        _getCurrentGameState();
        polling = setInterval(_getCurrentGameState, 2000);
    }

    return {
        init: _init,
        placeFiche,
    }
})('/api/url')