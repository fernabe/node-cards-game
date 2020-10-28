const { Deck } = require('./deck')

class Partida{
    constructor(jugadores){
       this.jugadores = jugadores;
       this.marcador_actual = ' 0 - 0';
       this.marcador_global = ' 0 - 0';
       this.cartasPartida = []
    }

    comenzarPartida(){
        const baraja = new Deck();
        baraja.createDeck();
        baraja.shuffleDeck();
        this.cartasPartida = baraja.cards;
        this.repartirCartas();
    }

    repartirCartas(){
        let carta = 0;
        this.jugadores[0].c
        for(let i = 0; i < 8; i++){
            let player = i % 4;
            let cards = this.cartasPartida.slice(carta, carta+3);
            this.jugadores[player].cartas.push(cards[0], cards[1], cards[2]);
            carta += 3;
        }
    }

}

module.exports = {
    Partida
}