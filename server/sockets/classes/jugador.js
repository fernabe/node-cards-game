class Jugador{
    constructor(id, nombre, partida, numero){
        this.id = id;
        this.nombre = nombre;
        this.partida = partida;
        this.cartas = [];
        this.numero = numero;
    }
}

module.exports = {
    Jugador
}