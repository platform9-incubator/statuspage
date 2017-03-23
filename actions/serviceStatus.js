var request = require('request')
var mapper = require('./mapper')
var ping = require('ping')
var factory = require('./factory')

var pingUtil = function(res, host){
    console.log(host);
    ping.sys.probe(host, function(isAlive){
        var msg = isAlive ? "up" : "down";
	console.log(isAlive);
	res.send(msg)
    });
}
	
var getStatusRest = function(res, url) {
    var validStatusCodes = [200, 201, 202, 203, 204, 205, 206, 300, 304]
    request(url, function(err, response, body) {
        if(!err && validStatusCodes.includes(response.statusCode) && response.headers['content-type'].includes("application/json")) {
             res.send("up");
         }
         else {
             res.send("down");
         }
    });
}

var getStatus = function(res, params) {
    var scheme = 'https://';
    var service = factory.serviceMapper(params.resourceId);
    var host = mapper(params.customer);
    if(service.connectType && service.connectType == "ping") {
        pingUtil(res, host);
    }
    else {
        var fullUrl = scheme + host + service.url;   
        getStatusRest(res, fullUrl);
    }
}

module.exports = getStatus

