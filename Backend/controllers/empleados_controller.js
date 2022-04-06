const path = require('path');
// --- MAIN --- //
const Empleado = require('../models/empleados');
const Periodo = require('../models/periodo');
const Mentee = require('../models/mentee');
const Templates = require('../models/templates');
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


// Editar empleado:

exports.getEmpleado = (request, response, next) => {
    console.log(request.params.idEmpleado);

    console.log(request.cookies);
    Empleado.fetchOneEmpleado(request.params.idEmpleado)
        .then(([rows, fieldData]) => {
            console.log(rows);
            response.render('empleado', {
                empleados: rows,
                email: request.session.email ? request.session.email : '',
                ultimo_empleado: request.cookies.ultimo_empleado ? request.cookies.ultimo_empleado : '',
            }); 
        })
        .catch(err => {
            console.log(err);
        }); 
}


//Listado

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

exports.templates = (request, response, next) => {
    Templates.fetchAllTemplates()
        .then(([rows, fieldData]) => {
            response.render('templates', {
                templates: rows,
                email: request.session.email ? request.session.email : '',
            })
        })
        .catch(err => console.log(err));
};

exports.periodos = (request, response, next) => {
    Periodo.fetchAllPeriodos()
        .then(([rows, fieldData]) => {
            response.render('periodos', {
                periodos: rows,
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
                            //empleado.getRolSis();
                            res = 0;
                            empleado.getRolSis().then(([rows])=>{
                                console.log(rows[0].id_rol_sistema);
                                const rolSis = rows[0].id_rol_sistema;
                                if (rolSis == 1) {
                                    if(empleado.fk_idRolJer == 1){ // Member
                                        console.log('Member')
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

exports.logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/empleados/login'); //Este código se ejecuta cuando la sesión se elimina.
    });
};

exports.root = (request, response, next) => {
    response.redirect('/empleados/login'); 
};


// PERIODO EVALUACION //

exports.get_nuevo_periodo = (request, response, next) => {
    console.log('obtiene el método GET')
    Periodo.fetchAllPeriodos()
        .then(([rows, fieldData]) => {
            response.render('nuevoPeriodo', {
                periodos: rows,
                email: request.session.email ? request.session.email : '',
            })
        })
        .catch(err => console.log(err));
};

exports.post_nuevo_periodo = (request, response, next) => {    
    const periodo = new Periodo(request.body.FechaInicio, request.body.FechaFin);
    console.log('obtiene el método POST')
    periodo.save().then(() => {
        response.setHeader('Set-Cookie', 'ultimo_periodo='+periodo.nombre+'; HttpOnly', 'utf8');
        response.render()
    }).catch(err => console.log(err));
};

// MENTEES //

exports.get_nuevo_mentee = (request, response, next) => {
    console.log('obtiene el método GET')
    Mentee.fetchAllMentees()
        .then(([rows, fieldData]) => {
            response.render('nuevoMentee', {
                empleados: rows,
                email: request.session.email ? request.session.email : '',
            })
        })
        .catch(err => console.log(err));
};

exports.post_nuevo_mentee = (request, response, next) => {    
    const mentee = new Mentee(request.body.fk_idLead, request.body.idMentee, request.body.descAsignacion);
    console.log('obtiene el método POST')
    mentee.save().then(() => {
        response.setHeader('Set-Cookie', 'ultimo_mentee='+mentee.nombre+'; HttpOnly', 'utf8');
        response.render()
    }).catch(err => console.log(err));
};

// TEMPLATE

exports.get_nueva_template = (request, response, next) => {
    console.log('obtiene el método GET')
    Templates.fetchAllTemplates()
        .then(([rows, fieldData]) => {
            response.render('nuevaTemplate', {
                templates: rows,
                email: request.session.email ? request.session.email : '',
            })
        })
        .catch(err => console.log(err));
};

exports.post_nueva_template = (request, response, next) => {    
    const templates = new Templates(request.body.NombreTemplate);
    console.log('obtiene el método POST')
    templates.save().then(() => {
        response.setHeader('Set-Cookie', 'ultimo_periodo='+templates.nombre+'; HttpOnly', 'utf8');
        response.render()
    }).catch(err => console.log(err));
};