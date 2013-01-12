var http = require("http"),
	url = require("url");

function start(route, handle, port) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    var apiKey = url.parse(request.url, true).query.key;
    route(handle, pathname, response, apiKey);
  }

  http.createServer(onRequest).listen(port);
  console.log("Server has started listening on port " + port);
}

exports.start = start;