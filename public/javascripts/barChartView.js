var chartProperties = {
	type: 'column',
	title: 'Crime distribution - bar chart',
	xAxis: {title: ''},
	yAxis: {title: '<b>Crime Frequency</b>'},
	legend: { layout: 'vertical', align: 'right', verticalAlign: 'middle',borderWidth: 0},
	componentId: 'barChartContainer'
};

$(document).off("click",".bc_axis_control_rb");
$(document).on("click",".bc_axis_control_rb",function(){
	   var input = $(this).val();
	   var axs = {x: axis.y,y: axis.x};
	   $.post( "filterBarChartData", axs)
		  .done(function( data ) {
			drawChart(JSON.parse(data));
	});
});
	