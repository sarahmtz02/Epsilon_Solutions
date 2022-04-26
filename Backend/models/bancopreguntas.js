const db = require('../util/database');

module.exports = class BancoPreguntas{
    constructor(nuevo_fk_idTemplate, nuevo_fk_idPregunta, nuevo_tipoPregunta) {
        this.fk_idTemplate = nuevo_fk_idTemplate;
        this.fk_idPregunta = nuevo_fk_idPregunta;
        this.tipoPregunta = nuevo_tipoPregunta;
    }

    save() {
        return db.query('INSERT INTO BancoPreguntas (fk_idTemplate, fk_idPregunta) VALUES (?)', [temparray])
        };

    static fetchBancoP(idBancoP) {
        return db.execute('SELECT * FROM BancoPreguntas WHERE idBancoP=?', [idBancoP]);
    }

    static getBancoP(){
        return db.execute('SELECT *  FROM BancoPreguntas WHERE idBancoP = (?)',[this.id]
        );
    }
}