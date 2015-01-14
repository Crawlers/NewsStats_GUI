var chartData, axis;
drawChart(chartData);

function drawChart(chartData){
	axis = chartData.axis;
	var series = [];
	var sum = [];
	var avarage = [];

	//create serials
	var frqData = chartData.frequencyData;
	var field1 = chartData.distinctData.field1.sort();
	var field2 = chartData.distinctData.field2.sort();
	field1.forEach(function(){
		sum.push(0);
	});
	
	for (var i in frqData){
		var name = frqData[i]._id;
		var types = {};
		frqData[i].data.forEach(
			function(v,i){
				return types[v.field] = v.count; 
			}
		);
		var data = [];
		var count = 0;
		for (var i=0; i<field1.length; i++){
			if (!types.hasOwnProperty(field1[i])){
				data.push(0);
			} else {
				data.push(types[field1[i]]);
				sum[count] += types[field1[i]];
			}
			count++;
		}
		series.push({
			type: chartProperties.type,
			name: name,
			data: data
		});
	}

	avarage = sum.map(function(v,i){
		return v/field2.length;
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
	$('#'+chartProperties.componentId).highcharts({
				title: {
					text: chartProperties.title
				},
				chart: {
					backgroundColor: '#FAF0E6',
					borderColor: '#000000',
					height: 500
				},
				xAxis: {
					title: { text: chartProperties.xAxis.title},
					categories: field1
				},
				yAxis: {
					title: { text: chartProperties.yAxis.title},
					min: 0
				},
				legend : chartProperties.legend,
				credits: {
				  enabled: false
				},
				series: series
		});	
}