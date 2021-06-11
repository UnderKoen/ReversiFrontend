Game.Model = (function () {
    let configMap = {}

    async function _getGameState(token) {
        let v = await Game.Data.get(`/api/spel/${token ?? ""}`);
        convertBoard(v);
        return v;
    }

    function convertBoard(gameState) {
        let board = gameState.bord;

        let newBoard = [];
        for (let i = 0; i < 8; i++) {
            newBoard.push([0,0,0,0,0,0,0,0]);
        }

        for (let pos in board) {
            let color = board[pos];
            let split = pos.split(",");
            newBoard[split[0]][split[1]] = color;
        }

        gameState.bord = newBoard;
    }

    async function getWeather() {
        let v = await Game.Data.getWeather();

        if (!v?.main?.temp) {
            throw new Error();
        }

        return v;
    }

    function _init() {
    }

    return {
        init: _init,
        getGameState: _getGameState
    }
})()