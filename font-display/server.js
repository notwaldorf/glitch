var express = require('express');
var bot = require('request');

var app = express();
app.use(express.static('public'));
app.use(express.static('views'));

app.get('/font.woff2', function(request, response) {
  //var url = 'https://cdn.glitch.com/be746fa6-6ce9-423d-b9a3-684949adc8d5%2FAbrilFatface-Regular.ttf?1504029421641';
  //url ='https://cdn.glitch.com/be746fa6-6ce9-423d-b9a3-684949adc8d5%2FZillaSlabHighlight-Bold.ttf?1504029622654';
  var url='https://cdn.glitch.com/be746fa6-6ce9-423d-b9a3-684949adc8d5%2FQuando-Regular.ttf?1504031266551';
  setTimeout(function() {
   bot.get(url).pipe(response);
  },4000)
});

app.get('/font2.woff2', function(request, response) {
  var url='https://cdn.glitch.com/be746fa6-6ce9-423d-b9a3-684949adc8d5%2FQuando-Regular.ttf?1504031266551';
  setTimeout(function() {
   bot.get(url).pipe(response);
  },2000)
});

app.get('/font3.woff2', function(request, response) {
  var url='https://cdn.glitch.com/be746fa6-6ce9-423d-b9a3-684949adc8d5%2FQuando-Regular.ttf?1504031266551';
  bot.get(url).pipe(response);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
