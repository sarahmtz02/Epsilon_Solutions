const path = require('path');
<<<<<<< HEAD
const moment = require("moment-timezone"); // Para fechas
<<<<<<< HEAD
=======
>>>>>>> 839310d2b006207e79bafffdb7d65a673d4facfa
=======

>>>>>>> 9959fb5536b5304e5b6cb85e7de2df0b84866d9a
// --- MAIN --- //

const Periodo = require('../models/periodo');
moment.locale('es-mx');
// PERIODO EVALUACION //

exports.root = (request, response, next) => {
    const date = new Date();
    const currentDate = new Date(date.toDateString());
    Periodo.fetchAllPeriodos()
        .then(([rows, fieldData]) => {
            response.render('periodos', {
                periodos: rows,
<<<<<<< HEAD
                moment: moment,
<<<<<<< HEAD
=======
>>>>>>> 839310d2b006207e79bafffdb7d65a673d4facfa
=======
                fecha: currentDate,
>>>>>>> 9959fb5536b5304e5b6cb85e7de2df0b84866d9a
                email: request.session.email ? request.session.email : '',
                rol: request.session.idRol ? request.session.idRol : '',
                idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
                nivel_P: request.session.nPeople ? request.session.nPeople : '',
                nivel_C: request.session.nCraft ? request.session.nCraft : '',
                nivel_B: request.session.nBusiness ? request.session.nBusiness : '',
                nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
                apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
                warning_empalme : request.flash('warningE'),
            })
        })
        .catch(err => console.log(err));
};

exports.get_nuevo_periodo = (request, response, next) => {
    console.log('obtiene el método GET')
    const date = new Date();
    const currentDate = new Date(date.toDateString());
    const currentPeriodo = Periodo.getPeriodo();
    console.log(currentDate);
    Periodo.fetchAllPeriodos()
        .then(([rows, fieldData]) => {
            response.render('nuevoPeriodo', {
                periodos: rows,
<<<<<<< HEAD
<<<<<<< HEAD
=======
                fecha: currentDate,
                currentPeriodos: currentPeriodo,
>>>>>>> 9959fb5536b5304e5b6cb85e7de2df0b84866d9a
                moment: moment,
=======
>>>>>>> 839310d2b006207e79bafffdb7d65a673d4facfa
                email: request.session.email ? request.session.email : '',
                rol: request.session.idRol ? request.session.idRol : '',
                idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
                nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
                apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
            })
        })
        .catch(err => console.log(err));
};

<<<<<<< HEAD
exports.post_nuevo_periodo = (request, response, next) => {    
<<<<<<< HEAD
    const periodo = new Periodo(request.body.FechaInicio, request.body.FechaFin);
    console.log('obtiene el método POST')
    periodo.save().then(() => {
        response.setHeader('Set-Cookie', 'ultimo_periodo='+periodo.nombre+'; HttpOnly', 'utf8');
        response.redirect('/empleados/periodos')
    }).catch(err => console.log(err));
=======
    
    if(request.body.FechaInicio>request.body.FechaFin){
        console.log("La fecha de inicio es mayor que la de fin")
    }
    else{
        const periodo = new Periodo(request.body.FechaInicio, request.body.FechaFin);
        console.log('obtiene el método POST')
        periodo.save().then(() => {
            response.redirect("/empleados/dashboard")
            //response.setHeader('Set-Cookie', 'ultimo_periodo='+periodo.nombre+'; HttpOnly', 'utf8');
        }).catch(err => console.log(err));
    }
    
>>>>>>> 839310d2b006207e79bafffdb7d65a673d4facfa
=======
exports.post_nuevo_periodo = async (request, response, next) => {
    
    const checkOlap = await Periodo.checkOverlap(request.body.FechaInicio, request.body.FechaFin);
    console.log(checkOlap);

    if (checkOlap[0] != null) {
        request.flash('warningE', 'No se pudo agregar el periodo, existe un empalme')
        response.redirect('/periodos')
    } else {
        const periodo = new Periodo(request.body.FechaInicio, request.body.FechaFin);
        console.log('obtiene el método POST')
        periodo.save().then(() => {
        response.setHeader('Set-Cookie', 'ultimo_periodo='+periodo.nombre+'; HttpOnly', 'utf8');
        response.redirect('/periodos')
        }).catch(err => console.log(err));
    }
>>>>>>> 9959fb5536b5304e5b6cb85e7de2df0b84866d9a
};