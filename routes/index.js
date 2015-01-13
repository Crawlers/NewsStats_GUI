/* GET home page. */
var ViewTypesManager = require('../view_types/view-types-manager.js');


exports.index = function(req, res){
  res.render('index', { title: 'NewsStats' });
};

exports.predictions = function(req, res) {
    var db = req.db;
	var collection = db.get('crimes');
	collection.find({},function(e,crimes){
	    collection.col.aggregate([
		  {$group: { _id: "$district",  count: {$sum: 1}}}
		],function(e,docs){
			res.render('predictions', {
			    "crimes" : crimes,
				"crimesByDistrict" : docs
			});
	   });
	});
};

exports.mapView = function(req, res) {
  if (req.xhr)
    ViewTypesManager.crimeMapView.render(req,res);
  else
    res.render('error');
}

exports.filterMapData = function(req, res) {
  if (req.xhr)
    ViewTypesManager.crimeMapView.sendFiteredData(req,res);
  else
    res.render('error');
}

exports.barChartView = function(req, res) {
  if (req.xhr) {
	ViewTypesManager.crimeBarChartView.render(req,res);
  }
  else
    res.render('error');
}

exports.filterBarChartData = function(req, res) {
  if (req.xhr) {
	ViewTypesManager.crimeBarChartView.sendFiteredData(req,res);
  }
  else
    res.render('error');
}

exports.pieChartView = function(req, res) {
  if (req.xhr) {
	ViewTypesManager.crimePieChartView.render(req,res);
  }
  else
    res.render('error');
}

exports.filterPieChartData = function(req, res) {
  if (req.xhr) {
	ViewTypesManager.crimePieChartView.sendFiteredData(req,res);
  }
  else
    res.render('error');
}

exports.home = function(req, res) {
  if (req.xhr)
    res.render('home',{ title: 'home' });
  else
    res.render('error');
}