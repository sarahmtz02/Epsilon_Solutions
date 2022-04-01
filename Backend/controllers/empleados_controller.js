const path = require('path');
// --- MAIN --- //
const Empleados = require('../models/empleados');

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