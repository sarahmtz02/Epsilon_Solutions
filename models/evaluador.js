const db = require('../util/database');

module.exports = class Evaluador {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(idCuestionario, idPeriodo, idEvaluador, idTemplate, idEvaluado, nivelEvaluado, isAnswered) {
        this.idCuestionario = idCuestionario;
        this.idPeriodo = idPeriodo;
        this.idEvaluador = idEvaluador;
        this.idTemplate = idTemplate;
        this.idEvaluado = idEvaluado;
        this.nivelEvaluado = nivelEvaluado;
        this.isAnswered = isAnswered;
    }

    save() {
        return db.execute("CALL registrarEvaluador (101,7412,123,102,123,2.2,0)")    
    }
}