const path = require('path');

// --- MAIN --- //

const Cuestionario = require('../models/cuestionario');
const PreguntaRespuesta = require('../models/preguntarespuesta');
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
                cuestionarios: rows,
                email: request.session.email ? request.session.email : '',
            })
        })
        .catch(err => console.log(err));
};

exports.getCuestionario = (request, response, next) => {
    console.log(request.params.idCuestionario);
    console.log(request.cookies);
    PreguntaRespuesta.fetchFeedback(request.params.idCuestionario)  // Por cada clase (lo verde) le pasas lo que arroja la función
        .then(([feedbacks, fieldData]) => {
            request.session.feedbacks = feedbacks;        // Aquí pasamos los datos del template como variable de sesión
            console.log(feedbacks);
            console.log('error no está aquí');

                Cuestionario.fetchOneCuestionario(request.params.idCuestionario).then(([cuestionarios, fieldData])=> {
                    //request.session.cuestionario = cuestionarios;
                    console.log(cuestionarios);
                    console.log('error no está aquí');

                    response.render('feedback', {
                        cuestionarios: cuestionarios,
                        feedbacks: feedbacks,
                        email: request.session.email ? request.session.email : '',
                    })
                }).catch(err => {
                    console.log(err);
                }); 
            
    }).catch(err => {
        console.log(err);
    });
}
