statusAction = require('../actions/serviceStatus')
factory = require('../actions/factory')

var appRouter = function(app) {
    app.get('/:customer/status', function(req, res) {
	res.send(factory.services);
    });
    app.get('/:customer/status/:resourceId', function(req, res) {
	statusAction(res, req.params)
    });
}
 
module.exports = appRouter;
