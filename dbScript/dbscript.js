var db = connect("localhost:27017/fypgui");
//Import json to "crimes" collection here 

//create year column
var crimes = db.crimes.find();
while (crimes.hasNext()){
	var item = crimes.next();
	var year = item.crime_year.toString();
	db.crimes.update( {_id: item._id}, {$set: {crime_year: year}});
}
