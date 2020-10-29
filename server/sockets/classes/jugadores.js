const { Jugador } = require("./jugador");

class Jugadores {
    constructor(){
        this.jugadores = []
    }

    agregarJugador(id, nombre, partida, numero){
        let jugador = new Jugador(id, nombre, partida)
        this.jugadores.push(jugador);
        return this.jugadores;
    }

    getJugador( id ){
        let jugador = this.jugadores.filter( jugador => jugador.id === id)[0];
        return jugador;
    }

    getJugadores(){
        return this.jugadores;
    }

    getJugadoresPartida(partida){
        let jugadoresPartida = this.jugadores.filter( jugador => jugador.partida === partida );
        return jugadoresPartida;
    }

    borrarJugador( id ){

        let jugadorBorrado = this.getJugador(id);

        this.jugadores = this.jugadores.filter( jugador => jugador.id !== id );

        return jugadorBorrado;
    }

}

module.exports = {
    Jugadores
}