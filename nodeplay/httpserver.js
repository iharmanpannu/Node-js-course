const http = require('http')
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('This is home page for node server')
    res.end()
  }
  if (req.url === '/about') {
    res.write(JSON.stringify([1, 2, 3]))
    res.end()
  }
})

server.listen(4000)
console.log('Listening on port 4000')