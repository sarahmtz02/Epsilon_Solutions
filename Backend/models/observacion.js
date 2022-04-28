const db = require('../util/database');

module.exports = class Observacion{
    constructor(nuevo_fk_idEvaluado, nuevo_fk_idLead, nuevo_fk_idPeriodo, nueva_descObservacion) {
        this.fk_idEvaluado = nuevo_fk_idEvaluado
        this.fk_idLead = nuevo_fk_idLead;
        this.fk_idPeriodo = nuevo_fk_idPeriodo;
        this.descObservacion = nueva_descObservacion;
    }

    // Crea una nueva observación
    nuevaObservacion() {
        return db.execute('INSERT INTO Observacion (fk_idEvaluado, fk_idLead, fk_idPeriodo, descObservacion) VALUES (?,?,?,?)', 
        [this.fk_idEvaluado, this.fk_idLead, this.fk_idPeriodo, this.descObservacion])
    }

    // Obtiene los datos de las observacions de un empleado
    static getObservaciones(idEmpleado, idMentorado){
        return db.execute('SELECT idObservacion, descObservacion, nombre, apellidoP, apellidoM, fk_idPeriodo, FechaInicio, FechaFin FROM Observacion O, Empleado E, PeriodoEvaluacion PE WHERE O.fk_idLead = ? AND O.fk_idEvaluado = ? AND O.fk_idEvaluado = E.idEmpleado AND O.fk_idPeriodo = PE.idPeriodo', 
        [idEmpleado, idMentorado])
    }

    // Elimina la observacion seleccionada
    static deleteObservacion(idObservacion){
        return db.execute('DELETE FROM Observacion WHERE idObservacion = ?', [idObservacion])
    }

    //Acualiza la observación seleccionada
    static updateObservacion(descObservacion, idObservacion){
        return db.execute('UPDATE Observacion O SET O.descObservacion = ? WHERE O.idObservacion = ?', [descObservacion, idObservacion])
    }

    static getOneObservacion(idObservacion){
        return db.execute('SELECT idObservacion, descObservacion FROM Observacion WHERE idObservacion = ?', [idObservacion])
    }

  //  static getObservacionesEmpleado(idEmpleado,idEvaluador){
    //    return db.execute('SELECT descObservacio FROM Observacion WHERE fk_idEvaluado=?', []

}