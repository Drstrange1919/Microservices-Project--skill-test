# Microservices Containerization Assessment

This project containerizes four Node.js services with Docker and runs them together with Docker Compose.

## Services and endpoints

### User Service

- Base URL: `http://localhost:3000`
- List users: `GET /users`
- Health check: `GET /health`

```bash
curl http://localhost:3000/users
```

### Product Service

- Base URL: `http://localhost:3001`
- List products: `GET /products`
- Health check: `GET /health`

```bash
curl http://localhost:3001/products
```

### Order Service

- Base URL: `http://localhost:3002`
- List orders: `GET /orders`
- Health check: `GET /health`

```bash
curl http://localhost:3002/orders
```

### Gateway Service

- Base URL: `http://localhost:3003/api`
- Users: `GET /api/users`
- Products: `GET /api/products`
- Orders: `GET /api/orders`
- Health check: `GET /health`

```bash
curl http://localhost:3003/api/users
curl http://localhost:3003/api/products
curl http://localhost:3003/api/orders
```

## Prerequisites

- Docker Desktop or Docker Engine
- Docker Compose v2

Verify:

```bash
docker --version
docker compose version
```

## Start the application

From the `Microservices-Task` directory:

```bash
docker compose config
docker compose up --build
```

For detached mode:

```bash
docker compose up --build -d
```

The older command `docker-compose up` may work if Docker Compose v1 is installed, but `docker compose up` is recommended for Compose v2.

## Validate the services

Check container state:

```bash
docker compose ps
```

Run all endpoint tests from Windows PowerShell:

```powershell
.\test-services.ps1
```

You can also open these URLs in a browser:

- `http://localhost:3000/users`
- `http://localhost:3001/products`
- `http://localhost:3002/orders`
- `http://localhost:3003/api/users`
- `http://localhost:3003/api/products`
- `http://localhost:3003/api/orders`

## Stop the application

```bash
docker compose down
```

## Troubleshooting

### Docker command is not recognized

Install Docker Desktop, start it, close and reopen the terminal, and run:

```bash
docker --version
docker compose version
```

### Docker daemon is not running

Start Docker Desktop and verify:

```bash
docker info
```

### Port is already allocated

Check ports 3000 to 3003 in PowerShell:

```powershell
Get-NetTCPConnection -LocalPort 3000,3001,3002,3003 -ErrorAction SilentlyContinue
```

Stop the conflicting process or change the host-side port in `docker-compose.yml`.

### A container is unhealthy or exits

```bash
docker compose ps
docker compose logs user-service
docker compose logs product-service
docker compose logs order-service
docker compose logs gateway-service
```

Rebuild without cache if needed:

```bash
docker compose build --no-cache
docker compose up
```

### Gateway returns 502

Check that User, Product, and Order services are healthy. The gateway reaches them through Docker DNS names such as `user-service`, not through `localhost`.

## Screenshots for submission

After running Docker, capture and save:

1. `screenshots/01-docker-compose-up.png` showing startup logs
2. `screenshots/02-docker-compose-ps.png` showing all containers healthy
3. `screenshots/03-endpoint-tests.png` showing the endpoint responses

Add the screenshots below before final submission:

```markdown
![Docker Compose startup](screenshots/01-docker-compose-up.png)
![Containers running](screenshots/02-docker-compose-ps.png)
![Endpoint tests](screenshots/03-endpoint-tests.png)
```

## Repository structure

```text
Microservices-Task/
├── user-service/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── product-service/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── order-service/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── gateway-service/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── screenshots/
├── docker-compose.yml
├── test-services.ps1
└── README.md
```
