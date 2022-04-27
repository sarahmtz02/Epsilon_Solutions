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

    // Obtiene todos los empleados con rol de chapter lead asistant
    static getEmpleadosCLA(){
        return db.execute('SELECT nombre, apellidoP, apellidoM, idEmpleado FROM Empleado WHERE fk_idRolJer = 2 ')
        .then(([rows, fielData]) => {
            return rows;
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });;
    }
// Obtiene todos los empleados con rol Member
    static getEmpleadosM(){
        return db.execute('SELECT nombre, apellidoP, apellidoM, idEmpleado  FROM Empleado WHERE fk_idRolJer = 1 ')
        .then(([rows, fielData]) => {
            return rows;
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });;
    }
    static getIdEmpleado(Empleado){
        return db.execute('SELECT idEmpleado FROM Empleado WHERE CONCAT(nombre , " ", apellidoP, " ", apellidoM) = ? ;', [Empleado]).then(([rows, fielData]) => {
            return rows;
        })
        .catch((error) => {
            console.log(error);
            return 0;
        });
    }

    save() {
        return db.execute('INSERT INTO Mentees (fk_idLead, idMentee, descAsignacion) VALUES (?, ?, ?)',
        [this.fk_idLead, this.idMentee, this.descAsignacion])
    .catch((error) => {
        console.log(error);
        return 0;
    });
    }

}