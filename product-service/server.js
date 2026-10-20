const http = require('http');

const service = 'product-service';
const port = Number(process.env.PORT || 3001);
const records = [{"id":101,"name":"Laptop","price":999.99},{"id":102,"name":"Keyboard","price":49.99}];

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200);
    return res.end(JSON.stringify({ status: 'UP', service, port }));
  }

  if (req.method === 'GET' && req.url === '/products') {
    res.writeHead(200);
    return res.end(JSON.stringify(records));
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found', service, path: req.url }));
});

server.listen(port, '0.0.0.0', () => {
  console.log(service + ' listening on port ' + port);
});
