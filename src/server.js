'use strict'
const express = require('express');
const mongoose = require('mongoose');
const cors = require ('cors');
const path = require('path');
//criar o server wwb
const app = express();
app.use(cors());
//atribuir ao protocolo http o app
const server = require('http').Server(app);
//configura o server para escutar dotas as requisições em realtime
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
});

mongoose.connect('mongodb+srv://omnistack:198320jrs@cluster0-32aoj.mongodb.net/omnistack?retryWrites=true',
    {
        useNewUrlParser: true
    }
);

app.use((req, res, next) =>{
    req.io = io;
    return next();
})
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10bm', extended: true}));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

// o server esta escultando
server.listen(process.env.PORT || 3333);