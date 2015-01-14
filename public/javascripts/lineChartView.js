var barChartData, axis;
drawBarChart(barChartData);
	
function drawBarChart(barChartData){
	axis = barChartData.axis;
	var category1 = {};
	var category2 = {};
	var series = [];
	var sum = [];
	var avarage = [];
	var pieData = [];
	var countsForPie = [];

	var col = barChartData.collection;
	for (var i=0; i<col.length; i++) {
	   
		category1[col[i][axis.x]] = true;
		category2[col[i][axis.y]] = true;
	}

	var category1Array = $.map(category1, function(value, index) {
		return [index];
	});
	var category2Array = $.map(category2, function(value, index) {
		return [index];
	});
	category1Array.forEach(function(){
		sum.push(0);
	});

	//create serials
	var frqData = barChartData.frequencyData;
	for (var i in frqData){
		countsForPie.push(frqData[i].count);
		var name = frqData[i]._id;
		var types = {};
		frqData[i].data.forEach(
			function(v,i){
				return types[v.field] = v.count; 
			}
		);
		var data = [];
		var count = 0;
		for (var i in category1){
			if (!types.hasOwnProperty(i)){
				data.push(0);
			} else {
				data.push(types[i]);
				sum[count] += types[i];
			}
			count++;
		}
		series.push({
			type: 'line',
			name: name,
			data: data
		});
	}

	avarage = sum.map(function(v,i){
		return v/category2Array.length;
	});

	series.push({
				type: 'spline',
				name: 'Average',
				data: avarage,
				marker: {
					lineWidth: 2,
					lineColor: Highcharts.getOptions().colors[0],
					fillColor: 'white'
				}
			});

	category2Array.forEach(function(v,i){
		var data = {};
		data.name = v;
		data.y = countsForPie[i];
		data.color = Highcharts.getOptions().colors[i];
		pieData.push(data);
	});
			
	$('#lineChartContainer').highcharts({
	    chart: {
			backgroundColor: '#FAF0E6',
			borderColor: '#000000'
		},
        title: {
            text: 'Crime Distribution - Line Chart',
            x: -20 //center
        },
        xAxis: {title: {
                text: 'Quarter'
            },
            categories: barChartData.distinctData.field1.sort()
        },
        yAxis: {
            title: {
                text: 'Crime Frequncy'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
		credits: {
			  enabled: false
			},
        series: series
    });
}