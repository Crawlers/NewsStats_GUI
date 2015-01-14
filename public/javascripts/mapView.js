var districtCodes = {
	Ampara : "ap",
	Anuradhapura : "ad",
	Badulla : "bd",
	Batticaloa : "bc",
	Colombo : "co",
	Galle : "gl",
	Gampaha : "gq",
	Hambantota : "hb",
	Jaffna : "ja",
	Kalutara : "kt",
	Kandy : "ky",
	Kegalle : "ke",
	Kilinochchi : "kl",
	Kurunegala : "kg",
	Mannar : "mb",
	Matale : "mt",
	Matara : "mh",
	Moneragala : "mj",
	Mullaitivu : "mp",
	'Nuwara Eliya' : "nw",
	Polonnaruwa : "pr",
	Puttalam : "px",
	Ratnapura : "rn",
	Trincomalee : "tc",
	Vavuniya : "va"
}

var mapData;
drawMap(mapData.frequencyData);
drawControls();

function drawControls(){
	var html = '<input type="hidden" class="mapview_field1_cb" name="mapview_field1" value="sdf89fd0">';
	var field1 = mapData.distinctData.field1.sort();
	for (var i in field1) { 
		html += '<input type="checkbox" class="mapview_field1_cb" name="mapview_field1" value=' + field1[i] + ' checked="checked">' + field1[i] + '<br>';
	}
	$('#mapview_field1_controls').html(html);

	html = '<input type="hidden" class="mapview_field2_cb" name="mapview_field2" value="sdf89fd0">';
	var field2 = mapData.distinctData.field2.sort();
	for (var i in field2) { 
		html += '<input type="checkbox" class="mapview_field2_cb" name="mapview_field2" value=' + field2[i] + ' checked="checked">' + field2[i] + '<br>';
	}
	$('#mapview_field2_controls').html(html);
	
	$(document).off("click",".mapview_field1_cb , .mapview_field2_cb");
	$(document).on("click",".mapview_field1_cb , .mapview_field2_cb",function(){
		var types = $("#mapview_field1_form").serializeArray().map(function(v){return {crime_type: v.value}});
		var years = $("#mapview_field2_form").serializeArray().map(function(v){return {crime_year: v.value}});
		$.post( "filterMapData", {$and: [{$or : types}, {$or : years}]})
		  .done(function( data ) {
			drawMap( JSON.parse(data) );
		});
	});
}

function drawMap(frequencyData){

var data = [];

for (var i=0; i<frequencyData.length; i++) { 
   data.push({
	"hc-key": 'lk-' + districtCodes[frequencyData[i]._id],
	"value": frequencyData[i].count
   });
}


    // Initiate the chart
    $('#mapContainer').highcharts('Map', {

        title : {
            text : 'Crime Dencity Map of Sri Lanka'
        },


        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },
		
		chart: {
			backgroundColor: '#FAF0E6',
			borderColor: '#000000'
		},

        colorAxis: {
            min: 0,
			maxColor: '#FF0000',
			minColor: '#FFFFFF'
        },
		credits: {
            enabled: false
        },

        series : [{
            data : data,
            mapData: Highcharts.maps['countries/lk/lk-all'],
            joinBy: 'hc-key',
            name: 'no of crimes',
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }]
    });

}