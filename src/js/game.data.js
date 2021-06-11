Game.Data = (function () {
    let configMap = {
        apiKey: "3421a4500faea1687908bb1feb1a9742",
        url: "",
        mock: [
            {
                url: "/api/Spel/Beurt/",
                data: 0,
            }
        ]
    }

    let stateMap = {
        environment: "development",
    };

    function get(url) {
        if (stateMap.environment === "development") return getMockData(url);

        return $.get(configMap.url + url)
            .then(r => {
                return r
            })
            .catch(e => {
                console.log(e.message);
            });
    }

    function put(url) {
        if (stateMap.environment === "development") return getMockData(url);

        return new Promise(resolve => {
            $.ajax({
                url: configMap.url + url,
                type: 'PUT',
                success: function (r) {
                    resolve(r);
                }
            })
        });
    }

    const getMockData = function (url) {
        const mockData = configMap.mock.filter(m => m.url === url)[0];

        return new Promise(resolve => {
            resolve(mockData.data);
        });
    }

    async function getWeather() {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=zwolle&apikey=${configMap.apiKey}`;
        return await $.get(url);
    }

    async function isEven(number) {
        let url = `https://api.isevenapi.xyz/api/iseven/${number}`;
        return await $.get(url);
    }

    function _init(url, environment) {
        configMap.url = url;
        if (environment) {
            if (!(environment === "development" || environment === "production")) {
                throw new Error();
            }

            stateMap.environment = environment;
        }
    }

    return {
        init: _init,
        get,
        put,
        getWeather,
        isEven,
    }
})()