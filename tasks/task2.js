var async = require('async');
var common_utils = require('../utils');
var util = require('util');

var task = function(address_list, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<h1>Following are the titles of given websites: </h1>');
  res.write('<ul>');

  // Use of Async For Each 
  async.forEachOf(address_list, function(value, key, callback){
    common_utils.getTitleAsync( value, function(title, address){
      res.write(util.format('<li> %s - "%s" </li>', address, title));
      callback();
    }, function(address){
      res.write(util.format('<li> %s - NO RESPONSE </li>', address));
      callback();
    });
  }, function(err){
    if (err) console.error(err.message);
    res.end('</ul>')
  });

}

module.exports = task;
