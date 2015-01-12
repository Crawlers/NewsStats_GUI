var crimesByTypeAndYear, crimes, axis;
drawGraph(crimesByTypeAndYear, axis);
function drawGraph(crimesByTypeAndYear, axis){
var category1 = {};
var category2 = {};
var series = [];
var sum = [];
var avarage = [];
var pieData = [];
var countsForPie = [];

for (var i=0; i<crimes.length; i++) {
   
	category1[crimes[i]["crime_"+axis.x]] = true;
	category2[crimes[i]["crime_"+axis.y]] = true;
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
for (var i in crimesByTypeAndYear){
    countsForPie.push(crimesByTypeAndYear[i].count);
    var name = crimesByTypeAndYear[i]._id;
	var types = {};
	crimesByTypeAndYear[i].crime_types.forEach(
		function(v,i){
			return types[v.crime_type] = v.count; 
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
		type: 'column',
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
		
$('#chartContainer').highcharts({
        title: {
            text: 'Crime Statistics'
        },
		chart: {
			backgroundColor: '#FAF0E6',
			borderColor: '#000000'
		},
        xAxis: {
            categories: category1Array
        },
		credits: {
          enabled: false
        },
        series: series
});
}
