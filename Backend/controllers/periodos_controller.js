const path = require('path');

// --- MAIN --- //

const Periodo = require('../models/periodo');

// PERIODO EVALUACION //

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