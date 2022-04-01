const db = require('../util/database');

module.exports = class Empleados {

    //Constructor de la clase. PROBLABLEMENTE VAMOS A NECESITAR PONER TODOS LOS ATRIBUTOS EN UN FUTURO!!
    constructor(nuevo_nombre, nuevo_apellidop, nuevo_apellidom, nuevo_nivoverall, nuevo_equipo, nuevo_email, nuevo_password) {
        this.nombre = nuevo_nombre;
        this.apellidoP = nuevo_apellidop;
        this.apellidoM = nuevo_apellidom;
        this.nivOverall = nuevo_nivoverall;
        this.equipo = nuevo_equipo;
        this.email = nuevo_email;
        this.password = nuevo_password;
    }

    //Por ahora sin método para guardar nuevos empleados

    getEmpleado(){
        return db.execute('SELECT *  FROM empleado WHERE idEmpleado = (?)',[this.id]
        );
    }

    static fetchOneEmpleado(idEmpleado) {
        return db.execute('SELECT * FROM empleado WHERE idEmpleado=?', [idEmpleado]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAllEmpleados() {
       console.log(db.execute('SELECT * FROM empleado'));
        return db.execute('SELECT * FROM empleado');
    }
    //Este método servirá para devolver los objetos del almacenamiento persistente.
}