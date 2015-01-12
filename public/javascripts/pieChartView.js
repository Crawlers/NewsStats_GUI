var crimesByYear, crimeTypes, crimeYears;
var series = [];
var pieCount = crimeYears.length;
var piesWidth = 900;
var pieWidth = 150;
var widthPerPC = piesWidth/pieCount;
var pieXPos = widthPerPC/2-pieWidth/4;
console.log(pieXPos);
for (var i in crimesByYear){
	var data = [];
	var types = {};
	crimesByYear[i].crime_types.forEach(function(v){
		types[v.crime_type] = v.count;
	});
	for(var j=0; j<crimeTypes.length; j++){
	    var count = (types.hasOwnProperty(crimeTypes[j]))?types[crimeTypes[j]]:0;
		data.push([crimeTypes[j],count]);
	}
	var showLegend = (i==0);
	series.push({
            type: 'pie',
            name: 'percentage',
			size: 150,
	       center: [pieXPos, null],
			showInLegend: showLegend,
			dataLabels: {
				enabled: false
			},
            data: data
        });
	
    pieXPos += widthPerPC;
}

var pieChart = $('#pieChartsForEachYear').highcharts({
	chart: {
		plotBackgroundColor: null,
		plotBorderWidth: 1,//null,
		plotShadow: false,
		backgroundColor: '#FAF0E6',
		width : 900,
		height : 400
	},
	title: {
		text: 'Crime type distribution for each year',
		style: {'text-decoration': 'underline'}
	},
	tooltip: {
		pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	},
	credits: {
	  enabled: false
	},
	plotOptions: {
		pie: {
			allowPointSelect: true,
			cursor: 'pointer',
			dataLabels: {
				enabled: false,
				format: '<b>{point.name}</b>: {point.percentage:.1f} %',
				style: {
					color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
				}
			},
		}
    
	},
	legend : {enabled: true},
	series: series
},function(chart) {    
        $(chart.series[0].data).each(function(i, e) {
			 e.legendGroup.on('mouseenter', function(event) {
                var legendItem=e.name;
                
                event.stopPropagation();
                
                $(chart.series).each(function(j,f){
				       var that = this;
                       $(this.data).each(function(k,z){
                           if(z.name==legendItem)
                           {
						       if (!z.selected){
									z.select(null,true); 
							   }
                           }
                       });
                });
			});
			e.legendGroup.on('mouseleave', function(event) {
                var legendItem=e.name;
                
                event.stopPropagation();
                
                $(chart.series).each(function(j,f){
						var that = this;
                       $(this.data).each(function(k,z){
                           if(z.name==legendItem)
                           {
                               if (z.selected){
									z.select(false); 
							   }
                           }
                       });
                });
			});
            e.legendGroup.on('click', function(event) {
                var legendItem=e.name;
                
                event.stopPropagation();
                
                $(chart.series).each(function(j,f){
                       $(this.data).each(function(k,z){
                           if(z.name==legendItem)
                           {
                               if(z.visible)
                               {
                                   z.setVisible(false);
                               }
                               else
                               {
                                   z.setVisible(true);
                               }
                           }
                       });
                });
                
            });
			var leftX = 10 + widthPerPC/2 - pieWidth/4;
			for (var i in crimesByYear){
				chart.renderer.text(crimesByYear[i]._id, leftX, 300).css({
					color: '#444',
					fontSize: '16px'
				}).add();
			    leftX  += widthPerPC;
			}
        });
    });
	
	drawControlls();
	$.post( "filterPieChartData", {years: crimeYears.map(function(v){return {crime_year: v}})}).done(function( data ) {
		  drawPieChart(JSON.parse(data));
	});
	
	function drawControlls(){
        var html = '<table><tr><td><b>Year :</b><input type="hidden" class="pie_chart_cb" name="crime_year" value="sdf89fd0">';
		for (var i in crimeYears) { 
			html += '</td><td></td><td><input type="checkbox" class="pie_chart_cb" name="crime_year" value=' + crimeYears[i] + ' checked="checked">' + crimeYears[i] + '<br>';
		}
		html += '</td></tr></table>';
		$('#pie_chart_control_form').html(html);
    }
	
	function drawPieChart(crimesByType){
		var data = [];
		var types = {};
		crimesByType.forEach(function(v){
			types[v._id] = v.count;
		});
	    for(var j=0; j<crimeTypes.length; j++){
			var count = (types.hasOwnProperty(crimeTypes[j]))?types[crimeTypes[j]]:0;
			data.push([crimeTypes[j],count]);
		}
		$('#totalPieChart').highcharts({
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: 1,//null,
				plotShadow: false,
				backgroundColor: '#FAF0E6',
				width : 900,
				height : 400
			},
			title: {
				text: 'Total crime type distribution',
				style: {'text-decoration': 'underline'}
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			credits: {
			  enabled: false
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b>: {point.percentage:.1f} %',
						style: {
							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
						}
					},
				}
			
			},
			legend : {enabled: false},
			series: [{
				type: 'pie',
				name: 'percentage',
				data: data
				}]
		});
	}