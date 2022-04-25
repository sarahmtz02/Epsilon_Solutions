const db = require('../util/database');

module.exports = class Preguntas{
    constructor(nueva_descPregunta, nuevo_tipoPregunta) {
        this.descPregunta = nueva_descPregunta,
        this.tipoPregunta = nuevo_tipoPregunta;
    }

    static fetchAllPreguntas() {
        console.log(db.execute('SELECT * FROM Pregunta'));
        return db.execute('SELECT * FROM Pregunta');
    }

    save() {
        return db.execute('INSERT INTO Pregunta (descPregunta, tipoPregunta) VALUES (?, ?)',
        [this.descPregunta, this.tipoPregunta]
    );
    }

    static fetchOnePregunta(idPregunta) {
        return db.execute('SELECT * FROM Pregunta WHERE idPregunta=?', [idPregunta]);
    }

    static getPregunta(){
        return db.execute('SELECT *  FROM Pregunta WHERE idPregunta = (?)',[this.id]
        );
    }
}