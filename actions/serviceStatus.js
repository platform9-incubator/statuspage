var request = require('request')
var mapper = require('./mapper')


var getNovaStatus = function(res, customerShortName) {
    getStatus(res, customerShortName, "nova");
}

var getNeutronStatus = function(res, customerShortName) {
    getStatus(res, customerShortName, "neutron");
}

var getCinderStatus = function(res, customerShortName) {
    getStatus(res, customerShortName, "cinder");
}

var getGlanceStatus = function(res, customerShortName) {
    getStatus(res, customerShortName, "glance");
}

var getKeystoneStatus = function(res, customerShortName) {
    getStatus(res, customerShortName, "keystone");
}

var getHeatStatus = function(res, customerShortName) {
    getStatus(res, customerShortName, "heat");
}

var getCfnStatus = function(res, customerShortName) {
    getStatus(res, customerShortName, "cfn");
}

var getStatus = function(res, customerShortName, service) {
    url = 'https://' + mapper(customerShortName) + '/' + service;
    validStatusCodes = [200, 201, 202, 203, 204, 205, 206, 300, 304]
    request(url, function(err, response, body) {
        if(!err && validStatusCodes.includes(response.statusCode) && response.headers['content-type'].includes("application/json")) {
             res.send("up");
         }
         else {
             res.send("down");
         }
    });
}

module.exports = {
	nova: getNovaStatus,
	neutron: getNeutronStatus,
	cinder: getCinderStatus,
	glance: getGlanceStatus,
	keystone: getKeystoneStatus,
	heat: getHeatStatus,
	cfn: getCfnStatus
}
	
