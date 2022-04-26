const db = require('../util/database');

module.exports = class Preguntas{
    constructor(nueva_descPregunta, nuevo_tipoPregunta) {
        this.descPregunta = nueva_descPregunta,
        this.tipoPregunta = nuevo_tipoPregunta;
    }

<<<<<<< HEAD
    static fetchAllPreguntas(idTemplate) {
        console.log(db.execute('SELECT * FROM Pregunta'));
        console.log(idTemplate);
        return db.execute("SELECT descPregunta FROM Pregunta INNER JOIN BancoPreguntas ON Pregunta.idPregunta =  BancoPreguntas.fk_idPregunta WHERE fk_idTemplate = ?", [idTemplate]);
     }  
=======
    static fetchAllPreguntas() {
        console.log(db.execute('SELECT * FROM Pregunta'));
        return db.execute('SELECT * FROM Pregunta');
    }

    static fetchOnePregunta(idPregunta) {
        return db.execute('SELECT * FROM Pregunta WHERE idPregunta = ?', [idPregunta]);
    }
>>>>>>> e35c98773621b8e1b246c66ab8de9f74b87f3c2b

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

    static updatePregunta(descPregunta, idPregunta, tipoPregunta){
        return db.execute('CALL update_pregunta (?, ?, ?)', [descPregunta, idPregunta, tipoPregunta]);
    }
<<<<<<< HEAD

=======
>>>>>>> e35c98773621b8e1b246c66ab8de9f74b87f3c2b
}