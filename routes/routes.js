statusAction = require('../actions/serviceStatus')

var appRouter = function(app) {
    app.get('/:customer/status/nova', function(req, res) {
        statusAction.nova(res, req.params.customer);
    });
    app.get('/:customer/status/neutron', function(req, res) {
        statusAction.neutron(res, req.params.customer);
    });
    app.get('/:customer/status/cinder', function(req, res) {
        statusAction.cinder(res, req.params.customer);
    });
    app.get('/:customer/status/glance', function(req, res) {
        statusAction.glance(res, req.params.customer);
    });
    app.get('/:customer/status/heat', function(req, res) {
        statusAction.heat(res, req.params.customer);
    });
    app.get('/:customer/status/keystone', function(req, res) {
        statusAction.keystone(res, req.params.customer);
    });
    app.get('/:customer/status/cfn', function(req, res) {
        statusAction.cfn(res, req.params.customer);
    });

}
 
module.exports = appRouter;
