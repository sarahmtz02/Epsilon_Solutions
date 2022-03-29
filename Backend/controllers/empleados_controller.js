const path = require('path');
// --- MAIN --- //
const Empleados = require('../models/empleados');

exports.get_nuevo_empleado = (request, response, next) => {
    Empleados.fetchAllEmpleados()
        .then(([rows, fieldData]) => {
            response.render('nuevoEmpleado', {
                empleados: rows,
                email: request.session.email ? request.session.email : '',
            })
        })
        .catch(err => console.log(err));
};


exports.principal = (request, response, next) => {
    Empleados.fetchAllEmpleados()
        .then(([rows, fieldData]) => {
            response.render('listaEmpleados', {
                empleados: rows,
                email: request.session.email ? request.session.email : '',
            })
        })
        .catch(err => console.log(err));
};