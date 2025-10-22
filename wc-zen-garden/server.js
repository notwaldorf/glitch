// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

app.use('/elements', express.static(__dirname + '/elements'));
app.use('/themes', express.static(__dirname + '/themes'));
app.use('/lib', express.static(__dirname + '/lib'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
