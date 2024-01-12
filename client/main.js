//Definimos el Socket a traves del cual entraran los mensajes al Chat:
//var socket = io.connect('http://localhost:6677',{'forceNew':true})

var socket = io.connect('http://192.168.1.2:6677',{'forceNew':true});

//Preparamos o renderizamos los mensajes para enviarlos al HTML - Cliente
function render(data)
{
var html = data.map(function(message, index)
    {
        return(`
            <div class="message">
                <strong>${message.nickname}</strong> Dice:
                <p>${message.text}</p>
            </div>
        `);
    }).join(' ');

    
    //Hacer que el foco del Chat quede en el ultimo que hablo
    var div_msgs = document.getElementById('messages');
        div_msgs.innerHTML = html;
        div_msgs.scrollTop = div_msgs.scrollHeight;
        div_msgs.innerHTML.style.color = 'red';
}



//Recogemos los mensajes que llegan desde le servidor para direccionarlos hacia el cliente
socket.on('messages', function(data){
    console.log(data);
    render(data);
});


function addMessage(e)
{
    var message = 
    {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };
    
    //Ocultamos el campo para que el nombre no pueda ser cambiado
    document.getElementById('nickname').style.display = 'none';
    document.getElementById('text').style.color = 'green';

    //Le envio el contenido de message al Server asi:
    socket.emit('add-message', message);

    return false;
}