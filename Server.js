/**
 * Created by Tega on 04/03/2018.
 */
var http = require('http');
var https = require('https');
var url = require('url');

console.log('listening on port 8080')
http.createServer(function (req, res) {
  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  });
  console.log('url found',req.url);
  let regEx = new RegExp('(\/listing?).+', 'g');
  if (regEx.test(req.url)) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    https.get('https://thisopenspace.com/lhl-test?page='+query.page, response => {
      let body = "";
      response.on("data", data => {
        body += data;
      });
      response.on("end", () => {
        res.end(body)
      });
    });

  } else {
    var json = JSON.stringify({
      status: false,
      message: 'Invalid path',
    });
    res.end(json);
  }
}).listen(8080);