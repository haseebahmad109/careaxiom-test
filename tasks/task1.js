var util = require('util');
var common_utils = require('../utils');

var task = function(address_list, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<h1>Following are the titles of given websites: </h1>');
  res.write('<ul>');

  var total_address_count = address_list.length;
  for(var i=0; i < address_list.length; i++){
    common_utils.getTitleAsync( address_list[i], function(title, address){
      res.write(util.format('<li> %s - "%s" </li>', address, title));
      if(total_address_count-- <= 1) res.end('</ul>'); 
    }, function(address){
      res.write(util.format('<li> %s - NO RESPONSE </li>', address));
      if(total_address_count-- <= 1) res.end('</ul>'); 
    });
  }
}

module.exports = task;
