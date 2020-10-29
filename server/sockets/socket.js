const { io } = require('../server');
const { Jugadores }  = require('./classes/jugadores')
const { Partidas } = require('./classes/partidas');
const { Partida } = require('./classes/partida');

const jugadores = new Jugadores();
const partidas = new Partidas();

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {
        if( !data.nombre || !data.partida){

            return callback({
                error: true,
                message: ' El nombre es necesario'
            });
        }
        if( jugadores.getJugadoresPartida(data.partida).length < 4){
            let numero = jugadores.getJugadoresPartida(data.partida).length;
            client.join(data.partida);

            jugadores.agregarJugador( client.id, data.nombre, data.partida, numero);
            
            client.broadcast.to(data.partida).emit('listaPersonas', jugadores.getJugadoresPartida(data.partida) );
            //client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Admin',`${data.nombre} se unió`));
            return callback(null, jugadores.getJugadoresPartida(data.partida));   
        }
        else{
            return callback('La partida está completa');
        }  
    });

    client.on('empezarPartida', (data, callback) => {

       
        let existePartida = partidas.getPartida(data.partida);

        if( existePartida !== undefined ){
            return callback('La partida ya está iniciada');
        }

        const jugadoresPartida = jugadores.getJugadoresPartida(data.partida);
        const partida = new Partida(data.partida, jugadoresPartida);
        partidas.agregarPartida(partida);
        partida.comenzarPartida();

        for( const [i,player] of jugadoresPartida.entries()){
            player.numero =  i;
            if( player.id === client.id){
                client.emit('recibirCartas', {cards: player.cartas})
            } else {
                client.broadcast.to(player.id).emit('recibirCartas', {cards: player.cartas});
            }
        }
        return callback(jugadoresPartida);
    });

    client.on('tirarCarta', (data, callback) => {
        let id = client.id;
        let jugador = jugadores.getJugador(id);
        let partida = partidas.getPartida(jugador.partida);
    });

    client.on('disconnect', () => {
        let jugadorBorrado = jugadores.borrarJugador(client.id);
        client.broadcast.to(jugadorBorrado.partida).emit('listaPersonas', jugadores.getJugadoresPartida(jugadorBorrado.partida));

    });

});