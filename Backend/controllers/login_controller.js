const path = require('path');

// --- MAIN --- //

const Empleado = require('../models/empleados');
const bcrypt = require('bcryptjs');

// -- LOGIN -- //

// - Getter de la vista Login
exports.get_login = (request, response, next) => {
    response.render('login', {
        email: request.session.email ? request.session.email : '',
        info: ''
    }); 
};

// - Para renderizar el dashboard
exports.dashboard = (request, response, next) => {
    console.log('dashboard');
    response.render('index', {
        email: request.session.email ? request.session.email : '',
        nPeople: request.session.nPeople ? request.session.nPeople : '',
        nCraft: request.session.nCraft ? request.session.nCraft : '',
        nBusiness: request.session.nBusiness ? request.session.nBusiness : '',
        nOverall: request.session.nOverall ? request.session.nOverall : '',
    });
};

<<<<<<< HEAD
=======

>>>>>>> 839310d2b006207e79bafffdb7d65a673d4facfa
// - Autenticación del usuario
exports.login = (request, response, next) => {
    Empleado.findOne(request.body.email)
        .then(([rows, fielData])=>{
            console.log(request.body.email)
            //Si no existe el usuario, redirige a la pantalla de login
            if (rows.length < 1) {
                console.log('no existe el usuario')
                return response.redirect('/empleados/login');
            }

            request.session.idEmpleado = rows[0].idEmpleado;
            console.log(request.session.idEmpleado)

            const empleado = new Empleado(rows[0].fechaIng, rows[0].nombre, rows[0].apellidoP, rows[0].apellidoM, rows[0].antiguedad, 
                rows[0].nivPeople, rows[0].nivCraft, rows[0].nivBusiness, rows[0].nivOverall, rows[0].puesto, rows[0].equipo, rows[0].email, 
                rows[0].password, rows[0].fk_idChapter, rows[0].fk_idRolJer, rows[0].isActive);
            bcrypt.compare(request.body.password, empleado.password).then(doMatch => {
                    if (doMatch) {
                        request.session.isLoggedIn = true;
                        request.session.empleado = empleado;
                        request.session.email = empleado.email;
                        request.session.nPeople = empleado.nivPeople;
                        request.session.nCraft = empleado.nivCraft;
                        request.session.nBusiness = empleado.nivBusiness;
                        request.session.nOverall = empleado.nivOverall;
                        
                        console.log('success')
                        return request.session.save(err => {
                            //empleado.getRolSis();
                            res = 0;
                            empleado.getRolSis().then(([rows])=>{
                                console.log(rows[0].id_rol_sistema);
                                const rolSis = rows[0].id_rol_sistema;
                                if (rolSis == 1) {
                                    if(empleado.fk_idRolJer == 1){ // Member
                                        console.log('Member')
<<<<<<< HEAD
=======
                                        
>>>>>>> 839310d2b006207e79bafffdb7d65a673d4facfa
                                    } else if (empleado.fk_idRolJer == 2){ //Chapter Lead Assistant
                                        console.log('CLA')
                                    } else {  //Chapter Leader
                                        console.log('CL')
                                    }
                                    console.log('éxito RBAC miembro')
                                    response.redirect('./dashboard');
                                } else if (rolSis == 2) {
                                    console.log('éxito RBAC admin')
                                    response.redirect('./dashboard');
                                } else {
                                    //por ahora para facilitar el ingreos a cualquier persona
                                    response.redirect('./dashboard');
                                }
                            });
                            
                        });
                    }
                    console.log('password incorrecto')
                    response.redirect('/empleados/login');
                }).catch(err => {
                    response.redirect('/empleados/login');
                });
        }).catch((error)=>{
            console.log(error)
        });
    
};



// - Para cerrar la sesión
exports.logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/empleados/login'); //Este código se ejecuta cuando la sesión se elimina.
    });
};

exports.root = (request, response, next) => {
    response.redirect('/empleados/login'); 
};