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
        return db.execute('SELECT * FROM Cuestionario WHERE fk_idEvaluador = ?', [idEmpleadoSsn]).then(([rows, fielData]) => {
            return rows;
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });
    }
    static get_answered(){
        return db.execute("SELECT count(*) AS contestados FROM Cuestionario WHERE isAnswered = 1").then(([rows, fielData]) => {
            return rows[0].contestados;
        })
        .catch((error) => {
            console.log(error);
            return rows;
        });
    };
    static get_notanswered(){
        return db.execute("SELECT count(*) AS noContestados FROM Cuestionario WHERE isAnswered = 0").then(([rows, fielData]) => {
            return rows[0].noContestados;
        })
        .catch((error) => {
            console.log(error);
            return rows;
        });

    };
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

    // Crea el cuestionario de la nueva solicitud
    save() { 
        return db.execute('INSERT INTO Cuestionario (fk_idPeriodo, fk_idTemplate, fk_idEvaluador, idEvaluado, nivelEvaluado, isAnswered) VALUES (?,?,?,?,?,0)',
        [this.fk_idPeriodo, this.fk_idTemplate, this.fk_idEvaluador, this.idEvaluado, this.nivelEvaluado]
    );
    }

    // Obtiene todos los datos del cuestionario seleccionado 
    static fetchOneCuestionario(idCuestionario) {
        return db.execute('SELECT * FROM Cuestionario WHERE idCuestionario=?', [idCuestionario]);
    }

    // Obtiene todos los empleados que no he seleccionado para que me evalúen
    static getEmpleados(idEmpleadoSsn){
        return db.execute('SELECT idEmpleado, nombre, apellidoP FROM Empleado WHERE idEmpleado <> ? AND idEmpleado NOT IN (SELECT fk_idEvaluador FROM Cuestionario WHERE idEvaluado = ? AND fk_idPeriodo = (SELECT MAX(idPeriodo) FROM PeriodoEvaluacion))', 
        [idEmpleadoSsn, idEmpleadoSsn])
    }

    // Obtiene la clave del nuevo cuestionario, ojo que siempre va a ser el identificador del último cuestionario + 1
    static getNewIdC (){
        return db.execute('CALL p_getIdCuestionario').then(([rows, fielData]) => {
            return rows;
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });;
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

    // Obtiene el identificador del empleado que fue seleccionado como evaluador en la solicitud
    static getIdEvaluador(Evaluador){
        return db.execute('SELECT idEmpleado FROM Empleado WHERE CONCAT(nombre , " ", apellidoP) = ?;', [Evaluador]).then(([rows, fielData]) => {
            return rows;
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });
    }

    // Devuelve el total de preguntas en la plantilla
    static totalPreguntas(idTemplate) {
        return db.execute('SELECT COUNT(idBancoP) AS totalPreguntas FROM BancoPreguntas WHERE fk_idTemplate = ?', [idTemplate]).then(([rows, fielData]) => {
            return rows[0].totalPreguntas;
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });
    }
    
    // Obtiene los datos del banco de preguntas correspondiente a la plantilla
    static getPreguntas(idTemplate){
        return db.execute('SELECT bp.idBancoP, bp.fk_idPregunta, p.descPregunta FROM BancoPreguntas bp, Pregunta p WHERE fk_idTemplate = ? AND p.idPregunta = bp.fk_idPregunta', [idTemplate]).then(([rows, fielData]) => {
            return rows;
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });
    }

    // Crea un nuevo registro en la tabla PreguntaRespuesta que le corresponde al nuevo cuestionario
    static insertIntoPR(idCuestionario, fk_idPregunta) {
        return db.execute('INSERT INTO PreguntaRespuesta (fk_idCuestionario, idPregunta) VALUES (?, ?)', [idCuestionario, fk_idPregunta])
    }

    // Inserta los identificadores de las preguntas de la plantilla
    static insertIdPreg(fk_idPregunta) {
        return db.execute('INSERT INTO PreguntaRespuesta (idPregunta) VALUES (?)', [fk_idPregunta])
    }

    // Llama el procedure de SQL para registrar la descPregunta correspondiente a su identificador
    static fillPregRes(idCuestionario) {
        return db.execute('CALL crearPR (?)', [idCuestionario])
    }

    // Obtiene el identificador de la plantilla del cuestionario actual
    static getCurrentTempC(idCuestionario){
        return db.execute('SELECT fk_idTemplate FROM Cuestionario WHERE idCuestionario = ?', [idCuestionario]).then(([rows, fielData]) => {
            return rows[0].fk_idTemplate;
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });
    }
}