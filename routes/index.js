/* GET home page. */
exports.index = function(req, res){
  res.render('index', { title: 'NewsStats' });
};

/* GET Hello World page. */
exports.userlist = function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
};

exports.mapView = function(req, res) {
  if (req.xhr)
	res.render('mapView',{ title: 'map view' });
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