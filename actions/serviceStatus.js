var request = require('request')
var mapper = require('./mapper')
var ping = require('ping')
var factory = require('./factory')
var rp = require('request-promise')

var pingUtil = function(res, host){
    return ping.sys.probe(host, function(isAlive){
        var msg = isAlive ? "up" : "down";
	res.send(msg)
    });
}

var getStatusRest = function(res, url) {
    var validStatusCodes = [200, 201, 202, 203, 204, 205, 206, 300, 304]
    return request(url, function(err, response, body) {
        if(!err && validStatusCodes.includes(response.statusCode) && response.headers['content-type'].includes("application/json")) {
             res.send("up");
         }
         else {
             res.send("down");
         }
    });
}

var getPromise = function(url) {
    return rp(url);
}

var getStatus = function(res, params) {
    var scheme = 'https://';
    var host = mapper.mapper(params.customer);
    var retVal = null;
    if('resourceId' in params) {
        var service = factory.serviceMapper(params.resourceId);
        if(service.connectType && service.connectType == "ping") {
            retval = pingUtil(res, host);
        }
        else {
            var fullUrl = scheme + host + service.url;   
            retVal = getStatusRest(res, fullUrl);
        }
    }
    else {
	retVal = {}
	for(var service in factory.services) {
	    if(service.connectType && service.connectType == "ping") {
	    	retVal[service.id] = pingUtil(res, host);
	    }
	    else {
		var fullUrl = scheme + host + service.url;
	        retVal[service.id] = getPromise(fullUrl);
	    }
	}
    }
    return retVal;
}

module.exports = getStatus

