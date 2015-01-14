var ViewTypes = require('../lib/view-types.js');

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
    ViewTypes.crimeMapView.render(req,res);
  else
    res.render('error');
}

exports.filterMapData = function(req, res) {
  if (req.xhr)
    ViewTypes.crimeMapView.sendFiteredData(req,res);
  else
    res.render('error');
}

exports.barChartView = function(req, res) {
  if (req.xhr)
	ViewTypes.crimeBarChartView.render(req,res);
  else
    res.render('error');
}

exports.filterBarChartData = function(req, res) {
  if (req.xhr)
	ViewTypes.crimeBarChartView.sendFiteredData(req,res);
  else
    res.render('error');
}

exports.pieChartView = function(req, res) {
  if (req.xhr)
	ViewTypes.crimePieChartView.render(req,res);
  else
    res.render('error');
}

exports.filterPieChartData = function(req, res) {
  if (req.xhr)
	ViewTypes.crimePieChartView.sendFiteredData(req,res);
  else
    res.render('error');
}

exports.lineChartView = function(req, res) {
  if (req.xhr)
	ViewTypes.crimeLineChartView.render(req,res);
  else
    res.render('error');
}

exports.home = function(req, res) {
  if (req.xhr)
    res.render('home',{ title: 'home' });
  else
    res.render('error');
}