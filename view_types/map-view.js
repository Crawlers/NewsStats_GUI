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

module.exports = MapView;