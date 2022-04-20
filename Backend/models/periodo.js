const db = require('../util/database');

module.exports = class Periodo{
    constructor(nueva_fechain, nueva_fechafin) {
        this.FechaInicio = nueva_fechain;
        this.FechaFin = nueva_fechafin;
    }

    static fetchAllPeriodos() {
        console.log(db.execute('SELECT * FROM PeriodoEvaluacion'));
         return db.execute('SELECT * FROM PeriodoEvaluacion');
    }

    save() {
        return db.execute('INSERT INTO PeriodoEvaluacion (FechaInicio, FechaFin) VALUES (?, ?)',
        [this.FechaInicio, this.FechaFin]
    );
    }

}