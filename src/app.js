const express = require('express');
const app = express();

//se crea un servidor http a partir de la libreria express
const http = require('http').Server(app);
//para generar una comunicacion vamos a trabajar con socket.io
const io = require('socket.io')(http);

//routes

app.use(require('./routes/littlezoom.routes'));

//donde se cargan los htmal con lo que se trabajaran

app.use(express.static(__dirname + '/public'));

io.on('connection',(socket) => {
    socket.on('stream',(image) => {
        //emitir el evento a todos sockets conectados
        socket.broadcast.emit('stream',image);
         
    })
})

module.exports = http;