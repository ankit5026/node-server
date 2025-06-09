const net = require('net');

const PORT = 6000;
const SEND_TO_PORT = 5000;
const MESSAGE = "Message from PORT 6000";

const server = net.createServer(socket => {
  socket.on('data', data => {
    console.log(`[Server PORT ${PORT}] Received: ${data.toString()}`);
  });
});

server.listen(PORT, () => {
  console.log(`[Server] Listening on PORT ${PORT}`);

  const client = new net.Socket();
  client.connect(SEND_TO_PORT, '127.0.0.1', () => {
    console.log(`[Client PORT ${PORT}] Connected to PORT ${SEND_TO_PORT}`);
    client.write(MESSAGE);
  });

  client.on('data', data => {
    console.log(`[Client PORT ${PORT}] Received: ${data.toString()}`);
  });

  client.on('error', err => {
    console.log(`[Client PORT ${PORT}] Error: ${err.message}`);
  });
});
