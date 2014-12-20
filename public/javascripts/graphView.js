
FusionCharts.ready(function(){
    var revenueChart = new FusionCharts({
        "type": "column2d",
        "renderAt": "chartContainer",
        "width": "500",
        "height": "300",
        "dataFormat": "json",
        "dataSource":  {
          "chart": {
            "caption": "Crime Statistics Sri Lanka",
            "subCaption": "by crawlers",
            "xAxisName": "District",
            "yAxisName": "Number of Crimes",
            "theme": "fint"
         },
         "data": [
            {
               "label": "Colombo",
               "value": "420"
            },
            {
               "label": "Kandy",
               "value": "81"
            },
            {
               "label": "Matara",
               "value": "720"
            },
            {
               "label": "Gampaha",
               "value": "550"
            }
          ]
      }

  });
revenueChart.render();
});