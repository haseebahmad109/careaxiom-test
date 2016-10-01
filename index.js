var http = require('http');
var url = require('url');
var util = require('util');

var task_to_run = process.argv[2].toLowerCase();
const PORT = 3000;
var server = http.createServer(handleRequest).listen(PORT);

function handleRequest(req, res){
  var parsedUrl = url.parse(req.url, true);
  var pathname = parsedUrl.pathname;
  var address_list = [].concat(parsedUrl.query["address"]);

  switch(pathname.toLowerCase()){
    case '/i/want/title/':
    case '/i/want/title':
      require(util.format('./tasks/%s', task_to_run))(address_list, res); 
      break;
    default:
      res.writeHead(404, {"Content-Type": "text/plain"});
      res.write("404 Not Found\n");
      res.end();
  }
}
