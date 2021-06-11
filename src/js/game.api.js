Game.API = (function () {
    let configMap = {
    }

    async function isEven(number) {
        let data = await Game.Data.isEven(number);
        //remove the ad :P

        return data.iseven;
    }


    function _init() {

    }

    return {
        init: _init,
        isEven,
    }
})()