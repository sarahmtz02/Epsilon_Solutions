const path = require('path');
// --- MAIN --- //
const Empleado = require('../models/empleados');
const bcrypt = require('bcryptjs');

exports.get_nuevo_empleado = (request, response, next) => {
    console.log('obtiene el método GET')
    Empleado.fetchAllEmpleados()
        .then(([rows, fieldData]) => {
            response.render('nuevoEmpleado', {
                empleados: rows,
                email: request.session.email ? request.session.email : '',
            })
        })
        .catch(err => console.log(err));
};

exports.post_nuevo_empleado = (request, response, next) => {    
    const empleado = 
    new Empleado(request.body.fechaIng, request.body.nombre, request.body.apellidoP, request.body.apellidoM, request.body.antiguedad, request.body.nivPeople, 
        request.body.nivCraft, request.body.nivBusiness, request.body.nivOverall, request.body.puesto, request.body.equipo, 
        request.body.email, request.body.password, request.body.fk_idChapter, request.body.fk_idRolJer, request.body.isActive);
        console.log('obtiene el método POST')
    empleado.save().then(() => {
        response.setHeader('Set-Cookie', 'ultimo_empleado='+empleado.nombre+'; HttpOnly', 'utf8');
        response.render();
    }).catch(err => console.log(err));
};


exports.listado = (request, response, next) => {
    Empleado.fetchAllEmpleados()
        .then(([rows, fieldData]) => {
            response.render('listaEmpleados', {
                empleados: rows,
                email: request.session.email ? request.session.email : '',
            })
        })
        .catch(err => console.log(err));
};


// -- LOGIN -- //
exports.get_login = (request, response, next) => {
    response.render('login', {
        email: request.session.email ? request.session.email : '',
        info: ''
    }); 
};

exports.dashboard = (request, response, next) => {
    console.log('dashboard');
    response.render('index', {
        email: request.session.email ? request.session.email : '',
        info: ''
    }); 
};

exports.login = (request, response, next) => {
    Empleado.findOne(request.body.email)
        .then(([rows, fielData])=>{
            console.log('el usuario existe')
            //Si no existe el usuario, redirige a la pantalla de login
            if (rows.length < 1) {
                console.log('no existe el usuario')
                return response.redirect('/empleados/login');
            }

            const empleado = new Empleado(rows[0].fechaIng, rows[0].nombre, rows[0].apellidoP, rows[0].apellidoM, rows[0].antiguedad, 
                rows[0].nivPeople, rows[0].nivCraft, rows[0].nivBusiness, rows[0].nivOverall, rows[0].puesto, rows[0].equipo, rows[0].email, 
                rows[0].password, rows[0].fk_idChapter, rows[0].fk_idRolJer, rows[0].isActive);
            bcrypt.compare(request.body.password, empleado.password).then(doMatch => {
                    if (doMatch) {
                        request.session.isLoggedIn = true;
                        request.session.empleado = empleado;
                        request.session.email = empleado.email;
                        console.log('success')
                        return request.session.save(err => {
                            response.redirect('./dashboard');
                            console.log('success redirect')
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

exports.logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/empleados/login'); //Este código se ejecuta cuando la sesión se elimina.
    });
};

exports.root = (request, response, next) => {
    response.redirect('/empleados/login'); 
};