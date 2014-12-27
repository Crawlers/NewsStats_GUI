var districtCodes = {
	Ampara : "AP",
	Anuradhapura : "AD",
	Badulla : "BD",
	Batticaloa : "BC",
	Colombo : "CO",
	Galle : "GL",
	Gampaha : "GQ",
	Hambantota : "HB",
	Jaffna : "JA",
	Kalutara : "KT",
	Kandy : "KY",
	Kegalle : "KE",
	Kilinochchi : "KL",
	Kurunegala : "KG",
	Mannar : "MB",
	Matale : "MT",
	Matara : "MH",
	Moneragala : "MJ",
	Mullaitivu : "MP",
	'Nuwara Eliya' : "NW",
	Polonnaruwa : "PR",
	Puttalam : "PX",
	Ratnapura : "RN",
	Trincomalee : "TC",
	Vavuniya : "VA"
}

var crimesByDistrict, crimes;


drawMap(crimesByDistrict);
drawControls();

function drawControls(){
var crimeTypes = {};
var crimeYears = {};
for (var i=0; i<crimes.length; i++) { 
	crimeTypes[crimes[i].crime_type] = true;
	crimeYears[crimes[i].crime_year] = true;
}

var html = '<input type="hidden" class="crime_type_cb" name="crime_type" value="sdf89fd0">';
for (var type in crimeTypes) { 
	html += '<input type="checkbox" class="crime_type_cb" name="crime_type" value=' + type + ' checked="checked">' + type + '<br>';
}
$('#controls_type').html(html);

html = '<input type="hidden" class="crime_type_cb" name="crime_year" value="sdf89fd0">';
for (var year in crimeYears) { 
	html += '<input type="checkbox" class="crime_year_cb" name="crime_year" value=' + year + ' checked="checked">' + year + '<br>';
}
$('#controls_year').html(html);
}

function drawMap(crimesByDistrict){

var data = [];
var color = [];

var maxCount = 0;			
for (var i=0; i<crimesByDistrict.length; i++) { 
	if (crimesByDistrict[i].count > maxCount) 
       maxCount = crimesByDistrict[i].count;
}

for (var i=0; i<crimesByDistrict.length; i++) { 
   data.push({
	"id": 'LK.' + districtCodes[crimesByDistrict[i]._id],
	"value": crimesByDistrict[i].count.toString()
   });
};

for (var i=0; i<crimesByDistrict.length; i++) { 
	var colorParam = Math.floor((255/maxCount)*crimesByDistrict[i].count);
	color.push({
		"minvalue": (crimesByDistrict[i].count-1).toString(),
		"maxvalue": crimesByDistrict[i].count.toString(),
		"code": rgbToHex(255-colorParam, 255-colorParam ,255-colorParam)
	});
}




FusionCharts.ready(function(){
    var populationMap = new FusionCharts({
        type: 'maps/srilanka',
        renderAt: 'mapContainer',
        width: '400',
        height: '400',
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "caption": "Crime Dencity Map of Sri Lanka",
                "theme": "fint",
                "formatNumberScale": "0",
				"showBorder": 1,
				"showLegend": 0,
				"nullEntityColor": "#E0F0E0"
            },
            "data": data,
            "colorrange": {
			    "color": color
			}
        }
    }).render();
});
}

$(document).on("click",".crime_type_cb , .crime_year_cb",function(){
    var types = $("#form_crime_types").serializeArray().map(function(v){return {crime_type: v.value}});
	var years = $("#form_crime_years").serializeArray().map(function(v){return {crime_year: v.value}});
    $.post( "filterMapData", {$and: [{$or : types}, {$or : years}]})
	  .done(function( data ) {
	    console.log(data);
        drawMap( JSON.parse(data) );
    });
});


//functions

function rgbToHex(r, g, b) {
	 return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	 function componentToHex(c) {
		  var hex = c.toString(16);
		  return hex.length == 1 ? "0" + hex : hex;
	 }
}


