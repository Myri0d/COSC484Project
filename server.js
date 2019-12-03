var app = require('express')();
var server = require('http').Server(app);
server.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/FrontEnd/public/index.html');
});
console.log('Express server started on port %s', server.address().port);
var port = process.env.PORT || 3000;
app.get('/', function (req, res) {
  res.sendfile(__dirname + 'index.html');
});
app.listen(port, function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
