const db = require('../util/database');

module.exports = class Mentees {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(id_Mentees, id_Lead, id_CM, descripcion) {
        this.id_mentees = id_Mentees;
        this.id_lead = id_Lead;
        this.id_CM = id_CM;
        this.descripcion = descripcion;
    }


    save() {
        return db.execute("CALL "
            
        )
    }
}