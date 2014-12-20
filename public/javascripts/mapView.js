
FusionCharts.ready(function(){
    var populationMap = new FusionCharts({
        type: 'maps/srilanka',
        renderAt: 'mapContainer',
        width: '600',
        height: '400',
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "caption": "Crime Statistics",
                "theme": "fint",
                "formatNumberScale": "0",
                "numberSuffix": "M"
            },
            "colorrange": {
                "color": [{
                    "minvalue": "0",
                    "maxvalue": "100",
                    "code": "#E0F0E0",
                    "displayValue": "Below 100M"
                }, {
                    "minvalue": "100",
                    "maxvalue": "500",
                    "code": "#D0DFA3",
                    "displayValue": "100-500M"
                }, {
                    "minvalue": "500",
                    "maxvalue": "1000",
                    "code": "#B0BF92",
                    "displayValue": "500-1000M"
                }, {
                    "minvalue": "1000",
                    "maxvalue": "5000",
                    "code": "#91AF64",
                    "displayValue": "Above 1B"
                }]
            },
            "data": [{
                "id": "LK.KL",
                "value": "515"
            }, {
                "id": "LK.JA",
                "value": "373"
            }, {
                "id": "LK.MJ",
                "value": "3875"
            }, {
                "id": "LK.MH",
                "value": "727"
            }, {
                "id": "LK.KE",
                "value": "885"
            }, {
                "id": "LK.KY",
                "value": "32"
            }]
        }
    }).render();
});