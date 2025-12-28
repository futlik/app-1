const http = require('http');

const PORT = 3000;

// Create HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Hello World\n');
  var randomNumber = Math.floor(Math.random() * 100);
  res.write(randomNumber.toString());
  res.end();
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

