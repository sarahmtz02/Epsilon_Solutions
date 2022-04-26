const db = require('../util/database');

module.exports = class BancoPreguntas{
    constructor(nuevo_fk_idTemplate, nuevo_fk_idPregunta, nueva_descPregunta, nuevo_tipoPregunta) {
        this.fk_idTemplate = nuevo_fk_idTemplate;
        this.fk_idPregunta = nuevo_fk_idPregunta;
        this.descPregunta = nueva_descPregunta;
        this.tipoPregunta = nuevo_tipoPregunta;
    }

    save() {
<<<<<<< HEAD
<<<<<<< HEAD
        //var values1 = [[this.fk_idTemplate, this.fk_idPregunta]];
        //var values2 = [[this.fk_idTemplate, this.fk_idPregunta]];
=======
>>>>>>> ce3586c295d94382e621ce97a88f2bdf1e445def
        return db.execute('INSERT INTO BancoPreguntas (fk_idTemplate, fk_idPregunta) VALUES (?, ?)', [this.fk_idTemplate, this.fk_idPregunta]);
        };

    saveTest() {
        var values = [[this.fk_idTemplate, this.fk_idPregunta], [this.fk_idTemplate, this.fk_idPregunta]]; //Por el caso nada más vamos a insertar dos, pero en realidad sería el COUNT de las preguntas existentes
        return db.query('INSERT INTO BancoPreguntas (fk_idTemplate, fk_idPregunta) VALUES ?', [values]); //Pasamos el array ([[[valor, valor]]])
=======
        return db.query('INSERT INTO BancoPreguntas (fk_idTemplate, fk_idPregunta) VALUES (?)', [temparray])
>>>>>>> 56c6eaf44418b4869c79318eab930f0dccf9c9bc
        };

    static fetchBancoP(idBancoP) {
        return db.execute('SELECT * FROM BancoPreguntas WHERE idBancoP=?', [idBancoP]);
    }

<<<<<<< HEAD
<<<<<<< HEAD
=======
    save2() {
        return db.execute('CALL nueva_pregunta (?,?,?,?)',
        [this.fk_idTemplate, this.fk_idPregunta, this.descPregunta, this.tipoPregunta]
    );
    }

    static getNewIdPreg (){
        return db.execute('CALL p_getIdPregunta').then(([rows, fielData]) => {
            return rows[0][0].nuevoIdPreg;
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });;
    }

    static getTipoPregunta (fk_idPregunta){
        return db.execute('SELECT tipoPregunta FROM BancoPreguntas bp, Pregunta p WHERE p.idPregunta = ?', [fk_idPregunta]).then(([rows, fielData]) => {
            return rows
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });;
    }

>>>>>>> ce3586c295d94382e621ce97a88f2bdf1e445def
    static fetchAllBancoP() {
        console.log(db.execute('SELECT * FROM BancoPreguntas'));
        return db.execute('SELECT * FROM BancoPreguntas');
    }

    static fetchPreguntasBanco(idTemplate) {
        return db.execute('SELECT DISTINCT idPregunta, descPregunta FROM Pregunta p, BancoPreguntas bp WHERE p.idPregunta = bp.fk_idPregunta AND bp.fk_idTemplate = ?', [idTemplate]).then(([rows, fielData]) => {
            return rows;
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });;
    }

    static deletePregunta(fk_idPregunta, fk_idTemplate){
        return db.execute('DELETE FROM BancoPreguntas WHERE fk_idPregunta = ? AND fk_idTemplate = ?', [fk_idPregunta, fk_idTemplate]);
    }

=======
>>>>>>> 56c6eaf44418b4869c79318eab930f0dccf9c9bc
    static getBancoP(){
        return db.execute('SELECT *  FROM BancoPreguntas WHERE idBancoP = (?)',[this.id]).then(([rows, fielData]) => {
            return rows;
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });
    }

    static getTipoPregunta(idPregunta){
        return db.execute('SELECT tipoPregunta FROM BancoPreguntas WHERE fk_idPregunta = ?', [idPregunta])
    }
}