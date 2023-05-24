const http = require('http');
const fs = require('fs');

const hostname = '0.0.0.0';
const port = 8080;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  var rawdata = fs.readFileSync('/usr/shared/app/config.json');
  var json = JSON.parse(rawdata);
  res.end(`Database URL: ${json.dbConfig.host}:${json.dbConfig.port}/${json.dbConfig.dbName}\n`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
