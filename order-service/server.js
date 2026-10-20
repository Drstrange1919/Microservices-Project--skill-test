const http = require('http');

const service = 'order-service';
const port = Number(process.env.PORT || 3002);
const records = [{"id":1001,"userId":1,"productId":101,"quantity":1,"status":"confirmed"},{"id":1002,"userId":2,"productId":102,"quantity":2,"status":"pending"}];

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200);
    return res.end(JSON.stringify({ status: 'UP', service, port }));
  }

  if (req.method === 'GET' && req.url === '/orders') {
    res.writeHead(200);
    return res.end(JSON.stringify(records));
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found', service, path: req.url }));
});

server.listen(port, '0.0.0.0', () => {
  console.log(service + ' listening on port ' + port);
});
