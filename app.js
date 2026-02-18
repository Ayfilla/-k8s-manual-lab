const http = require('http');

http.createServer((req, res) => {
  res.end('GitOps working');
}).listen(3000);
