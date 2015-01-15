//map view
function MapView(metadata){
	this.metadata = metadata;
}

MapView.prototype.render = function(req,res){
    var obj = this;
	var collection = req.db.get(obj.metadata.collection);
	var loc = '$'+obj.metadata.field.location;
	var frq = '$'+obj.metadata.field.frequency;
	collection.col.aggregate([
	  {$group: { _id: loc,  count: {$sum: frq}}}
	],function(e,results2){
		var input = obj.metadata.field.field1;
		collection.distinct(input,function(e,results3){
			var input = obj.metadata.field.field2;
			collection.distinct(input,function(e,results4){
				var output = {};
				output.frequencyData = results2;
				output.distinctData = {};
				output.distinctData.field1 =  results3;
				output.distinctData.field2 = results4;
				output.metadata = obj.metadata;
				res.render('mapView', {
					data : output
				});
			});
		});
   });
}

MapView.prototype.sendFiteredData = function(req,res){
	var obj = this;
	var collection = req.db.get(obj.metadata.collection);
	var loc = '$'+obj.metadata.field.location;
	var frq = '$'+obj.metadata.field.frequency;
	collection.col.aggregate([
			{$match: req.body},
			{$group: { _id: loc,  count: {$sum: frq}}}
		],function(e,results){
			res.render('postResults', {
				"output" : results
			});
	});
}

//bar chart view 
function GraphView(metadata,view){
	this.metadata = metadata;
	this.view = view;
}

GraphView.prototype.render = function(req,res){
    var obj = this;
	var axis = {x: obj.metadata.field.field1, y:obj.metadata.field.field2};
	var collection = req.db.get(obj.metadata.collection);
	var $frq = '$'+obj.metadata.field.frequency;
	var f1 = obj.metadata.field.field1;
	var f2 = obj.metadata.field.field2;
	var $f1 = '$'+f1;
	var $f2 = '$'+f2;
	var x = obj.metadata.field.field1;
	var y = obj.metadata.field.field2;
	var _id = {};
	_id[x] = $f1;
	_id[y] = $f2;
	collection.col.aggregate([
	  {$group: { _id: _id, count1: {$sum: $frq}}},
	  {$group: { 
		  _id: "$_id."+f2,
		  data: {
			  $push: {
				field: "$_id."+f1,
				count: "$count1"
			  },
		  },
		  count: {$sum: "$count1"}
	  }},
	  {$sort: {_id: 1}}
	],function(e,results2){
		collection.distinct(x,function(e,results3){
			collection.distinct(y,function(e,results4){
				output = {};
				output.frequencyData = results2;
				output.distinctData = {};
				output.distinctData.field1 =  results3;
				output.distinctData.field2 = results4;
				output.metadata = obj.metadata;
				output.axis = {x: x , y: y};
				res.render(obj.view, {
					data : output
				});
			});
		});
   });
}

GraphView.prototype.sendFiteredData = function(req,res){
	var obj = this;
	var axis = {x: obj.metadata.field.field1, y:obj.metadata.field.field2};
	var collection = req.db.get(obj.metadata.collection);
	var $frq = '$'+obj.metadata.field.frequency;
	var f1 = obj.metadata.field.field1;
	var f2 = obj.metadata.field.field2;
	var $f1 = '$'+f1;
	var $f2 = '$'+f2;
	var x = req.body.x;
	var y = req.body.y;
	var _id = {};
	_id[x] = $f1;
	_id[y] = $f2;
	collection.col.aggregate([
	  {$group: { _id: _id, count1: {$sum: $frq}}},
	  {$group: { 
		  _id: "$_id."+f2,
		  data: {
			  $push: {
				field: "$_id."+f1,
				count: "$count1"
			  },
		  },
		  count: {$sum: "$count1"}
	  }},
	  {$sort: {_id: 1}}
	],function(e,results2){
		collection.distinct(x,function(e,results3){
			collection.distinct(y,function(e,results4){
				output = {};
				output.frequencyData = results2;
				output.distinctData = {};
				output.distinctData.field1 =  results3;
				output.distinctData.field2 = results4;
				output.metadata = obj.metadata;
				output.axis = req.body;
				res.render('postResults', {
					output : output,
				});
			});
		});
	});
}

//pie chart view
function PieChartView(metadata){
	this.metadata = metadata;
}

PieChartView.prototype.render = function(req,res){
	var obj = this;
	var axis = {x: obj.metadata.field.field1, y:obj.metadata.field.field2};
	var collection = req.db.get(obj.metadata.collection);
	var $frq = '$'+obj.metadata.field.frequency;
	var f1 = obj.metadata.field.field1;
	var f2 = obj.metadata.field.field2;
	var $f1 = '$'+f1;
	var $f2 = '$'+f2;
	var y = obj.metadata.field.field1;
	var x = obj.metadata.field.field2;
	var _id = {};
	_id[x] = $f1;
	_id[y] = $f2;
	collection.col.aggregate([
	  {$group: { _id: _id, count1: {$sum: $frq}}},
	  {$group: { 
		  _id: "$_id."+f2,
		  data: {
			  $push: {
				field: "$_id."+f1,
				count: "$count1"
			  },
		  },
		  count: {$sum: "$count1"}
	  }},
	  {$sort: {_id: 1}}
	],function(e,results2){
		collection.distinct(x,function(e,results3){
			collection.distinct(y,function(e,results4){
				output = {};
				output.frequencyData = results2;
				output.distinctData = {};
				output.distinctData.field1 =  results3;
				output.distinctData.field2 = results4;
				output.metadata = obj.metadata
				res.render('pieChartView', {
					data : output
				});
			});
		});
	});
}

