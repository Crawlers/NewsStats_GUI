var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');

// mongo db
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('user:pass@ds049219.mongolab.com:49219/fyp');  

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
app.get('/crimes_mapView', routes.crimes_mapView);
app.get('/crimes_barChartView',routes.crimes_barChartView);
app.get('/crimes_pieChartView',routes.crimes_pieChartView);
app.get('/crimes_lineChartView',routes.crimes_lineChartView);
app.get('/predictions_mapView', routes.predictions_mapView);
app.get('/predictions_barChartView',routes.predictions_barChartView);
app.get('/predictions_pieChartView',routes.predictions_pieChartView);
app.get('/predictions_lineChartView',routes.predictions_lineChartView);

app.post('/crimes_filterMapData',routes.crimes_filterMapData);
app.post('/crimes_filterBarChartData',routes.crimes_filterBarChartData);
app.post('/crimes_filterPieChartData',routes.crimes_filterPieChartData);
app.post('/predictions_filterMapData',routes.predictions_filterMapData);
app.post('/predictions_filterBarChartData',routes.predictions_filterBarChartData);
app.post('/predictions_filterPieChartData',routes.predictions_filterPieChartData);

// catch 404 and forwarding to error handler
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
