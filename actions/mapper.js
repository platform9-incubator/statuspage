request = require('request');

var customersMapCache = {}
var customersListCache = []
var validStatusCodes = [200, 201, 202, 203, 204, 205, 206, 300, 304]

var mapper = function(customer) {
    fqdn = cacheHit(customer);
    if(fqdn) return fqdn;
    updateCache();
    setTimeout(function(){ }, 5000);
    return cacheHit(customer);
}

var cacheHit = function(customer) {
    if(customer in customersMapCache) {
        return customersMapCache[customer];
    }
    return false;
}

var updateCache = function() {
    customersListCache = [];
    var url = process.env.MONGO_PROD_CUST_URL;
    var promise = new Promise(function(resolve, reject) {
	request(url, function(err, res, body) {
	    if( !err && body) {
	    	customersListCache = JSON.parse(body);
	    	updateCustomersMapCache();
	  	resolve();
	    }
	    else reject();
    	});
    });
    return promise;
}

var updateCustomersMapCache = function() {
    customersMapCache = {};
    var promise = new Promise(function(resolve, reject) {
    	for(var i=0; i<customersListCache.length; i++) {
    	    var url = process.env.MONGO_PROD_CUST_URL + '/' + customersListCache[i];
	    request(url, function(err, response, body) {
		if(validStatusCodes.includes(response.statusCode)) {
		    body = JSON.parse(body)
	    	    customersMapCache[body.shortname] = body.customer.fqdn;
		}
	    });
    	}
	resolve();
    });
    return promise;
}

module.exports.mapper = mapper;
module.exports.updateCache = updateCache;
