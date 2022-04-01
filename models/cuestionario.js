const db = require('../util/database');

module.exports = class Cuestionario {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(idRespuesta, idCuestionario,template, idPregunta, pregunta, respuesta) {
        this.idRespuesta = idRespuesta;
        this.idCuestionario = idCuestionario;
        this.Template = template;
        this.idPregunta = idPregunta;
        this.Pregunta = pregunta;
        this.Respuesta = respuesta;
    }
    save() {
        return db.execute("INSERT INTO PreguntaRespuesta VALUES (2,101,102,456,'¿Cuáles crees que son fortalezas de José. Por favor argumenta usando ejemplos','Considero que José ha cumplido con el nivel requerido debido a que trabajo en los módulos de registrar venta y modificar entregas')")    
    }
}