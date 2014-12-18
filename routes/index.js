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

exports.statistics = function(req, res) {
  res.render('statistics',{ title: 'Statistics' });
}
