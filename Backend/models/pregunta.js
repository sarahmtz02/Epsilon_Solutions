const db = require('../util/database');

module.exports = class Preguntas{
    constructor(nueva_descPregunta, nuevo_tipoPregunta) {
        this.descPregunta = nueva_descPregunta,
        this.tipoPregunta = nuevo_tipoPregunta;
    }

    static fetchAllPreguntas(idTemplate) {
        console.log(db.execute('SELECT * FROM Pregunta'));
        console.log(idTemplate);
        return db.execute("SELECT descPregunta FROM Pregunta INNER JOIN BancoPreguntas ON Pregunta.idPregunta =  BancoPreguntas.fk_idPregunta WHERE fk_idTemplate = ?", [idTemplate]);
     }  

    static fetchOnePregunta(idPregunta) {
        return db.execute('SELECT * FROM Pregunta WHERE idPregunta = ?', [idPregunta]);
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

    async count(){
        return db.execute('SELECT COUNT(idPregunta) AS numPreguntas FROM Pregunta');
    }


    static updatePregunta(descPregunta, idPregunta, tipoPregunta){
        return db.execute('CALL update_pregunta (?, ?, ?)', [descPregunta, idPregunta, tipoPregunta]);
    }
}