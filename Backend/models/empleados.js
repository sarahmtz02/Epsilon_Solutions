const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Empleado {

    //Constructor de la clase. PROBLABLEMENTE VAMOS A NECESITAR PONER TODOS LOS ATRIBUTOS EN UN FUTURO!!
    constructor(nueva_fechaIng, nuevo_nombre, nuevo_apellidop, nuevo_apellidom, nueva_antiguedad, nuevo_nivpeople, nuevo_nivcraft, nuevo_nivbusiness, 
        nuevo_nivoverall, nuevo_puesto, nuevo_equipo, nuevo_email, nuevo_password, nuevo_chapterE, nuevo_roljerE, nuevo_statusE) {
        this.fechaIng = nueva_fechaIng;
        this.nombre = nuevo_nombre;
        this.apellidoP = nuevo_apellidop;
        this.apellidoM = nuevo_apellidom;
        this.antiguedad = nueva_antiguedad;
        this.nivPeople = nuevo_nivpeople;
        this.nivCraft = nuevo_nivcraft;
        this.nivBusiness = nuevo_nivbusiness;
        this.nivOverall = nuevo_nivoverall;
        this.puesto = nuevo_puesto;
        this.equipo = nuevo_equipo;
        this.email = nuevo_email;
        this.password = nuevo_password;
        this.fk_idChapter = nuevo_chapterE;
        this.fk_idRolJer = nuevo_roljerE;
        this.isActive = nuevo_statusE;
    }

    //Por ahora sin método para guardar nuevos empleados

    static getEmpleado(){
        return db.execute('SELECT *  FROM Empleado WHERE idEmpleado = (?)',[this.id]
        );
    }
    
    async getRolSis(){
        //let query = ('SELECT id_rol_sistema FROM usuario_permisos WHERE nombre_empleado=?', [this.nombre]);
        res = await db.query('SELECT id_rol_sistema FROM usuario_permisos WHERE nombre_empleado=?', [this.nombre]);
        return res;
    };

    static fetchOneEmpleado(idEmpleado) {
        return db.execute('SELECT * FROM Empleado WHERE idEmpleado=?', [idEmpleado]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAllEmpleados() {
       console.log(db.execute('SELECT * FROM Empleado WHERE isActive = 1'));
        return db.execute('SELECT * FROM Empleado WHERE isActive = 1');
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    save() {
        return bcrypt.hash(this.password, 12)
            .then((password_cifrado)=>{
                return db.execute(
                    'INSERT INTO Empleado(fechaIng, nombre, apellidoP, apellidoM, antiguedad, nivPeople, nivCraft, nivBusiness, nivOverall, puesto, equipo, email, password, fk_idChapter, fk_idRolJer, isActive) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                    [this.fechaIng,
                        this.nombre,
                        this.apellidoP,
                        this.apellidoM,
                        this.antiguedad,
                        this.nivPeople,
                        this.nivCraft,
                        this.nivBusiness,
                        this.nivOverall,
                        this.puesto,
                        this.equipo,
                        this.email,
                        password_cifrado,
                        this.fk_idChapter,
                        this.fk_idRolJer,
                        this.isActive]);
            }).catch((error)=>{
                console.log(error);
            }); 
    }

    static updateEmpleado(idEmpleado, nombre, apellidoP, apellidoM, antiguedad, nivPeople, nivBusiness, nivCraft, 
        nivOverall, puesto, equipo, email, password, fk_idChapter, fk_idRolJer){
        return bcrypt.hash(password, 12)
        .then((password_cifrado)=>{
            return db.execute('UPDATE Empleado SET nombre=?,apellidoP=?,apellidoM=?,antiguedad=?,nivPeople=?,nivCraft=?,nivBusiness=?,nivOverall=?,puesto=?,equipo=?,email=?,password=?,fk_idChapter=?,fk_idRolJer=? WHERE idEmpleado=?',
            [nombre, apellidoP, apellidoM, antiguedad, nivPeople, nivBusiness, nivCraft, 
                nivOverall, puesto, equipo, email, password_cifrado, fk_idChapter, fk_idRolJer, idEmpleado])
        })
    }

    static findOne(email) {
        return db.execute('SELECT * FROM Empleado WHERE email=?',
            [email]);
    }

    static bajaEmpleado(idEmpleado) {
        return db.execute('UPDATE Empleado SET isActive = 0 WHERE idEmpleado = ?', [idEmpleado]);
    }

    static miFeedback(idEmpleado) {
        return db.execute('SELECT idCuestionario, nombre, apellidoP, apellidoM, FechaInicio, FechaFin FROM Empleado E, Cuestionario C, PeriodoEvaluacion PE WHERE E.idEmpleado = C.fk_idEvaluador AND C.idEvaluado = ? AND C.fk_idPeriodo = PE.idPeriodo AND C.isAnswered = 1', 
        [idEmpleado])
    }

    static misObservaciones(idEmpleado) {
        return db.execute('SELECT idObservacion, fk_idEvaluado, a.nombre, a.apellidoP, a.apellidoM, fk_idLead, b.nombre AS nomMentor, b.apellidoP AS apellidoPM, b.apellidoM AS apellidoMM, descObservacion FROM Observacion o INNER JOIN Empleado a ON o.fk_idEvaluado = a.idEmpleado INNER JOIN Empleado b ON o.fk_idLead = b.idEmpleado WHERE fk_idEvaluado = ?',
        [idEmpleado])
    }
}