/* import http2 from 'http2';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import handler from 'serve-handler';

let connections = [];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const server = http2.createSecureServer({
  key: fs.readFileSync(path.join(__dirname, '../../../certs/server.key')),
  cert: fs.readFileSync(path.join(__dirname, '../../../certs/server.crt')),
});

server.on('request', async (req, res) => {
  const path = req.headers[':path'];
  const method = req.headers[':method'];

  if (path === '/') {
    return handler(req, res, {
      public: path.join(__dirname, '../../../public'),
    });
  } else if (path === '/ws') {
    const ws = new WebSocket(req, res);

    ws.on('message', (msg) => {
      connections.forEach((conn) => {
        conn.send(msg);
      });
    });

    connections.push(ws);
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(3000);
 */