PieChartView.prototype.sendFiteredData = function(req,res){
	var obj = this;
	var $field1 = '$'+obj.metadata.field.field1;
	var $field2 = '$'+obj.metadata.field.field2;
	var collection = req.db.get(obj.metadata.collection);
	    collection.col.aggregate([
		  {$match: req.body},
		  {$group: { _id: {field1: $field1, field2: $field2}, count1: {$sum: 1}}},
		  {$group: { 
		      _id: "$_id.field2",
			  crime_years: {
				  $push: {
					field2: "$_id.field1",
					count: "$count1"
				  },
			  },
			  count: {$sum: "$count1"}
		  }},
		  {$sort: {_id: 1}}
		],function(e,results){
			res.render('postResults', {
				"output" : results
			});
	   });
}

//initiating views
var metadata = {collection: 'crimes'};
metadata.params = {title: 'Crime Dencity Map of Sri Lanka', filter_title1: 'Crime Type', filter_title2: 'Year'};
metadata.field = {location: 'crime_district', frequency: 'crime_count', field1: 'crime_type', field2: 'crime_year'};
metadata.alias = {location: 'District', frequency: 'Crime Count', field1: 'Crime Type', field2: 'Crime Year'};
var crimeMapView = new MapView(metadata);

var metadata = {collection: 'crimes'};
metadata.params = {title: 'Crime Distribution of Sri Lanka', xtitle1: 'Year', xtitle2: 'Crime Type'};
metadata.field = {frequency: 'crime_count', field1: 'crime_year', field2: 'crime_type'};
metadata.alias = {frequency: 'Crime Count', field1: 'Year', field2: 'Crime Type'};
var crimeBarChartView = new GraphView(metadata, 'barChartView');

var metadata = {collection: 'crimes'};
metadata.params = {title: 'Crime Distribution of Sri Lanka'};
metadata.field = {frequency: 'crime_count', field1: 'crime_year', field2: 'crime_type'};
metadata.alias = {frequency: 'Crime Count', field1: 'Year', field2: 'Crime Type'};
metadata.params = {title1: 'Total Crime Type Distribution of Sri Lanka', title2: 'Crime Type Distribution of Sri Lanka for Each Year'}
var crimePieChartView = new PieChartView(metadata);

var metadata = {collection: 'crimes'};
metadata.params = {title: 'Crime Distribution of Sri Lanka'};
metadata.field = {frequency: 'crime_count', field1: 'crime_yearquarter', field2: 'crime_type'};
metadata.alias = {frequency: 'Crime Frequency', field1: 'Quarter', field2: 'Crime Type'};
var crimeLineChartView = new GraphView(metadata, 'lineChartView');

var metadata = {collection: 'predictions'};
metadata.params = {title: 'Predicted Crime Dencity Map of Sri Lanka for 2014', filter_title1: 'Crime Type', filter_title2: 'Quarter'};
metadata.field = {location: 'crime_district', frequency: 'crime_count', field1: 'crime_type', field2: 'crime_yearquarter'};
metadata.alias = {location: 'District', frequency: 'Crime Frequency', field1: 'Crime Type', field2: 'Quarter'};
var predictionMapView = new MapView(metadata);

var metadata = {collection: 'predictions'};
metadata.params = {title: 'Predicted Crime Distribution of Sri Lanka for 2014', xtitle1: 'Quarter', xtitle2: 'Crime Type'};
metadata.field = {frequency: 'crime_count', field1: 'crime_yearquarter', field2: 'crime_type'};
metadata.alias = {frequency: 'Crime Count', field1: 'Quarter', field2: 'Crime Type'};
var predictionBarChartView = new GraphView(metadata, 'barChartView');

var metadata = {collection: 'predictions'};
metadata.field = {frequency: 'crime_count', field1: 'crime_yearquarter', field2: 'crime_type'};
metadata.alias = {frequency: 'Crime Count', field1: 'Quarter', field2: 'Crime Type'};
metadata.params = {title1: 'Predicted Crime Type Distribution of Sri Lanka for 2014', title2: 'Predicted Crime Type Distribution of Sri Lanka for Each Quarter in 2014'};
var predictionPieChartView = new PieChartView(metadata);

var metadata = {collection: 'predictions'};
metadata.params = {title: 'Predicted Crime Distribution of Sri Lanka for 2014'};
metadata.field = {frequency: 'crime_count', field1: 'crime_yearquarter', field2: 'crime_type'};
metadata.alias = {frequency: 'Crime Count', field1: 'Quarter', field2: 'Crime Type'};
var predictionLineChartView = new GraphView(metadata, 'lineChartView');

module.exports = {
	crimeMapView : crimeMapView,
	crimeBarChartView : crimeBarChartView,
	crimePieChartView : crimePieChartView,
	crimeLineChartView : crimeLineChartView,
	predictionMapView : predictionMapView,
	predictionBarChartView : predictionBarChartView,
	predictionPieChartView : predictionPieChartView,
	predictionLineChartView : predictionLineChartView,
};