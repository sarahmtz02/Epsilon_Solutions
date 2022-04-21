const db = require('../util/database');

module.exports = class BancoPreguntas{
    constructor(nuevo_fk_idTemplate, nuevo_fk_idPregunta, nuevo_tipoPregunta) {
        this.fk_idTemplate = nuevo_fk_idTemplate;
        this.fk_idPregunta = nuevo_fk_idPregunta;
        this.tipoPregunta = nuevo_tipoPregunta;
    }

    save() {
        //var values1 = [[this.fk_idTemplate, this.fk_idPregunta]];
        //var values2 = [[this.fk_idTemplate, this.fk_idPregunta]];
        return db.execute('INSERT INTO BancoPreguntas (fk_idTemplate, fk_idPregunta) VALUES (?, ?)', [this.fk_idTemplate, this.fk_idPregunta]);
        };

    saveTest() {
        var values = [[this.fk_idTemplate, this.fk_idPregunta], [this.fk_idTemplate, this.fk_idPregunta]]; //Por el caso nada más vamos a insertar dos, pero en realidad sería el COUNT de las preguntas existentes
        return db.query('INSERT INTO BancoPreguntas (fk_idTemplate, fk_idPregunta) VALUES ?', [values]); //Pasamos el array ([[[valor, valor]]])
        };

    static fetchBancoP(idBancoP) {
        return db.execute('SELECT * FROM BancoPreguntas WHERE idBancoP=?', [idBancoP]);
    }

    static fetchAllBancoP() {
        console.log(db.execute('SELECT * FROM BancoPreguntas'));
        return db.execute('SELECT * FROM BancoPreguntas');
    }

    static fetchPreguntasBanco(idTemplate) {
        return db.execute('SELECT * FROM BancoPreguntas WHERE fk_idPregunta=?', [idTemplate]);
    }

    static getBancoP(){
        return db.execute('SELECT *  FROM BancoPreguntas WHERE idBancoP = (?)',[this.id]).then(([rows, fielData]) => {
            return rows;
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });
    }
}