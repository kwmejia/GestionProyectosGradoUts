const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { urlencoded } = require('express');
const { development } = require('./router/development');

app.use(bodyParser.json())
   .use(cors())
   .use(urlencoded({ extended: true }))
   .use('/development', development)

const server = require('http').createServer(app);

const io = require('socket.io')(server);
io.on('connection', (e) => {
   console.log("Client connected")
});

server.listen(9091, "0.0.0.0", function () {
   console.log("Server running")
});