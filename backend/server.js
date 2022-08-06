const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Salut tout le monde');
});
server.listen(process.env.PORT || 3000);