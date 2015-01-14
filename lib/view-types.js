//map view
function MapView(metadata){
	this.metadata = metadata;
}

MapView.prototype.render = function(req,res){
    var obj = this;
	console.log(obj.metadata.collection);
	var collection = req.db.get(obj.metadata.collection);
	var loc = '$'+obj.metadata.field.location;
	var frq = '$'+obj.metadata.field.frequency;
	collection.find({},function(e,results1){
	    collection.col.aggregate([
		  {$group: { _id: loc,  count: {$sum: frq}}}
		],function(e,results2){
		    var input = obj.metadata.field.field1;
			collection.distinct(input,function(e,results3){
			    var input = obj.metadata.field.field2;
				collection.distinct(input,function(e,results4){
				    var output = {};
					output.collection = results1;
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
function BarChartView(metadata){
	this.metadata = metadata;
}

BarChartView.prototype.render = function(req,res){
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
	collection.find({},function(e,results1){
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
					output.collection = results1;
					output.frequencyData = results2;
					output.distinctData = {};
					output.distinctData.field1 =  results3;
					output.distinctData.field2 = results4;
					output.metadata = obj.metadata;
					output.axis = {x: x , y: y};
					res.render('barChartView', {
						data : output
					});
				});
			});
	   });
	});
}

BarChartView.prototype.sendFiteredData = function(req,res){
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
	collection.find({},function(e,results1){
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
					output.collection = results1;
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
	});
}

//line chart view
function LineChartView(metadata){
	this.metadata = metadata;
}

LineChartView.prototype.render = function(req,res){
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
	collection.find({},function(e,results1){
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
					output.collection = results1;
					output.frequencyData = results2;
					output.distinctData = {};
					output.distinctData.field1 =  results3;
					output.distinctData.field2 = results4;
					output.metadata = obj.metadata;
					output.axis = {x: x , y: y};
					res.render('lineChartView', {
						data : output
					});
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
	collection.find({},function(e,results1){
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
					output.collection = results1;
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
	});
}

PieChartView.prototype.sendFiteredData = function(req,res){
	console.log(req.body);
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
metadata.field = {location: 'crime_district', frequency: 'crime_count', field1: 'crime_type', field2: 'crime_year'};
metadata.alias = {location: 'District', frequency: 'Crime Count', field1: 'Crime Type', field2: 'Crime Year'};
var crimeMapView = new MapView(metadata);

var metadata = {collection: 'crimes'};
metadata.field = {frequency: 'crime_count', field1: 'crime_year', field2: 'crime_type'};
metadata.alias = {frequency: 'Crime Count', field1: 'Crime Year', field2: 'Crime Type'};
var crimeBarChartView = new BarChartView(metadata);
var crimePieChartView = new PieChartView(metadata);

var metadata = {collection: 'crimes'};
metadata.field = {frequency: 'crime_count', field1: 'crime_yearquarter', field2: 'crime_type'};
metadata.alias = {frequency: 'Crime Count', field1: 'Quarter of the year', field2: 'Crime Type'};
var crimeLineChartView = new LineChartView(metadata);

module.exports = {
	crimeMapView : crimeMapView,
	crimeBarChartView : crimeBarChartView,
	crimePieChartView : crimePieChartView,
	crimeLineChartView : crimeLineChartView
};