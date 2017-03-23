services = [
    {
	'id': 'nova',
   	'name': 'Nova',
	'url': '/nova',
        'description': 'Openstack Nova api service for computing'
    },
    {
        'id': 'neutron',
        'name': 'Neutron',
        'url': '/neutron',
        'description': 'Openstack Neutron api networking'
    },
    {
        'id': 'glance',
        'name': 'Glance',
        'url': '/glance',
        'description': 'Openstack Glance api service for image library'
    },
    {
        'id': 'heat',
        'name': 'Heat',
        'url': '/heat',
        'description': 'Openstack Heat api service for orchestration'
    },
    {
        'id': 'keystone',
        'name': 'Keystone',
        'url': '/keystone',
        'description': 'Openstack Keystone api service for authentication'
    },
    {
        'id': 'cinder',
        'name': 'Cinder',
        'url': '/cinder',
        'description': 'Openstack Cinder api service for volumes'
    },
    {
        'id': 'cfn',
        'name': 'Cloud Information',
        'url': '/cfn',
        'description': 'Api service for cloud information'
    },
    {
	'id': 'du',
	'name': 'DU',
        'url': '',
	'description': 'Deployment unit (Controller pane for openstack services)',
	'connectType': 'ping'
    }
];

var serviceMapper = function(serviceId) {
    serviceId = serviceId.toLowerCase();
    var service = services.filter(s => s.id == serviceId);
    return service[0];
}

module.exports = {
	services: services,
	serviceMapper: serviceMapper
};
