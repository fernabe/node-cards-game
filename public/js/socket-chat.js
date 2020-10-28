var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('partida')) {
    window.location = 'index.html';
    throw new Error('El nombre y partida son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    partida: params.get('partida')
};


socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(err, response) {

        if( err ){
            //Redireccionar al login
            console.log(err);
        }
        else{
            console.log(response);
            renderizarUsuarios(response);
        }
    });

});

socket.on('recibirCartas', function(response){
    renderizarCartas(response.cards);
});

socket.on('recibirRestoCartas', function(response){
    renderizarTriunfo(response.triunfo);
    renderizarRestoCartas(response.resto);
});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});


// Enviar información
// socket.emit('crearMensaje', {
//     nombre: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(message) {
    //console.log('Servidor:', message);
    renderMessages(message, false)
    scrollBottom();
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listaPersonas', function(personas) {
    renderizarUsuarios(personas)
});

// Mensajes privados
socket.on('mensajePrivado', function(mensaje) {
    //console.log('Mensaje Privado:', mensaje);
});