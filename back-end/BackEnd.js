'use strict';

// Execute com: node BackEnd.js
// Depois, acesse http://localhost:3000 no navegador.
const http = require('node:http');

const HOST = '127.0.0.1';
const PORT = 3000;

const server = http.createServer((request, response) => {
  response.setHeader('Content-Type', 'text/plain; charset=utf-8');

  if (request.url === '/' && request.method === 'GET') {
    response.writeHead(200);
    response.end('Hello, World! Olá, mundo!\n');
    return;
  }

  response.writeHead(404);
  response.end('404 - Página não encontrada.\n');
});

server.on('error', (error) => {
  console.error('Não foi possível iniciar o servidor:', error.message);
  process.exitCode = 1;
});

server.listen(PORT, HOST, () => {
  console.log(`Hello, World! Servidor disponível em http://${HOST}:${PORT}`);
});

