var mapView = require('../view_types/map-view.js');
var barChartView = require('../view_types/bar-chart-view.js');
var pieChartView = require('../view_types/pie-chart-view.js');

var metadata = {collection: 'crimes'};
metadata.field = {location: 'crime_district', frequency: 'crime_count', field1: 'crime_type', field2: 'crime_year'};
metadata.alias = {location: 'District', frequency: 'Crime Count', field1: 'Crime Type', field2: 'Crime Year'};
var crimeMapView = new mapView(metadata);

var metadata = {collection: 'crimes'};
metadata.field = {frequency: 'crime_count', field1: 'crime_year', field2: 'crime_type'};
metadata.alias = {frequency: 'Crime Count', field1: 'Crime Year', field2: 'Crime Type'};
var crimeBarChartView = new barChartView(metadata);
var crimePieChartView = new pieChartView(metadata);

module.exports = {
	crimeMapView : crimeMapView,
	crimeBarChartView : crimeBarChartView,
	crimePieChartView : crimePieChartView
};