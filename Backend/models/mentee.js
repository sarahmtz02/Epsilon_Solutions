const db = require('../util/database');

module.exports = class Mentee {
    constructor(nuevo_fk_idLead, nuevo_idMentee, nueva_descAsignacion, nuevo_fk_idPeriodo) {
        this.fk_idLead = nuevo_fk_idLead;
        this.idMentee = nuevo_idMentee;
        this.descAsignacion = nueva_descAsignacion;
        this.fk_idPeriodo = nuevo_fk_idPeriodo;
    }

    // Obtiene todos los datos de la tabla mentee
    static fetchAllMentees() {
        return db.execute('SELECT idMentee, nombre, apellidoP, apellidoM, nivOverall, descAsignacion, FechaInicio, FechaFin FROM Empleado e, Mentees m, PeriodoEvaluacion p WHERE e.idEmpleado = m.idMentee AND m.fk_idPeriodo = p.idPeriodo');
    }

    // Inserta un nuevo registro a la tabla Mentee
    save() {
        return db.execute('INSERT INTO Mentees (fk_idLead, idMentee, descAsignacion, fk_idPeriodo) VALUES (?, ?, ?, ?)',
            [this.fk_idLead, this.idMentee, this.descAsignacion, this.fk_idPeriodo]
        );
    }

    static fetchMentores() {
        return db.execute('SELECT fk_idLead FROM Mentees m')
    }

    // Obtiene los mentores
    static getMentores(idEmpleadoSsn) {
        return db.execute('SELECT idEmpleado, nombre, apellidoP FROM Empleado WHERE idEmpleado <> ? AND fk_idRolJer = 2',[idEmpleadoSsn])
    }

    // Obtiene los empleados
    static getEmpleados(){
        return db.execute('SELECT idEmpleado, nombre, apellidoP FROM Empleado WHERE fk_idRolJer = 1')
    }

    // Obtiene el periodo más reciente
    static getPeriodo() {
        return db.execute('SELECT * FROM PeriodoEvaluacion ORDER BY idPeriodo DESC LIMIT 1;').then(([rows, fielData]) => {
            return rows[0].idPeriodo;
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });
    }

    // Obtiene el Id del Empleado solicitado
    static getIdEmpleado(idEmpleado){
        return db.execute('SELECT idEmpleado FROM Empleado WHERE CONCAT(nombre , " ", apellidoP) = ?', [idEmpleado]).then(([rows, fieldData]) => {
            return rows[0].idEmpleado;
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });
    }

    // Obtiene los mentorados de un mentee
    static getMentorados(idEmpleadoSsn){
        return db.execute('SELECT idMentee, nombre, apellidoP, apellidoM, nivOverall, nivPeople, nivBusiness, nivCraft FROM Empleado E, Mentees M WHERE E.idEmpleado = M.idMentee AND M.FK_IdLead = ?',
        [idEmpleadoSsn])
    }

    // Obtiene los cuestionarios donde el mentee fue evaluado
    static getCuestMentorado(idMentorado, fk_idPeriodo){
        return db.execute('SELECT idCuestionario, nombre, apellidoP, apellidoM, FechaInicio, FechaFin FROM Empleado E, Cuestionario C, PeriodoEvaluacion PE WHERE E.idEmpleado = C.fk_idEvaluador AND C.idEvaluado = ? AND C.fk_idPeriodo = PE.idPeriodo AND C.fk_idPeriodo = ? AND C.isAnswered = 1', 
        [idMentorado, fk_idPeriodo])
    }

    // Obtiene las respuestas de los cuestionarios
    static getAnsCuest(idCuestionario){
        return db.execute('SELECT idRespuesta, Template, idPregunta, Pregunta, Respuesta, tipoPregunta FROM PreguntaRespuesta WHERE fk_idCuestionario = ?',
        [idCuestionario])
    }

    // Obtiene el Id del Evaluador para después sacar sus datos
    static getIdEvaluado(idCuestionario){
        return db.execute('SELECT idEvaluado, fk_idEvaluador FROM Cuestionario WHERE idCuestionario = ?', [idCuestionario]).then(([rows, fielData]) => {
            return rows[0].idEvaluado
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });
    }

    // Obtiene el Id del evaluado para después sacar sus datos
    static getIdEvaluador(idCuestionario){
        return db.execute('SELECT fk_idEvaluador, fk_idEvaluador FROM Cuestionario WHERE idCuestionario = ?', [idCuestionario]).then(([rows, fielData]) => {
            return rows[0].fk_idEvaluador
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });
    }

    // Obtiene el nombre del empleado solicitado
    static getNombreEmpleado(idEmpleado){
        return db.execute('SELECT nombre, apellidoP, apellidoM FROM Empleado WHERE idEmpleado = ?', [idEmpleado])
    }
}