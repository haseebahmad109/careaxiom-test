var util = require('util');
var common_utils = require('../utils');
var Rx = require('rx')

var task = function(address_list, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<h1>Following are the titles of given websites: </h1>');
  res.write('<ul>');

  var source = Rx.Observable.for(
    address_list,
    function (address) {
        return Rx.Observable.return(address);
    }); 

  var subscription = source.subscribe(
    function (address) {
      try{
        var title = common_utils.getTitleSync(address); 
        res.write(util.format('<li> %s - "%s" </li>', address, title));
      }catch(e){
        res.write(util.format('<li> %s - NO RESPONSE </li>', address));
      }
    },
    function (err) {
        console.log('Error: ' + err);
    },
    function () {
        res.end('</ul>');
    });
  
}

module.exports = task;
