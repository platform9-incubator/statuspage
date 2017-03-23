defaultAction = require('../actions/default')
statusAction = require('../actions/status')

var appRouter = function(app) {
    app.get('/', function(req, res) {
	console.log("Default route")
        res.send(defaultAction(req, res));
    });
    app.get('/status', function(req, res) {
	console.log("Status route")
	customer = 'pf9demo';
	res.send(statusAction(customer));
    });
}
 
module.exports = appRouter;
