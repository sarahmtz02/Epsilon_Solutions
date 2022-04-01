const db = require('../util/database');

module.exports = class Mentee{
    constructor(nuevo_fk_idLead, nuevo_idMentee, nueva_descAsignacion) {
        this.fk_idLead = nuevo_fk_idLead;
        this.idMentee = nuevo_idMentee;
        this.descAsignacion = nueva_descAsignacion;
    }

    static fetchAllMentees() {
        console.log(db.execute('SELECT * FROM mentees'));
         return db.execute('SELECT * FROM mentees');
    }

    save() {
        return db.execute('INSERT INTO mentees (fk_idLead, idMentee, descAsignacion) VALUES (?, ?, ?)',
        [this.fk_idLead, this.idMentee, this.descAsignacion]
    );
    }

}