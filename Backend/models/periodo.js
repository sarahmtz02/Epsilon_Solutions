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

    static fetchOnePeriodo(idPeriodo) {
        console.log(db.execute('SELECT * FROM PeriodoEvaluacion WHERE idPeriodo = ?', [idPeriodo]));
        return db.execute('SELECT * FROM PeriodoEvaluacion WHERE idPeriodo = ?', [idPeriodo]);
    }

    save() {
        return db.execute('INSERT INTO PeriodoEvaluacion (FechaInicio, FechaFin) VALUES (?, ?)',
        [this.FechaInicio, this.FechaFin]
    );
    }

    static checkOverlapEdit(FechaInicio, FechaFin, idPeriodo){
        console.log('SELECT idPeriodo FROM PeriodoEvaluacion WHERE ? < FechaFin  AND ? > FechaInicio');
        return db.execute('SELECT idPeriodo FROM PeriodoEvaluacion WHERE ? < FechaFin  AND ? > FechaInicio AND idPeriodo <> ?', 
        [FechaInicio, FechaFin, idPeriodo]).then(([rows, fielData]) => {
            return rows;
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });;
    }

    static checkOverlapNew(FechaInicio, FechaFin){
        console.log('SELECT idPeriodo FROM PeriodoEvaluacion WHERE ? < FechaFin  AND ? > FechaInicio');
        return db.execute('SELECT idPeriodo FROM PeriodoEvaluacion WHERE ? < FechaFin  AND ? > FechaInicio', 
        [FechaInicio, FechaFin]).then(([rows, fielData]) => {
            return rows;
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });
    }

    // Obtiene el periodo más reciente
    static getPeriodo() {
        return db.execute('SELECT * FROM PeriodoEvaluacion ORDER BY idPeriodo DESC LIMIT 1;').then(([rows, fielData]) => {
            return rows;
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });
    }

    // Modifica el periodo seleccionado
    static editPeriodo(FechaInicio, FechaFin, idPeriodo) {
        return db.execute('UPDATE PeriodoEvaluacion PE SET PE.FechaInicio = ?, PE.FechaFin = ? WHERE PE.idPeriodo = ?', [FechaInicio, FechaFin, idPeriodo])
    }
}