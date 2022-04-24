const db = require('../util/database');

module.exports = class Observacion{
    constructor(nuevo_fk_idEvaluado, nuevo_fk_idLead, nuevo_fk_idPeriodo, nueva_descObservacion) {
        this.fk_idEvaluado = nuevo_fk_idEvaluado
        this.fk_idLead = nuevo_fk_idLead;
        this.fk_idPeriodo = nuevo_fk_idPeriodo;
        this.descObservacion = nueva_descObservacion;
    }

    nuevaObservacion() {
        return db.execute('INSERT INTO Observacion (fk_idEvaluado, fk_idLead, fk_idPeriodo, descObservacion) VALUES (?,?,?,?)', 
        [this.fk_idEvaluado, this.fk_idLead, this.fk_idPeriodo, this.descObservacion])
    }


}