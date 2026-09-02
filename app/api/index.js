const http = require('http')

const servidor = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json')

  if (req.url === '/health') return res.end('{"status":"ok"}')
  if (req.url === '/ready') return res.end('{"status":"ready"}')
  if (req.url === '/tickets') return res.end('[{"id":1,"titulo":"Suporte - Problema com login"}]')

  res.statusCode = 404
  res.end('{"erro":"nao encontrado"}')
})

servidor.listen(3000, () => console.log('API em http://localhost:3000'))

