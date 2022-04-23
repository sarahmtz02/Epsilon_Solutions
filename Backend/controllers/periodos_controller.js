const path = require('path');
const moment = require("moment-timezone"); // Para fechas
// --- MAIN --- //

const Periodo = require('../models/periodo');
moment.locale('es-mx');
// PERIODO EVALUACION //

exports.root = (request, response, next) => {
    Periodo.fetchAllPeriodos()
        .then(([rows, fieldData]) => {
            response.render('periodos', {
                periodos: rows,
                moment: moment,
                email: request.session.email ? request.session.email : '',
                rol: request.session.idRol ? request.session.idRol : '',
                idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
                nivel_P: request.session.nPeople ? request.session.nPeople : '',
                nivel_C: request.session.nCraft ? request.session.nCraft : '',
                nivel_B: request.session.nBusiness ? request.session.nBusiness : '',
                nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
                apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
            })
        })
        .catch(err => console.log(err));
};

exports.get_nuevo_periodo = (request, response, next) => {
    console.log('obtiene el método GET')
    Periodo.fetchAllPeriodos()
        .then(([rows, fieldData]) => {
            response.render('nuevoPeriodo', {
                periodos: rows,
                moment: moment,
                email: request.session.email ? request.session.email : '',
                rol: request.session.idRol ? request.session.idRol : '',
                idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
                nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
                apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
            })
        })
        .catch(err => console.log(err));
};

exports.post_nuevo_periodo = (request, response, next) => {    
    const periodo = new Periodo(request.body.FechaInicio, request.body.FechaFin);
    console.log('obtiene el método POST')
    periodo.save().then(() => {
        response.setHeader('Set-Cookie', 'ultimo_periodo='+periodo.nombre+'; HttpOnly', 'utf8');
        response.redirect('/periodos')
    }).catch(err => console.log(err));
};