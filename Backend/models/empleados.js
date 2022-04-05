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
        return db.execute('SELECT *  FROM empleado WHERE idEmpleado = (?)',[this.id]
        );
    }
    
    async getRolSis(){
        //let query = ('SELECT id_rol_sistema FROM usuario_permisos WHERE nombre_empleado=?', [this.nombre]);
        res = await db.query('SELECT id_rol_sistema FROM usuario_permisos WHERE nombre_empleado=?', [this.nombre]);
        return res;
    };

    static fetchOneEmpleado(idEmpleado) {
        return db.execute('SELECT * FROM empleado WHERE idEmpleado=?', [idEmpleado]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAllEmpleados() {
       console.log(db.execute('SELECT * FROM empleado'));
        return db.execute('SELECT * FROM empleado');
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    save() {
        return bcrypt.hash(this.password, 12)
            .then((password_cifrado)=>{
                return db.execute(
                    'INSERT INTO empleado(fechaIng, nombre, apellidoP, apellidoM, antiguedad, nivPeople, nivCraft, nivBusiness, nivOverall, puesto, equipo, email, password, fk_idChapter, fk_idRolJer, isActive) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
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

    async update(idEmpleado){
        const result = db.query('UPDATE empleado SET fechaIng=?, nombre = ?, apellidoP=?, apellidoM=?, antiguedad=?, nivPeople=?, nivCraft=?, nivBusiness=?, nivOverall=?, puesto=?, equipo=?, email=?, password=?, fk_idChapter=? fk_idRolJer=?, isActive=? WHERE idEmpleado = ?',
        [idEmpleado, this.fechaIng,
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
    }

    static findOne(email) {
        return db.execute('SELECT * FROM empleado WHERE email=?',
            [email]);
    }
}