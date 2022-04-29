const path = require('path');
const moment = require("moment-timezone"); // Para fechas
moment.locale('es-mx');
// -- MAIN -- //
const Empleado = require('../models/empleados');
const Mentee = require('../models/mentee');
const bcrypt = require('bcryptjs');
<<<<<<< HEAD
=======
const Cuestionario = require('../models/cuestionario');
>>>>>>> bae4f75f8e07711af4e7509fd2294eb5a54b078e

// -- LOGIN -- //

// - Getter de la vista Login
exports.get_login = (request, response, next) => {
    response.render('login', {
        email: request.session.email ? request.session.email : '',
        info: ''
    }); 
};

<<<<<<< HEAD
exports.main = (request, response, next) => {
    let roles = [1, 2, 3]; // roles autorizados
    response.render('index', { // mandamos su informacion al sidenav
=======
exports.main =  async (request, response, next) =>  {
    let roles = [1, 2, 3]; // roles autorizados
    const answered = await Cuestionario.get_answered();
    const notanswered = await Cuestionario.get_notanswered();
    console.log(answered);
    console.log(notanswered);
    response.render('index', { 
>>>>>>> bae4f75f8e07711af4e7509fd2294eb5a54b078e
        email: request.session.email ? request.session.email : '',
        rol: request.session.idRol ? request.session.idRol : '',
        roles_autorizados: roles,
        idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
        nivel_P: request.session.nPeople ? request.session.nPeople : '',
        nivel_C: request.session.nCraft ? request.session.nCraft : '',
        nivel_B: request.session.nBusiness ? request.session.nBusiness : '',
        nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
        apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
<<<<<<< HEAD

=======
        answered: answered,
        notanswered: notanswered
>>>>>>> bae4f75f8e07711af4e7509fd2294eb5a54b078e
    });
};

exports.login = (request, response, next) => {
    Empleado.findOne(request.body.email)
        .then(([rows, fielData]) => {

        //Si no existe el correo, redirige a la pantalla de login
        if (rows.length < 1) {
            return response.redirect('/empleados/login');
        }

    // Info. del usuario sesionado
    request.session.isLoggedIn = true;
    request.session.idEmpleado = rows[0].idEmpleado;
    request.session.nombreSesion = rows[0].nombre;
    request.session.apellidoPSesion = rows[0].apellidoP;

    request.session.email = rows[0].email;
    request.session.idRol = rows[0].fk_idRolJer;

    // Nivel en cada dimensión del sesionado
    request.session.nCraft = rows[0].nivCraft;
    request.session.nPeople = rows[0].nivPeople;
    request.session.nBusiness = rows[0].nivBusiness;
    request.session.nOverall = rows[0].nivOverall;

    // Password del empleado para comparar
    request.session.pw = rows[0].password;

    // Si el password es correcto, has lo que está adentro del if
    bcrypt.compare(request.body.password, request.session.pw).then(doMatch => {
        if (doMatch) {
            // Redirección al Dashboard
            console.log('success login');
            return response.redirect('./dashboard');       
        } else {
            return response.redirect('/empleados/login')
        }
    });

    }).catch((error) => {
        console.log(error);
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

// Cuestionarios del empleado en sesión donde él fue evaluado

exports.panelFeedback = (request, response, next) => {
    response.render('panelFeedback', {
        email: request.session.email ? request.session.email : '',
        rol: request.session.idRol ? request.session.idRol : '',
        idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
        nivel_P: request.session.nPeople ? request.session.nPeople : '',
        nivel_C: request.session.nCraft ? request.session.nCraft : '',
        nivel_B: request.session.nBusiness ? request.session.nBusiness : '',
        nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
        apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
        moment: moment,
    })
}

exports.listaFeedback = async (request, response, next) => {
    Empleado.miFeedback(request.session.idEmpleado).then(([cuestCompas, fieldData]) => {
        response.render('cuestCompañeros', {
            cuestCompas: cuestCompas,
            rol: request.session.idRol ? request.session.idRol : '',
            idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
            nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
            apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
            email: request.session.email ? request.session.email : '',
            moment: moment,
        })
    })
}

exports.evalCompa = async (request, response, next) => {
    const idEvaluador = await Mentee.getIdEvaluador(request.params.idCuestionario);
    const idEvaluado = await Mentee.getIdEvaluado(request.params.idCuestionario);

    // Ojo que este método selecciona el periodo más reciente (en el que se está evaluando)
    const periodo = await Mentee.getPeriodo();

    // Para el nombre del evaluador
    Mentee.getNombreEmpleado(idEvaluador).then(([nombreEs, fieldData]) => {

        Mentee.getNombreEmpleado(idEvaluado).then(([nombreMs, fieldData]) => {
            console.log(request.params.idCuestionario)
            Mentee.getAnsCuest(request.params.idCuestionario).then(([answers, fieldData]) => {
                console.log(answers);
                response.render('evalCompañero', {
                    answers: answers,
                    idEvaluador: idEvaluador,
                    idEvaluado: idEvaluado,
                    periodo: periodo,
                    nombreEs: nombreEs,
                    nombreMs: nombreMs,
                    rol: request.session.idRol ? request.session.idRol : '',
                    idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
                    nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
                    apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
                    email: request.session.email ? request.session.email : '',
                    moment: moment,
                })
            })
        }).catch(err => {
            console.log(err);
        }); 
    })
}

exports.misObservaciones = async (request, response, next) => {
    Empleado.misObservaciones(request.session.idEmpleado).then(([obsCompas, fieldData]) => {
        response.render('obsMentores', {
            obsCompas: obsCompas,
            rol: request.session.idRol ? request.session.idRol : '',
            idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
            nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
            apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
            email: request.session.email ? request.session.email : '',
            moment: moment, 
        })
    })
}

