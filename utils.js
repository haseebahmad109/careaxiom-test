var needle = require('needle');
var syncRequest = require('sync-request');

function addHttp(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = "http://" + url;
  }
  return url;
}
function parseTitle(text){
  var regex = /\<title\>(.*)\<\/title\>/g;
  var result = regex.exec(text);
  return result[1];
}
function getTitleAsync( address, onSuccess, onError ){
  var options = {
    compressed         : true, 
    follow_max         : 5,
  }
  var _address = addHttp(address);
  needle.get(_address, options, function (error, response ) {
    if (!error && response.statusCode == 200) {
      onSuccess(parseTitle(response.body), address);
    }
    else{
      onError(address);
    }
  });
}
function getTitleSync(address){
  var _address = addHttp(address);
  var res = syncRequest('GET', _address);
  return parseTitle(res.getBody());
}

module.exports = {
  getTitleAsync: getTitleAsync,
  getTitleSync: getTitleSync
}
