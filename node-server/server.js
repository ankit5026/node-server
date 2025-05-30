const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello from Node server!\n');
});

server.listen(port, hostname, () => {
  console.log(`Node server is created and running successfully at http://${hostname}:${port}/`);
});
