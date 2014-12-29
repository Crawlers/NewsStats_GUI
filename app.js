var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var users = require('./routes/user');

// mongo db
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongodb://plbsam:ffypguii@ds043190.mongolab.com:43190/fypgui');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});
app.use(app.router);

app.get('/', routes.index);
app.get('/home', routes.home);
app.get('/mapView', routes.mapView);
app.get('/graphView',routes.graphView);
app.get('/predictions',routes.predictions);

app.post('/filterMapData',routes.filterMapData);
app.post('/filterGraphData',routes.filterGraphData);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
