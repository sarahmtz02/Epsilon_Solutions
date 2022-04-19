const path = require('path');
const moment = require("moment"); // Para fechas

// --- MAIN --- //

const Empleado = require('../models/empleados');

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
        //response.setHeader('Set-Cookie', 'ultimo_empleado='+empleado.nombre+'; HttpOnly', 'utf8');
        response.redirect("/empleados/lista");
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
                moment: moment
            }); 
        })
        .catch(err => {
            console.log(err);
        }); 
}

exports.updateEmpleado = (request, response, next) => {
    const empleado = 
    new Empleado(request.body.fechaIng, request.body.nombre, request.body.apellidoP, request.body.apellidoM, request.body.antiguedad, request.body.nivPeople, 
        request.body.nivCraft, request.body.nivBusiness, request.body.nivOverall, request.body.puesto, request.body.equipo, 
        request.body.email, request.body.password, request.body.fk_idChapter, request.body.fk_idRolJer, request.body.isActive);
        console.log('obtiene el método POST')    
    console.log(request.params.idEmpleado);
    console.log(request.cookies);
    empleado.update(request.params.idEmpleado).then(() => {
        response.redirect("/empleados/lista");
    }).catch(err => console.log(err));
};

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