const path = require('path');
const moment = require("moment"); // Para fechas

// --- MAIN --- //

const Empleado = require('../models/empleados');
const Observacion = require('../models/observacion');

exports.get_nuevo_empleado = (request, response, next) => {
    console.log('obtiene el método GET')
    Empleado.fetchAllEmpleados()
        .then(([rows, fieldData]) => {
            response.render('nuevoEmpleado', {
                empleados: rows,
                rol: request.session.idRol ? request.session.idRol : '',
                idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
                nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
                apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
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
        response.redirect('/lista');
    }).catch(err => console.log(err));
};

// Editar empleado:

exports.getEmpleado = (request, response, next) => {
    console.log(request.params.idEmpleado);
    console.log(request.cookies);
    Empleado.fetchOneEmpleado(request.params.idEmpleado)
        .then(([rows, fieldData]) => {
            //console.log(rows);
            response.render('empleado', {
                empleados: rows,
                rol: request.session.idRol ? request.session.idRol : '',
                idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
                nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
                apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
                email: request.session.email ? request.session.email : '',
                ultimo_empleado: request.cookies.ultimo_empleado ? request.cookies.ultimo_empleado : '',
                moment: moment
            }); 
        })
        .catch(err => {
            console.log(err);
        }); 
}

exports.updateEmpleado = (request, response, next) => {
    console.log(request.params.idEmpleado);
    console.log(request.body)
    const empleado = new Empleado(request.body.fechaIng, request.body.nombre, request.body.apellidoP, request.body.apellidoM, request.body.antiguedad, request.body.nivPeople, 
        request.body.nivCraft, request.body.nivBusiness, request.body.nivOverall, request.body.puesto, request.body.equipo, 
        request.body.email, request.body.password, request.body.fk_idChapter, request.body.fk_idRolJer, request.body.isActive);
        
    console.log('UPDATE')    
    
    console.log(request.cookies);
    empleado.update(request.params.idEmpleado).then(() => {
        response.redirect('/lista');
    }).catch(err => console.log(err));
};

//Listado

exports.listado = (request, response, next) => {
    Empleado.fetchAllEmpleados()
        .then(([rows, fieldData]) => {
            response.render('listaEmpleados', {
                empleados: rows,
                rol: request.session.idRol ? request.session.idRol : '',
                idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
                nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
                apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
                email: request.session.email ? request.session.email : '',
            })
        })
        .catch(err => console.log(err));
};

//el método para poder jalar las observaciones del empleado que está visualizando

exports.getObservacionesEmpleados = async (request, response, next) => {
    
};

exports.misObservaciones = async (request, response, next) => {

    Observacion.getObservaciones(request.session.idEmpleado, request.params.idMentorado).then(([observaciones, fieldData]) => {
        console.log(observaciones);
        response.render('misObservaciones', {
            observaciones: observaciones,
            rol: request.session.idRol ? request.session.idRol : '',
            idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
            nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
            apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
            email: request.session.email ? request.session.email : '',
            moment: moment,
        })
    }).catch(err => {
        console.log(err);
    }); 
}