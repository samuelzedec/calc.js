import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const SRC_DIR = path.join(__dirname, 'src');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  let filePath = path.join(SRC_DIR, req.url);
  if (filePath === SRC_DIR || filePath.endsWith('/')) {
    filePath = path.join(SRC_DIR, 'index.html');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Arquivo não encontrado</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end(`Erro do servidor: ${err}`, 'utf-8');
      }
    } else {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = mimeTypes[ext] || 'text/plain';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache'
      });
      res.end(data, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════╗
  ║   Servidor rodando! 🚀                 ║
  ╠════════════════════════════════════════╣
  ║   URL: http://localhost:${PORT}           ║
  ║                                        ║
  ║   Pressione Ctrl+C para parar          ║
  ╚════════════════════════════════════════╝
  `);
});