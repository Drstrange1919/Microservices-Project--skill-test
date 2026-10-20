$ErrorActionPreference = 'Stop'

$tests = @(
    'http://localhost:3000/users',
    'http://localhost:3001/products',
    'http://localhost:3002/orders',
    'http://localhost:3003/api/users',
    'http://localhost:3003/api/products',
    'http://localhost:3003/api/orders'
)

foreach ($url in $tests) {
    Write-Host "Testing $url" -ForegroundColor Cyan
    $response = Invoke-RestMethod -Uri $url -Method Get
    $response | ConvertTo-Json -Depth 10
}

Write-Host 'All endpoint tests completed successfully.' -ForegroundColor Green
