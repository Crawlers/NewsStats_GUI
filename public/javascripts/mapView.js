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

for (var i=0; i<crimesByDistrict.length; i++) { 
   data.push({
	"hc-key": 'lk-' + districtCodes[crimesByDistrict[i]._id],
	"value": crimesByDistrict[i].count
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

//functions

function rgbToHex(r, g, b) {
	 return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	 function componentToHex(c) {
		  var hex = c.toString(16);
		  return hex.length == 1 ? "0" + hex : hex;
	 }
}


