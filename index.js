var express = require('express')
var bodyParser = require('body-parser');
var v = require('./values');
var logger = require('./logger');


var app = express();

app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.send(`This is smartclass's log collector`)
});

app.post('/student', function (req, res, next) {
  requestHandler('student', req, res, next)
});

app.post('/teacher', function (req, res, next) {
  requestHandler('teacher', req, res, next)
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
    .json({status: err.status, message: err.message});
});


app.listen(v.PORT, function () {
  console.log(`smartclass-log-collector is listening on port ${v.PORT}!`)
})


function requestHandler(type, req, res, next) {
  // no data, or not json
  if (!Object.keys(req.body).length) {
    var err = new Error('BAD');
    err.status = 400;
    next(err);
  }
  else {
    logger.write(type, JSON.stringify(req.body));
    res.json({status: 200});
  }
}
