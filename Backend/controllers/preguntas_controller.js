const path = require('path');
// --- MAIN --- //
const Preguntas = require('../models/pregunta');


exports.listadoPreguntas = (request, response, next) => {
    Preguntas.fetchAllPreguntas(request.params.idTemplate)
        .then(([rows, fieldData]) => {
            response.render('listaPreguntas', {
                Preguntas: rows,
                descPregunta: request.session.descPregunta ? request.session.descPregunta : '',
            })
        })
        .catch(err => console.log(err));
};