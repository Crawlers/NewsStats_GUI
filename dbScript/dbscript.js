var db = connect("localhost:27017/fypgui");
//Import json to "crimes" collection here 

//create year column
var crimes = db.crimes.find();
while (crimes.hasNext()){
	var item = crimes.next();
	var year =(item.crime_date != null)?(new Date(item.crime_date)).getFullYear().toString():null;
	db.crimes.update( {_id: item._id}, {$set: {crime_year: year}});
}

//convert null to unknown
var crimes = db.crimes.find();
while (crimes.hasNext()){
	var item = crimes.next();
	for (var i in item){
		if (item[i] == null)
		    item[i] = "unknown";
	}
	db.crimes.update( {_id: item._id}, {$set: item});
}