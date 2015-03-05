var express = require('express');
var app = express();

// Toggle this comment if connecting to MongoDB needed
// database = require('database');

//////////////////////// Configure

var mongourl = null;

app.configure(function() {
  app.use('/static', express.static(__dirname + '/static'));
  app.use(express.bodyParser());
  app.use(app.router);
});

app.configure('development', function() {
  mongourl = "mongodb://localhost/db";
  app.use(express.errorHandler({dumpException: true, showStack: true}));
  app.set('view options', {pretty: true});
});

app.configure('production', function() {
  app.use(express.errorHandler());
  mongourl = process.env.MONGOHQ_URL;
});

//////////////////////// Routes

app.get('/', function(req, res) {
  //require('fs').readFile __dirname + '/static/index.html', 'utf-8', (err, text)(function() {
  require('fs').readFile(__dirname + '/assets/index.html', 'utf-8', function(err, text) {
    res.send(text);
  });

// app.post('/score', function(req, res) {
//   recordScore(req, res);
// });

// app.get('/board', function(req, res) {
//   printBoard(req, res);
// });

});

// Listen

app.listen(process.env.VCAP_APP_PORT || 3000);
console.log('Server now listening to port 3000');