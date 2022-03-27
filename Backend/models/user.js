const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class User {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_nombre, nuevo_email, nuevo_password) {
        this.nombre = nuevo_nombre;
        this.email = nuevo_email;
        this.password = nuevo_password;
    }

    //Por ahora sin método para guardar nuevos empleados, eso se hará desde otro model/controller
    save() {
        return bcrypt.hash(this.password, 12)
            .then((password_cifrado)=>{
                return db.execute(
                    'INSERT INTO empleado(nombre, email, password) VALUES(?,?,?)',
                    [this.nombre, this.username, password_cifrado]);
            }).catch((error)=>{
                console.log(error);
            }); 
    }


    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static findOne(email) {
        return db.execute('SELECT * FROM empleado WHERE email=?',
            [email]);
    }

}