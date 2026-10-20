const http = require('http');

const port = Number(process.env.PORT || 3003);
const routes = {
  '/api/users': process.env.USER_SERVICE_URL || 'http://user-service:3000/users',
  '/api/products': process.env.PRODUCT_SERVICE_URL || 'http://product-service:3001/products',
  '/api/orders': process.env.ORDER_SERVICE_URL || 'http://order-service:3002/orders'
};

function proxy(target, res) {
  const url = new URL(target);
  const request = http.get({
    hostname: url.hostname,
    port: url.port,
    path: url.pathname,
    timeout: 5000
  }, upstream => {
    res.writeHead(upstream.statusCode || 502, {
      'Content-Type': upstream.headers['content-type'] || 'application/json; charset=utf-8'
    });
    upstream.pipe(res);
  });

  request.on('timeout', () => request.destroy(new Error('Upstream request timed out')));
  request.on('error', error => {
    if (res.headersSent) return res.end();
    res.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: 'Upstream service unavailable', details: error.message }));
  });
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({ status: 'UP', service: 'gateway-service', port }));
  }

  if (req.method === 'GET' && routes[req.url]) return proxy(routes[req.url], res);

  res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ error: 'Not found', availableRoutes: Object.keys(routes) }));
});

server.listen(port, '0.0.0.0', () => {
  console.log('gateway-service listening on port ' + port);
});
