const path = require('path');
<<<<<<< HEAD
const moment = require("moment-timezone"); // Para fechas
=======
>>>>>>> 839310d2b006207e79bafffdb7d65a673d4facfa
// --- MAIN --- //

const Periodo = require('../models/periodo');

// PERIODO EVALUACION //

exports.periodos = (request, response, next) => {
    Periodo.fetchAllPeriodos()
        .then(([rows, fieldData]) => {
            response.render('periodos', {
                periodos: rows,
<<<<<<< HEAD
                moment: moment,
=======
>>>>>>> 839310d2b006207e79bafffdb7d65a673d4facfa
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
<<<<<<< HEAD
                moment: moment,
=======
>>>>>>> 839310d2b006207e79bafffdb7d65a673d4facfa
                email: request.session.email ? request.session.email : '',
            })
        })
        .catch(err => console.log(err));
};

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
};