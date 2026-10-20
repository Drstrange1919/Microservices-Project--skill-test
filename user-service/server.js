const http = require('http');

const service = 'user-service';
const port = Number(process.env.PORT || 3000);
const records = [{"id":1,"name":"Alice Johnson","email":"alice@example.com"},{"id":2,"name":"Bob Smith","email":"bob@example.com"}];

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200);
    return res.end(JSON.stringify({ status: 'UP', service, port }));
  }

  if (req.method === 'GET' && req.url === '/users') {
    res.writeHead(200);
    return res.end(JSON.stringify(records));
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found', service, path: req.url }));
});

server.listen(port, '0.0.0.0', () => {
  console.log(service + ' listening on port ' + port);
});
