const db = require('../util/database');

module.exports = class PreguntaRespuesta {

    constructor(nuevo_fk_idCuestionario, nuevo_Template, nuevo_idPregunta, nueva_Pregunta, nueva_respuesta) {
        this.fk_idCuestionario = nuevo_fk_idCuestionario;
        this.Template = nuevo_Template;
        this.idPregunta = nuevo_idPregunta;
        this.Pregunta = nueva_Pregunta;
        this.Respuesta = nueva_respuesta;

    }

    static fetchFeedback(idCuestionario) {
        //console.log(db.execute('SELECT * FROM PreguntaRespuesta WHERE idCuestionario = (?)', [idCuestionario]));
        return db.execute('SELECT * FROM PreguntaRespuesta WHERE fk_idCuestionario = (?)', [idCuestionario]);
    }

    save() {
        return db.execute('INSERT INTO PreguntaRespuesta (Respuesta) VALUES (?)',
        [this.Respuesta]
    );
    }

    saveFeedback(){
        return db.execute('UPDATE PreguntaRespuesta SET Respuesta=? WHERE fk_idCuestionario = ? AND Template = ? AND idPregunta=? AND Pregunta=?',
        [this.Respuesta, this.fk_idCuestionario, this.Template, this.idPregunta, this.Pregunta]
        );
    }

    async getTemplateId(){
        //let query = ('SELECT id_rol_sistema FROM usuario_permisos WHERE nombre_empleado=?', [this.nombre]);
        res = await db.query('SELECT idTemplate FROM Template WHERE NombreTemplate=?', [this.NombreTemplate]);
        return res;
    };

}