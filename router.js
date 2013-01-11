function route(handle, pathname, response, apiKey) {
  var root = pathname.split('/')[1];

  if (typeof handle[root] === 'function') {
    handle[root](response, pathname, apiKey);
  } else {
    console.log("No request handler found for " + pathname + " (" + root+ ")");
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not found");
    response.end();
  }
}

exports.route = route;