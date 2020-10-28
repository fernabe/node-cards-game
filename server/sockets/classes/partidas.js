class Partidas{
    constructor(){
        this.partidas = []
    }

    agregarPartida(partida){
        this.partidas.push(partida);
        return this.partidas;
    }

    getPartida( id ){
        let partida = this.partidas.filter( partida => partida.nombre === id)[0];
        return partida;
    }

    getPartidas(){
        return this.partidas;
    }
}

module.exports = {
    Partidas
}