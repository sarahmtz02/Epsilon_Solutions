const path = require('path');
const moment = require("moment"); // Para fechas
moment.locale('es-mx');
// -- MAIN -- //
const Empleado = require('../models/empleados');
const bcrypt = require('bcryptjs');
const swal = require('sweetalert2')

// -- LOGIN -- //

// - Getter de la vista Login
exports.get_login = (request, response, next) => {
    response.render('login', {
        email: request.session.email ? request.session.email : '',
        info: ''
    }); 
};

exports.main = (request, response, next) => {
    let roles = [1, 2, 3]; // roles autorizados
    response.render('index', { // mandamos su informacion al sidenav
        email: request.session.email ? request.session.email : '',
        rol: request.session.idRol ? request.session.idRol : '',
        roles_autorizados: roles,
        idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
        nivel_P: request.session.nPeople ? request.session.nPeople : '',
        nivel_C: request.session.nCraft ? request.session.nCraft : '',
        nivel_B: request.session.nBusiness ? request.session.nBusiness : '',
        nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
        apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',

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
    swal.fire({
        title: 'Error!',
        text: 'Usuario o contraseña incorrectos. Intenta de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    response.redirect('/empleados/login');
};