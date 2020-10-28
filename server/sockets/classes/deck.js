const { Card } = require('./card');

class Deck {
    constructor(){
        this.cards = []
    }

    createDeck(){
        let palos = ['oros', 'espadas', 'copas', 'bastos'];
        let numero = [1,2,3,4,5,6,7,10,11,12];
        let valor = [11,0,10,0,0,0,0,3,2,4];
        
        for( let i = 0; i < palos.length; i++){
            for( let j = 0; j < numero.length; j++){
                this.cards.push(new Card(palos[i], numero[j], valor[j]));
            }
        }
    }

    shuffleDeck(){
        let location1, location2, tmp;
        for (let i = 0; i < 1000; i++) {
            location1 = Math.floor((Math.random() * this.cards.length));
            location2 = Math.floor((Math.random() * this.cards.length));
            tmp = this.cards[location1];
            this.cards[location1] = this.cards[location2];
            this.cards[location2] = tmp;
        }
    }

    repartirCartas(){
        
    }

}

module.exports = {
    Deck
}