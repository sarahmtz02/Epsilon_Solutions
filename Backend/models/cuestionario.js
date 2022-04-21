const db = require('../util/database');

module.exports = class Cuestionario{
    constructor(Periodo, id_Template, idEmpleadoSsn, id_Evaluado, nivEvaluado, status) {
        this.fk_idPeriodo = Periodo;
        this.fk_idTemplate = id_Template;
        this.fk_idEvaluador = idEmpleadoSsn;
        this.idEvaluado = id_Evaluado;
        this.nivelEvaluado = nivEvaluado;
        this.isAnswered = status;
    }

    static fetchMyCuestionarios(idEmpleadoSsn) {
        //console.log(db.execute('SELECT * FROM Cuestionario WHERE fk_idEvaluador = ?', [idEmpleado]));
        return db.execute('SELECT * FROM Cuestionario WHERE fk_idEvaluador = ?', [idEmpleadoSsn]).then(([rows, fielData]) => {
            return rows;
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });
    }

    // Para obtener las solicitudes de feedback que ha hecho el empleado en la sesión actual
    static getMyRequests(idEmpleadoSsn) {
        return db.execute('SELECT idEvaluado, fk_idEvaluador, nombre, apellidoP, fk_idPeriodo, nivOverall, isAnswered FROM Cuestionario R, Empleado E WHERE R.fk_idEvaluador = E.idEmpleado AND fk_idPeriodo in (SELECT MAX(fk_idPeriodo) FROM PeriodoEvaluacion) AND R.idEvaluado = ? ORDER BY isAnswered, nombre ASC', 
        [idEmpleadoSsn]).then(([rows, fielData]) => {
            return rows;
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });
    }

    static fetchCuestionarioData(id_Evaluado) {
        //console.log('SELECT nombre, apellidoM, apellidoP FROM Empleado, Cuestionario WHERE idEmpleado = ?', [idEvaluado]);
        return db.execute('SELECT nombre, apellidoM, apellidoP FROM Empleado WHERE idEmpleado = ? ', [id_Evaluado]);
    }

    save() { // Para guardar una nueva solicitud de feedback, por ahora sólo va a crear un nuevo cuestionario pero va a ser una stored procedure que también genere el bancopreguntas
        return db.execute('INSERT INTO Cuestionario (fk_idPeriodo, fk_idTemplate, fk_idEvaluador, idEvaluado, nivelEvaluado, isAnswered) VALUES (?,?,?,?,?,0)',
        [this.fk_idPeriodo, this.fk_idTemplate, this.fk_idEvaluador, this.idEvaluado, this.nivelEvaluado]
    );
    }

    static fetchOneCuestionario(idCuestionario) {
        return db.execute('SELECT * FROM Cuestionario WHERE idCuestionario=?', [idCuestionario]);
    }

    static getEmpleados(idEmpleadoSsn){
        return db.execute('SELECT idEmpleado, nombre, apellidoP FROM Empleado WHERE idEmpleado <> ? AND idEmpleado NOT IN (SELECT fk_idEvaluador FROM Cuestionario WHERE idEvaluado = ? AND fk_idPeriodo = (SELECT MAX(idPeriodo) FROM PeriodoEvaluacion))', 
        [idEmpleadoSsn, idEmpleadoSsn])
    }

    static getCuestionario(){
        return db.execute('SELECT *  FROM Cuestionario WHERE idCuestionario = (?)',[this.id]
        );
    }

    static getNewIdC (){
        return db.execute('CALL p_getIdCuestionario').then(([rows, fielData]) => {
            return rows;
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });;
    }    

    static getPeriodo() {
        return db.execute('SELECT * FROM PeriodoEvaluacion ORDER BY idPeriodo DESC LIMIT 1;').then(([rows, fielData]) => {
            return rows;
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });
    }

    static getIdEvaluador(Evaluador){
        return db.execute('SELECT idEmpleado FROM Empleado WHERE CONCAT(nombre , " ", apellidoP) = ?;', [Evaluador]).then(([rows, fielData]) => {
            return rows;
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });
    }

    static totalPreguntas(idTemplate) {
        return db.execute('SELECT COUNT(idBancoP) AS totalPreguntas FROM BancoPreguntas WHERE fk_idTemplate = ?', [idTemplate]).then(([rows, fielData]) => {
            return rows[0].totalPreguntas;
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });
    }
    
    static getPreguntas(idTemplate){
        return db.execute('SELECT bp.idBancoP, bp.fk_idPregunta, p.descPregunta FROM BancoPreguntas bp, Pregunta p WHERE fk_idTemplate = ? AND p.idPregunta = bp.fk_idPregunta', [idTemplate]).then(([rows, fielData]) => {
            return rows;
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });
    }

    static insertIntoPR(idCuestionario, fk_idPregunta) {
        return db.execute('INSERT INTO PreguntaRespuesta (fk_idCuestionario, idPregunta) VALUES (?, ?)', [idCuestionario, fk_idPregunta])
    }

    static insertIdPreg(fk_idPregunta) {
        return db.execute('INSERT INTO PreguntaRespuesta (idPregunta) VALUES (?)', [fk_idPregunta])
    }

    static fillPregRes(idCuestionario) {
        return db.execute('CALL crearPR (?)', [idCuestionario])
    }
}