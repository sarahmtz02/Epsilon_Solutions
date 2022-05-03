const db = require('../util/database');

module.exports = class Mentee{
    constructor(nuevo_fk_idLead, nuevo_idMentee, nueva_descAsignacion, nuevo_fk_idPeriodo, nueva_fechaAsig) {
        this.fk_idLead = nuevo_fk_idLead;
        this.idMentee = nuevo_idMentee;
        this.descAsignacion = nueva_descAsignacion;
        this.fk_idPeriodo = nuevo_fk_idPeriodo;
        this.fechaAsig = nueva_fechaAsig;
    }

    // Obtiene todos los datos de la tabla mentee
    static fetchAllMentees() {
        return db.execute('SELECT idMentees, idMentee, fk_idLead, fechaAsig, a.nombre, a.apellidoP, a.apellidoM, a.nivOverall, b.nombre AS nomMentor, b.apellidoP AS apellidoPM, b.apellidoM AS apellidoMM, descAsignacion FROM Mentees m INNER JOIN Empleado a ON m.fk_idLead = a.idEmpleado INNER JOIN Empleado b ON m.idMentee = b.idEmpleado');
    }

    // Inserta un nuevo registro a la tabla Mentee
    save() {
        return db.execute('INSERT INTO Mentees (fk_idLead, idMentee, descAsignacion, fk_idPeriodo, fechaAsig) VALUES (?, ?, ?, ?, ?)',
        [this.fk_idLead, this.idMentee, this.descAsignacion, this.fk_idPeriodo, this.fechaAsig]
    );
    }

    // Obtiene los mentores
    static getMentores() {
        return db.execute('SELECT idEmpleado, nombre, apellidoP FROM Empleado WHERE (fk_idRolJer = 2 OR fk_idRolJer = 3)')
    }

    // Obtiene los empleados
    static getEmpleados(idEmpleado){
        return db.execute('SELECT idEmpleado, nombre, apellidoP FROM Empleado WHERE idEmpleado <> ?', [idEmpleado])
    }

    // Verificación de que ya existe una asignación
    static checkIfExists(fk_idLead, idMentee){
        return db.execute('SELECT idMentees FROM Mentees WHERE fk_idLead = ? AND idMentee = ?', [fk_idLead, idMentee]).then(([rows, fielData]) => {
            return rows[0].idMentees
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });
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

    //Elimina la asignación seleccionada
    static deleteAsig(idMentees){
        return db.execute('DELETE FROM Mentees WHERE idMentees = ?', [idMentees])
    }
}
