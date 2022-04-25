const db = require('../util/database');

module.exports = class Preguntas{
    constructor(nueva_descPregunta, nuevo_tipoPregunta) {
        this.descPregunta = nueva_descPregunta,
        this.tipoPregunta = nuevo_tipoPregunta;
    }

<<<<<<< HEAD
    static fetchAllPreguntas() {
        console.log(db.execute('SELECT * FROM Pregunta'));
        return db.execute('SELECT * FROM Pregunta');
    }
=======
    static fetchAllPreguntas(idTemplate) {
        console.log(db.execute('SELECT * FROM Pregunta'));
        console.log(idTemplate);
        return db.execute("SELECT descPregunta FROM Pregunta INNER JOIN BancoPreguntas ON Pregunta.idPregunta =  BancoPreguntas.fk_idPregunta WHERE fk_idTemplate = ?", [idTemplate]);
     }  
>>>>>>> 56c6eaf44418b4869c79318eab930f0dccf9c9bc

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
<<<<<<< HEAD
<<<<<<< HEAD
=======

    async count(){
        return db.execute('SELECT COUNT(idPregunta) AS numPreguntas FROM Pregunta');
    }

>>>>>>> 56c6eaf44418b4869c79318eab930f0dccf9c9bc
=======

    static updatePregunta(descPregunta, idPregunta, tipoPregunta){
        return db.execute('CALL update_pregunta (?, ?, ?)', [descPregunta, idPregunta, tipoPregunta]);
    }
>>>>>>> ce3586c295d94382e621ce97a88f2bdf1e445def
}