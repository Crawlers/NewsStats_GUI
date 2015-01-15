var ViewTypes = require('../lib/view-types.js');

exports.index = function(req, res){
  res.render('index', { title: 'NewsStats' });
};

exports.crimes_mapView = function(req, res) {
  if (req.xhr)
    ViewTypes.crimeMapView.render(req,res);
  else
    res.render('error');
}

exports.crimes_filterMapData = function(req, res) {
  if (req.xhr)
    ViewTypes.crimeMapView.sendFiteredData(req,res);
  else
    res.render('error');
}

exports.predictions_mapView = function(req, res) {
  if (req.xhr)
    ViewTypes.predictionMapView.render(req,res);
  else
    res.render('error');
}

exports.predictions_filterMapData = function(req, res) {
  if (req.xhr){
    ViewTypes.predictionMapView.sendFiteredData(req,res);
	}
  else
    res.render('error');
}

exports.crimes_barChartView = function(req, res) {
  if (req.xhr)
	ViewTypes.crimeBarChartView.render(req,res);
  else
    res.render('error');
}

exports.crimes_filterBarChartData = function(req, res) {
  if (req.xhr)
	ViewTypes.crimeBarChartView.sendFiteredData(req,res);
  else
    res.render('error');
}

exports.predictions_barChartView = function(req, res) {
  if (req.xhr)
	ViewTypes.predictionBarChartView.render(req,res);
  else
    res.render('error');
}

exports.predictions_filterBarChartData = function(req, res) {
  if (req.xhr)
	ViewTypes.predictionBarChartView.sendFiteredData(req,res);
  else
    res.render('error');
}

exports.crimes_pieChartView = function(req, res) {
  if (req.xhr){
	ViewTypes.crimePieChartView.render(req,res);
	}
  else
    res.render('error');
}

exports.crimes_filterPieChartData = function(req, res) {
  if (req.xhr)
	ViewTypes.crimePieChartView.sendFiteredData(req,res);
  else
    res.render('error');
}

exports.predictions_pieChartView = function(req, res) {
  if (req.xhr)
	ViewTypes.predictionPieChartView.render(req,res);
  else
    res.render('error');
}

exports.predictions_filterPieChartData = function(req, res) {
  if (req.xhr)
	ViewTypes.predictionPieChartView.sendFiteredData(req,res);
  else
    res.render('error');
}

exports.crimes_lineChartView = function(req, res) {
  if (req.xhr)
	ViewTypes.crimeLineChartView.render(req,res);
  else
    res.render('error');
}

exports.predictions_lineChartView = function(req, res) {
  if (req.xhr)
	ViewTypes.predictionLineChartView.render(req,res);
  else
    res.render('error');
}

exports.home = function(req, res) {
  if (req.xhr)
    res.render('home',{ title: 'home' });
  else
    res.render('error');
}