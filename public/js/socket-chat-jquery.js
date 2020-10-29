//Funciones para renderizar usuarios
var params = new URLSearchParams(window.location.search);

var nombre = params.get('nombre');
var partida = params.get('partida');
// referencias JQuery
var buttonStart = $('#buttonStart');
var misCartas = $('#misCartas');
var cartaTriunfo = $('#cartaTriunfo');
var restoCartas = $('#restoCartas');
var cardPlayer = $('.cardPlayer');

var divUsuarios = $('#divUsuarios');
var formSend = $('#formSend');
var txtMessage = $('#formSend input[name="txtMessage"]');
var divChatbox = $('#divChatbox');
var titleSala = $('#titleSala').find('small');

function renderizarUsuarios(personas) {

    titleSala.text(partida);

    var html = '';
    html += '<li>';
    html += '<a href="javascript:void(0)" class="active">Jugadores</span></a>';
    html += '</li>';
    for (var i = 0; i < personas.length; i++) {
        html += '<li>'
        html += '<a data-id="' + personas[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + '<small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsuarios.html(html);
}

function renderMessages(data, yo) {

    var fecha = new Date(data.fecha);
    var hora = fecha.getHours() + ' : ' + fecha.getMinutes();
    var adminClass = 'info';

    if (data.nombre === "Admin") {
        adminClass = 'danger';
    }

    var html = '';
    if (yo) {

        html += '<li class="reverse">';
        html += '<div class="chat-content">';
        html += '<h5>' + data.nombre + '</h5>';
        html += '<div class="box bg-light-inverse">' + data.message + '</div>';
        html += '</div>';
        html += '<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '<div class="chat-time">' + hora + '</div>';
        html += '</li>';

    } else {

        html += '<li class="animated fadeIn">';
        if( data.nombre !== 'Admin'){
            html += '<div class="chat-img"><img src="assets/images/users/3.jpg" alt="user" /></div>';
        }
        html += '<div class="chat-content">';
        html += '<h5>' + data.nombre + '</h5>';
        html += '<div class="box bg-light-' + adminClass + '">' + data.message + '</div>';
        html += '</div>';
        html += '<div class="chat-time">' + hora + '</div>';
        html += '</li>';

    }

    divChatbox.append(html);
}


function renderizarCartas(cards){
    console.log(cards)

    var html = '';
    for(var i = 0; i < cards.length; i++){
        html += '<div class="col">';
        html += '<div data-id="'+i+'" class="cartaPropia">';
        html += '<p>' + cards[i].numero + '</p>';
        html += '<p>' + cards[i].palo + '</p>';
        html += '<p>' + cards[i].valor + '</p>';
        html += '</div>';
        html += '</div>';
    }
    /*
    var html = '';
    for(var i = 0; i < cards.length; i++){
        html += '<div data-id="'+i+'" class="col-sm card">'
        html += '<p>' + cards[i].numero + '</p>';
        html += '<p>' + cards[i].palo + '</p>';
        html += '<p>' + cards[i].valor + '</p>';
        html += '</div>'
    }
    */
    misCartas.append(html);
}

function renderizarTriunfo(triunfo){
    var html = '';
    html += '<div class="col-sm">'
    html += '<p>' + triunfo.numero + '</p>';
    html += '<p>' + triunfo.palo + '</p>';
    html += '<p>' + triunfo.valor + '</p>';
    html += '</div>'

    cartaTriunfo.append(html);
}

function renderizarRestoCartas(resto){
    console.log(resto);
    var html = '';
    for(var i = 0; i < resto.length; i++){
        html += '<div class="col-sm">'
        html += '<p>' + resto[i].numero + '</p>';
        html += '<p>' + resto[i].palo + '</p>';
        html += '<p>' + resto[i].valor + '</p>';
        html += '</div>'
    }
    restoCartas.append(html);
}

// Listeners

buttonStart.on('click', function(){
    console.log('Empezar partida');
    socket.emit('empezarPartida', {partida}, function(response){
        console.log(response);
    });
});

$(document).on('click', '#playerCards .card', function(){ 
    console.log($(this).data('id'));
    var idCarta = $(this).data('id');
    socket.emit('tirarCarta', idCarta, function(response){
        console.log(response);
    });
}); 