/* GET home page. */
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
  if (req.xhr) {
    var db = req.db;
	var collection = db.get('crimes');
	collection.find({},function(e,crimes){
	    collection.col.aggregate([
		  {$group: { _id: "$district",  count: {$sum: 1}}}
		],function(e,docs){
			res.render('mapView', {
			    "crimes" : crimes,
				"crimesByDistrict" : docs
			});
	   });
	});
	
  }
  else
    res.render('error');
}

exports.filterMapData = function(req, res) {
  if (req.xhr) {
	console.log(req.body);
    var db = req.db;
	var collection = db.get('crimes');
	collection.find({},function(e,crimes){
	    collection.col.aggregate([{$match: req.body},
		  {$group: { _id: "$district",  count: {$sum: 1}}}
		],function(e,docs){
		    console.log(docs);
			res.render('postResults', {
			    "output" : docs
			});
	   });
	});
	
  }
  else
    res.render('error');
}

exports.graphView = function(req, res) {
  if (req.xhr) {
	var axis = {x:"type", y:"year"};
    var db = req.db;
	var collection = db.get('crimes');
	collection.find({},function(e,crimes){
	    collection.col.aggregate([
		  {$group: { _id: {crime_type:"$crime_type", crime_year:"$crime_year"}, count1: {$sum: 1}}},
		  {$group: { 
		      _id: "$_id.crime_"+axis.y,
			  crime_types: {
				  $push: {
					crime_type: "$_id.crime_"+axis.x,
					count: "$count1"
				  },
			  },
			  count: {$sum: "$count1"}
		  }},
		  {$sort: {_id: 1}}
		],function(e,docs){
			res.render('graphView', {
			    "crimes" : crimes,
				"crimesByTypeAndYear" : docs,
				"axis" : axis
			});
	   });
	});
	
  }
  else
    res.render('error');
}

exports.filterGraphData = function(req, res) {
  if (req.xhr) {
	var axis = req.body;
    var db = req.db;
	var collection = db.get('crimes');
	collection.find({},function(e,crimes){
	    collection.col.aggregate([
		  {$group: { _id: {crime_type:"$crime_type", crime_year:"$crime_year"}, count1: {$sum: 1}}},
		  {$group: { 
		      _id: "$_id.crime_"+axis.y,
			  crime_types: {
				  $push: {
					crime_type: "$_id.crime_"+axis.x,
					count: "$count1"
				  },
			  },
			  count: {$sum: "$count1"}
		  }},
		  {$sort: {_id: 1}}
		],function(e,docs){
			res.render('postResults', {
				"output" : docs
			});
	   });
	});
	
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