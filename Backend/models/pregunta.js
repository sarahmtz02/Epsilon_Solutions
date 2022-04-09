const db = require('../util/database');

module.exports = class Preguntas{
    constructor(nueva_descPregunta) {
        this.descPregunta = nueva_descPregunta;
    }

    static fetchAllPreguntas(idTemplate) {
        console.log(db.execute('SELECT * FROM Pregunta'));
        console.log(idTemplate);
        return db.execute("SELECT descPregunta FROM Pregunta INNER JOIN BancoPreguntas ON Pregunta.idPregunta =  BancoPreguntas.fk_idPregunta WHERE fk_idTemplate = ?", [idTemplate]);
     }  

    save() {
        return db.execute('INSERT INTO Pregunta (descPregunta) VALUES (?)',
        [this.descPregunta]
    );
    }

    static fetchOnePregunta(idPregunta) {
        return db.execute('SELECT * FROM Pregunta WHERE idPregunta=?', [idPregunta]);
    }

    static getPregunta(){
        return db.execute('SELECT *  FROM Pregunta WHERE idPregunta = (?)',[this.id]
        );
    }

    async count(){
        return db.execute('SELECT COUNT(idPregunta) AS numPreguntas FROM Pregunta');
    }

}