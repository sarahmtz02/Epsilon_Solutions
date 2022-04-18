const db = require('../util/database');

module.exports = class Cuestionario{
    constructor(nuevo_fk_idPeriodo, nuevo_fk_idTemplate, nuevo_fk_idEvaluador, nuevo_idEvaluado, nuevo_nivelEvaluado, nuevo_status) {
        this.fk_idPeriodo = nuevo_fk_idPeriodo;
        this.fk_idTemplate = nuevo_fk_idTemplate;
        this.fk_idEvaluador = nuevo_fk_idEvaluador;
        this.nuevo_idEvaluado = nuevo_idEvaluado;
        this.nivelEvaluado = nuevo_nivelEvaluado;
        this.isAnswered = nuevo_status;
    }

    static fetchMyCuestionarios(idEmpleado) {
        //console.log(db.execute('SELECT * FROM Cuestionario WHERE fk_idEvaluador = ?', [idEmpleado]));
        return db.execute('SELECT * FROM Cuestionario WHERE isAnswered = 0 AND fk_idEvaluador = ?', [idEmpleado]);
    }

    save() { // Por ahora dejo esto a un lado
        return db.execute('INSERT INTO Cuestionario (descPregunta) VALUES (?)',
        [this.descPregunta]
    );
    }

    static fetchOneCuestionario(idCuestionario) {
        return db.execute('SELECT * FROM Cuestionario WHERE idCuestionario=?', [idCuestionario]);
    }

    static getCuestionario(){
        return db.execute('SELECT *  FROM Cuestionario WHERE idCuestionario = (?)',[this.id]
        );
    }
}