var pieChartData;
var series = [];
var pieCount = pieChartData.distinctData.field2.length;
var piesWidth = 900;
var pieWidth = 150;
var widthPerPC = piesWidth/pieCount;
var pieXPos = widthPerPC/2-pieWidth/4;

var frqData = pieChartData.frequencyData;
for (var i in frqData){
	var data = [];
	var types = {};
	frqData[i].data.forEach(function(v){
		types[v.field] = v.count;
	});
	
	var field1 = pieChartData.distinctData.field1.sort();
	for(var j=0; j<field1.length; j++){
	    var count = (types.hasOwnProperty(field1[j]))?types[field1[j]]:0;
		data.push([field1[j],count]);
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
		text: pieChartData.metadata.params.title2
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
			for (var i in frqData){
				chart.renderer.text(frqData[i]._id, leftX, 300).css({
					color: '#444',
					fontSize: '16px'
				}).add();
			    leftX  += widthPerPC;
			}
        });
    });
	
	$(document).off("click",".pie_chart_cb");
	$(document).on("click",".pie_chart_cb",function(){
	   var $or = $("#pie_chart_control_form").serializeArray().map(function(v){var obj = {}; obj[pieChartData.metadata.field.field1] = v.value; return obj;});
	   $.post( pieChartData.metadata.collection+"_filterPieChartData", {'$or': $or})
		  .done(function( data ) {
		  drawPieChart(JSON.parse(data));
		});
	});
	
	drawControlls();
	var field2 = pieChartData.distinctData.field2.sort();
	var $or = field2.map(function(v){var obj = {}; obj[pieChartData.metadata.field.field1] = v; return obj;});
	$.post( pieChartData.metadata.collection+"_filterPieChartData", {'$or' : $or}).done(function( data ) {
		  drawPieChart(JSON.parse(data));
	});
	
	function drawControlls(){
	    var field2 = pieChartData.distinctData.field2.sort();
        var html = '<table><tr><td><b>Year :</b><input type="hidden" class="pie_chart_cb" name="crime_year" value="sdf89fd0">';
		for (var i in field2) { 
			html += '</td><td></td><td><input type="checkbox" class="pie_chart_cb" name="crime_year" value="' + field2[i] + '" checked="checked">' + field2[i] + '<br>';
		}
		html += '</td></tr></table>';
		$('#pie_chart_control_form').html(html);
    }
	
	function drawPieChart(freqData){
	
		var data = [];
		var types = {};
		freqData.forEach(function(v){
			types[v._id] = v.count;
		});
		
		var field1 = pieChartData.distinctData.field1.sort();
	    for(var j=0; j<field1.length; j++){
			var count = (types.hasOwnProperty(field1[j]))?types[field1[j]]:0;
			data.push([field1[j],count]);
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
				text: pieChartData.metadata.params.title1
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