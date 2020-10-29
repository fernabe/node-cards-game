class Jugador{
    constructor(id, nombre, partida){
        this.id = id;
        this.nombre = nombre;
        this.partida = partida;
        this.cartas = [];
        this.numero = 0;
    }
}

module.exports = {
    Jugador
}