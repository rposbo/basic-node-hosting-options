var fs = require('fs'),
  proxy = require('./proxy');

function products(response, path, apiKey) {
console.log("Request handler 'products' was called");

  var search = path.split('/')[2];
  var host = 'api1.asos.com';
  var requestPath = '/productlisting/search/' + search + '/1/PriceAscending/en_API/GBP?api_key=' + apiKey;
  
  response.writeHead(200, {"Content-Type": "application/json"});

  proxy.getRemoteData(host, requestPath, function(json){
    var data = JSON.parse(json);

  var newJson = {
    category: data.Description,
    products: []
  };

  data.Listings.forEach(function(listing){
      newJson.products.push({
        id: listing.ProductId,
        title: listing.Title,
        price: listing.CurrentPrice,
        image: listing.ProductImageUrl[0]
      })
    });

    response.write(JSON.stringify(newJson));
    response.end();
  });  
}

function product(response, path, apiKey) {
  console.log("Request handler 'product' was called for " + path);

  var productId = path.split('/')[2];
  var host = 'api1.asos.com';
  var requestPath = '/product/' + productId + '/en_API/GBP?api_key=' + apiKey;

  response.writeHead(200, {"Content-Type": "application/json"});
  proxy.getRemoteData(host, requestPath, function(json){
  var data = JSON.parse(json);

    var newJson = {
      id: data.ProductId,
      title: data.Title,
      price: data.CurrentPrice,
      available: data.InStock,
      image: data.ProductImageUrls[0]
    };

    response.write(JSON.stringify(newJson));
    response.end();
  });  
}


function favicon(response) {
  var img = fs.readFileSync('./favicon.ico');
  response.writeHead(200, {"Content-Type": "image/x-icon"});
  response.end(img,'binary');
}

exports.favicon = favicon;
exports.products = products;
exports.product = product;