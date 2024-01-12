var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(6677, function(){
    console.log('Server is working OK on the next address: http://localhost:6677');
});

//Creamos una ruta para probar el server - MENSAJE DE PRUEBAS
app.get('/hola-mundo', function(req, res){
    res.status(200).send('Hola mundo caminando por Routes');
});


//Mensaje de Bienvenida al Chat:
var messages = [{
    id:1,
    text: 'Bienvenido al chat privado de Luis F Gomez M',
    nickname: 'Bot - Luis Fernando Gomez M'
}];


//Este metodo detecta cuando un cliente se ha conectado al socket a traves de la variable socket
io.on('connection', function(socket){
    console.log("El nodo con IP:"+socket.handshake.address+" se ha conectado. . .");

    //Emito el mensaje a cualquier cliente que se conecte al Chat:
    socket.emit('messages',messages);


    //Recojo el evento add-message y lo despacho al array messages
    socket.on('add-message', function (data) 
    {
        messages.push(data);    
        io.sockets.emit('messages', messages);
    });
});


//Usamos un middleware con express para decirle que todos los archivos que esten en la carpeta /public con extension html sean ejecutados
app.use(express.static('client'));