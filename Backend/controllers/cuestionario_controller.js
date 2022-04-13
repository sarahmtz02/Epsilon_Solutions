const path = require('path');

// --- MAIN --- //

const Cuestionario = require('../models/cuestionario')
const Template = require('../models/templates');
const Preguntas = require('../models/pregunta');
const BancoPreguntas = require('../models/bancopreguntas');

// Para visualizar los cuestionarios a contestar:

exports.getMyCuestionarios = (request, response, next) => {
    console.log(request.session.idEmpleado);
    console.log(request.cookies);
    Cuestionario.fetchMyCuestionarios(request.session.idEmpleado)
        .then(([rows, fieldData]) => {
            response.render('evaluaciones', {
                evaluaciones: rows,
                email: request.session.email ? request.session.email : '',
            })
        })
        .catch(err => console.log(err));
};
