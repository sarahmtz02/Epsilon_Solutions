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
                    console.log('fk_idTemplate');
                    request.params.fk_idTemplate = cuestionarios[0].fk_idTemplate;
                    console.log(request.params.fk_idTemplate);

                    BancoPreguntas.fetchBancoP(request.params.fk_idTemplate).then(([bancoP, fieldData])=> {
                        console.log(bancoP);
                        console.log('error no está aquí');

                        response.render('feedback', {
                            cuestionarios: cuestionarios,
                            feedbacks: feedbacks,
                            bancoP: bancoP,
                            email: request.session.email ? request.session.email : '',
                        })
                    })

                    
                }).catch(err => {
                    console.log(err);
                }); 
            
    }).catch(err => {
        console.log(err);
    });
}


exports.writeFeedback = async (request, response, next) => {

    console.log('Guardar preguntas en Template');
    console.log(request.body);

    let feedbacks = request.session.feedbacks;
    console.log(request.params.idCuestionario)
    console.log('Prueba')
    var total = feedbacks.length;
    console.log(feedbacks.length);

    //Para obtener los ids de cada pregunta
    /* Recorro cada cuestinario para obtener sus ids preguntas y los guardo en 
        un array
    */

    var idP = [];

    for (i = 0; i < feedbacks.length; i++ ) {
        idP.push(feedbacks[i].idPregunta);
    }

    var preguntas = [];

    for (i = 0; i < feedbacks.length; i++ ) {
        preguntas.push(feedbacks[i].Pregunta);
    }

    var respuestas = [];
    for (i = 1; i <= feedbacks.length; i++ ) {
        respuestas.push(request.body[i]);
    }

    console.log(respuestas)

    try {
        //Ciclo for para realizar insert de preguntas y respuestas
        for (i = 0; i < total; i++ ) {
            let res = new PreguntaRespuesta (request.params.idCuestionario, request.params.fk_idTemplate, idP[i], preguntas[i], respuestas[i])
            await res.save();
        }
        console.log('success?')
        response.redirect('/empleados/evaluaciones');

    } catch(error) {
        console.log(error)
    }
}
