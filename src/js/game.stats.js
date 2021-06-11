Game.Stats = (function () {
    let configMap = {}

    let myChart;

    let p1Fiches = [];
    let p2Fiches = [];

    function _init() {
        update();
    }

    function update() {
        let ctx = $('#myChart');
        myChart?.destroy();
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: p1Fiches.map((value, index) => index + 1),
                datasets: [{
                    label: 'Player 1',
                    data: p1Fiches,
                    fill: false,
                    borderColor: 'rgb(46,78,78)',
                    tension: 0.1
                }, {
                    label: 'Player 2',
                    data: p2Fiches,
                    fill: false,
                    borderColor: 'rgb(135,212,212)',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function addData(data) {
        let p1 = data.bord.map(v => v.filter(l => l === 1).length).reduce((i1, i2) => i1 + i2);
        let p2 = data.bord.map(v => v.filter(l => l === 2).length).reduce((i1, i2) => i1 + i2);

        p1Fiches.push(p1);
        p2Fiches.push(p2);

        update();
    }

    return {
        init: _init,
        addData,
    }
})()