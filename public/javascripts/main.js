
$(document).ready(function(){  
	var url = document.URL;
	if (url.indexOf('#') == -1){
		visitUrl.call($('#nav a[href="#home"]')[0]);
	} else {
		var splitedUrl = url.split('#');
		if (splitedUrl[1] == ""){
			visitUrl.call($('#nav a[href="#home"]')[0]);
		} else {
			visitUrl.call($('#nav a[href="#'+splitedUrl[1]+'"]')[0]);
		}
	}
	
	$('#nav .url').click(function(){
		visitUrl.call(this);
	});
	
	$(document).on("click",".crime_type_cb , .crime_year_cb",function(){
		var types = $("#form_crime_types").serializeArray().map(function(v){return {crime_type: v.value}});
		var years = $("#form_crime_years").serializeArray().map(function(v){return {crime_year: v.value}});
		$.post( "filterMapData", {$and: [{$or : types}, {$or : years}]})
		  .done(function( data ) {
			drawMap( JSON.parse(data) );
		});
	});
	
	$(document).on("click",".axis_control_rb",function(){
	   var input = $(this).val();
	   var axis =(input == 'type')?{x:'type',y:'year'}:{y:'type',x:'year'};
	   $.post( "filterGraphData", axis)
		  .done(function( data ) {
			drawGraph(JSON.parse(data),axis);
		});
	});
	
});

function visitUrl(){
		var href = this.href.replace('#', '');
		$('#nav li').removeClass('current');
		var currentNode = this;
		while((currentNode.parentNode).id != "nav"){
			currentNode = currentNode.parentNode;
		}
		$(currentNode).addClass('current');
		$('#loading').show();
		$.get(href,function(data,status){
			$('#container').html(data);
			$('#loading').hide()
		});
}