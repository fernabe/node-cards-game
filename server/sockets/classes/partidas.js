class Partidas{
    constructor(){
        this.partidas = []
    }

    agregarPartida(partida){
        this.partidas.push(partida);
        return this.partidas;
    }

    getPartida( id ){
        //console.log('id', id)
        let partida = this.partidas.filter( partida => partida.nombre === id)[0];
        //console.log(partida)
        return partida;
    }

    getPartidas(){
        return this.partidas;
    }
}

module.exports = {
    Partidas
}