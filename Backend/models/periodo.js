const db = require('../util/database');

module.exports = class Periodo{
    constructor(nueva_fechain, nueva_fechafin) {
        this.FechaInicio = nueva_fechain;
        this.FechaFin = nueva_fechafin;
    }

    static fetchAllPeriodos() {
        console.log(db.execute('SELECT * FROM periodoevaluacion'));
         return db.execute('SELECT * FROM periodoevaluacion');
    }

    save() {
        return db.execute('INSERT INTO periodoevaluacion (FechaInicio, FechaFin) VALUES (?, ?)',
        [this.FechaInicio, this.FechaFin]
    );
    }

}