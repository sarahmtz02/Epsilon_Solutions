const db = require('../util/DB');
const bcrypt = require('bcryptjs');

module.exports = class User {
    constructor(nuevo_usuario, nuevo_passwd, nuevo_nombre) {
         this.usuario = nuevo_usuario;
         this.password = nuevo_passwd;
         this.nombre = nuevo_nombre;
     }
    save(){
      console.log('save')
      return db.execute("CALL RegistrarEmpleado(123,'Hi','Resendiz','Fernandez',12,1.2,1.3,2.1,2.4,'Ingeniero','Equipo9','Resendizgod@gmail','qwert',123,5860,1)")
      console.log('save')
  };
//            "CALL RegistrarEmpleado(123,'Hi','Resendiz','Fernandez',12,1.2,1.3,,2.1,2.4,'Ingeniero','Equipo9','Resendizgod@gmail',?,1,2,1)"
    static findOne(email) {
        return db.execute(
            'SELECT * FROM usuarios WHERE username=?', [email]);
     }
   }