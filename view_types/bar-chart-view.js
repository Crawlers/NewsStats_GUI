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

module.exports = BarChartView;