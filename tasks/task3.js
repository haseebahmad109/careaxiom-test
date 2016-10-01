var common_utils = require('../utils');
var util = require('util');
var Q = require("q");

var task = function(address_list, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<h1>Following are the titles of given websites: </h1>');
  res.write('<ul>');
  
  function getAndWriteTitle(address){
    return Q.fcall(function(){
      return common_utils.getTitleSync(address);
    }).then(function(title){
      res.write(util.format('<li> %s - "%s" </li>', address, title));
    }).catch(function(error){
      res.write(util.format('<li> %s - NO RESPONSE </li>', address));
    }).done();
  }

  Q.all(address_list.map(function(address){
    getAndWriteTitle(address);
  })).then(function(result){
    res.end('</ul>');
  });


}

module.exports = task;
