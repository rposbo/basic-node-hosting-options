var server = require("./server"),
	router = require("./router"),
	requestHandlers = require("./requestHandlers");

// only handling GETs at the moment
var handle = {}
handle["favicon.ico"] = requestHandlers.favicon;
handle["product"] = requestHandlers.product;
handle["products"]  = requestHandlers.products;

var port = process.env.PORT || 3000;
server.start(router.route, handle, port);