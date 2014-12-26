/* GET home page. */
exports.index = function(req, res){
  res.render('index', { title: 'NewsStats' });
};

exports.predictions = function(req, res) {
    var db = req.db;
	var collection = db.get('crimes');
	collection.col.aggregate([
		  {$group: { _id: "$district",  count: {$sum: 1}}}
		],function(e,docs){
			res.render('predictions', {
				"crimes" : docs
			});
	});
};

exports.mapView = function(req, res) {
  if (req.xhr) {
    var db = req.db;
	var collection = db.get('crimes');
	collection.col.aggregate([
		  {$group: { _id: "$district",  count: {$sum: 1}}}
		],function(e,docs){
			res.render('mapView', {
				"crimesByDistrict" : docs
			});
	});
  }
  else
    res.render('error');
}

exports.graphView = function(req, res) {
  if (req.xhr)
    res.render('graphView',{ title: 'graph view' });
  else
    res.render('error');
}

exports.home = function(req, res) {
  if (req.xhr)
    res.render('home',{ title: 'home' });
  else
    res.render('error');
}