var app = require('express')();
var server = require('http').Server(app);
server.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/FrontEnd/non_public_files/Index.html');
});
console.log('Express server started on port %s', server.address().port);
var port = process.env.PORT || 3000;
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/FrontEnd/non_public_files/Index.html');
});
app.listen(port, function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
