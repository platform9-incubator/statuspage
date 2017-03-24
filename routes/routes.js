statusAction = require('../actions/serviceStatus')
factory = require('../actions/factory')
mapper = require('../actions/mapper')

var appRouter = function(app) {
    mapper.updateCache();    
    app.get('/:customer/status', function(req, res) {
	res.send(factory.services);
    });
    app.get('/:customer/status/:resourceId', function(req, res) {
	return statusAction(res, req.params);
    });
}
 
module.exports = appRouter;
