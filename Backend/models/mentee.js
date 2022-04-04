const db = require('../util/database');

module.exports = class Mentee{
    constructor(nuevo_fk_idLead, nuevo_idMentee, nueva_descAsignacion) {
        this.fk_idLead = nuevo_fk_idLead;
        this.idMentee = nuevo_idMentee;
        this.descAsignacion = nueva_descAsignacion;
    }

    static fetchAllMentees() {
        console.log(db.execute('SELECT * FROM Mentees'));
         return db.execute('SELECT * FROM Mentees');
    }

    save() {
        return db.execute('INSERT INTO Mentees (fk_idLead, idMentee, descAsignacion) VALUES (?, ?, ?)',
        [this.fk_idLead, this.idMentee, this.descAsignacion]
    );
    }

}