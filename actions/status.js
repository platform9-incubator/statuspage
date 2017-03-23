var request = require('request')
var mapper = require('./mapper')
var locks = require('locks')

var serviceStatus = {
    'nova-api': 0,
    'cinder-api': 0,
    'neutron-api': 0,
    'glance-api': 0,
    'keystone-api': 0
}
var mutex = locks.createMutex()
var number = 0

var statusAction = function(customer) {
    fqdn = mapper(customer);
    get_nova_status();
    //get_neutron_status()
    while(number != 1) {
        // Sleep.
        // After decide timeout, break, showing the error
    }
    return serviceStatus;
}

var get_nova_status = function() {
    url = 'https://'+fqdn+'/nova';
    request(url, function(err, res, body) {
        if(!err && response.statusCode == 200) {
	    serviceStatus['nova-api'] = 1;
	}
	mutex.lock(function() {
	    number++;
	    mutex.unlock();
	});
    });
}

module.exports = statusAction
