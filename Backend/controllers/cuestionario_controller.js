const path = require('path');
const moment = require("moment-timezone"); // Para fechas
const res = require('express/lib/response');

// --- MAIN --- //

const Cuestionario = require('../models/cuestionario');
const PreguntaRespuesta = require('../models/preguntarespuesta');
const BancoPreguntas = require('../models/bancopreguntas');

// Para traer todos los datos de los cuestionarios que le toca contestar al empleado en sesión

exports.fetchCuestionarios = async (request, response, next) => {
    const date = new Date();
    const currentDate = new Date(date.toDateString());
    const periodo = await Cuestionario.getPeriodo();
    console.log(periodo)
    const cuestionarios = await Cuestionario.fetchMyCuestionarios(request.session.idEmpleado);
    const requests = await Cuestionario.getMyRequests(request.session.idEmpleado);
    console.log(requests)
    request.session.requests = requests.length;
    
    Cuestionario.getEmpleados(request.session.idEmpleado).then(([empleados, fieldData]) => {
        response.render('evaluaciones', {
            fecha: currentDate,
            cuestionarios: cuestionarios,
            periodos: periodo,
            requests: requests,
            rol: request.session.idRol ? request.session.idRol : '',
            periodo: request.body.periodo ? request.body.periodo : '',
            idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
            nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
            apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
            nOverall: request.session.nOverall ? request.session.nOverall : '',
            empleados: empleados,
            moment: moment,
            email: request.session.email ? request.session.email : '',
        })
    }).catch(err => {
        console.log(err);
    }); 
}

// Para asignar evaluadores y generar sus respectivos cuestionarios y tablas donde se van a registrar las respuestas

exports.nuevoCuestionario = async (request,response,next) => {
    console.log(request.body);
    let evaluadores = request.body.nombre;
    console.log(evaluadores);
    let numRequests = request.session.requests;
    console.log(numRequests);
    let isArray = Array.isArray(evaluadores);
    console.log(request.body.periodo);
    console.log(request.session.idEmpleado);
    console.log(request.session.nOverall);
    //let str = typeof evaluadores === 'string';
    /*
    if (lvlEv <= 1.6 && lvlEv >= 1.1) {
        request.params.idTemplate = 1;
    } else if (lvlEv <= 2.6 && lvlEv >= 2.1) { 
        request.params.idTemplate = 2;
    }*/
    // ...etc
    //console.log(request.params.idTemplate);

    if (isArray && ((numRequests + evaluadores.length) <= 5)) {

        for await (let evaluador of evaluadores ) {
            // Proceso para crear un nuevo cuestionario: //
            const evaluadorId = await Cuestionario.getIdEvaluador(evaluador);
            const cuestId = await Cuestionario.getNewIdC(); //Para obtener el id del nuevo cuestionario = ultid+1
            const preguntasData = await Cuestionario.getPreguntas(1);
            console.log(cuestId[0][0]);

            if (cuestId[0][0].nuevoIdCuest == null){
                cuestId[0][0].nuevoIdCuest == 1;
            }
            console.log(cuestId[0][0].nuevoIdCuest);
            let idP = []

            for (let i = 0; i < preguntasData.length; i++){
                idP.push(preguntasData[i].fk_idPregunta)
            }
            console.log(idP);

            console.log(cuestId[0][0].nuevoIdCuest)
            
            console.log(evaluadorId[0].idEmpleado);
            const req = new Cuestionario(request.body.periodo, 1, evaluadorId[0].idEmpleado, request.session.idEmpleado,
                request.session.nOverall);

            req.save();
            
            //Una vez se guarda el nuevo cuestionario se debe llamar al procedure que crea su registro para sacar los datos de preguntas y respuestas
            console.log('success save en cuestionarios');
            console.log(cuestId[0][0].nuevoIdCuest);

            const Bp = await Cuestionario.totalPreguntas(1);
            console.log(Bp);
            
            for (let i = 0; i < Bp; i++) {
                console.log('iteration')
                await Cuestionario.insertIntoPR(cuestId[0][0].nuevoIdCuest, idP[i]);
                await Cuestionario.fillPregRes(cuestId[0][0].nuevoIdCuest);
                
            }
            
        }
    } else {
        console.log('error');
    }
    response.redirect('/evaluaciones')
}

// Para obtener los datos generales del cuestionario seleccionado

exports.getCuestionario = (request, response, next) => {
    console.log(request.params.idCuestionario);
    console.log(request.cookies);
    PreguntaRespuesta.fetchFeedback(request.params.idCuestionario)  
        .then(([feedbacks, fieldData]) => {
            request.session.feedbacks = feedbacks;        
            console.log(feedbacks);
            console.log('error no está aquí');

                Cuestionario.fetchOneCuestionario(request.params.idCuestionario).then(([cuestionarios, fieldData])=> {
                    
                    console.log(cuestionarios);
                    console.log('fk_idTemplate');
                    request.params.fk_idTemplate = cuestionarios[0].fk_idTemplate;
                    request.params.idEvaluado = cuestionarios[0].idEvaluado;
                    console.log(request.params.fk_idTemplate);

                    Cuestionario.fetchCuestionarioData(request.params.idEvaluado).then(([datosEmpleados, fieldData])=> {
                        console.log(datosEmpleados)

                        BancoPreguntas.fetchBancoP(request.params.fk_idTemplate).then(([bancoP, fieldData])=> {
                            console.log(bancoP);
                            console.log('error no está aquí');

                            response.render('feedback', {
                                cuestionarios: cuestionarios,
                                datosEmpleados: datosEmpleados,
                                rol: request.session.idRol ? request.session.idRol : '',
                                periodo: request.body.periodo ? request.body.periodo : '',
                                idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
                                nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
                                apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
                                feedbacks: feedbacks,
                                bancoP: bancoP,
                                email: request.session.email ? request.session.email : '',
                            })
                        })

                    
                }).catch(err => {
                    console.log(err);
                }); 
            })
    }).catch(err => {
        console.log(err);
    });
}

// Para contestar las preguntas del cuestionario seleccionado

exports.writeFeedback = async (request, response, next) => {

    console.log('Guardar preguntas en Template');
    console.log(request.body);
    let feedbacks = request.session.feedbacks;
    const idTemp = await Cuestionario.getCurrentTempC(request.params.idCuestionario);
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
    console.log(idP);
    var preguntas = [];

    for (i = 0; i < feedbacks.length; i++ ) {
        preguntas.push(feedbacks[i].Pregunta);
    }
    console.log(preguntas);
    var respuestas = [];
    for (i = 1; i <= feedbacks.length; i++ ) {
        respuestas.push(request.body[i]);
    }

    console.log(respuestas);

    console.log(idTemp);

    try {
        //Ciclo for para realizar insert de preguntas y respuestas
        for (i = 0; i < total; i++ ) {
            let res = new PreguntaRespuesta (request.params.idCuestionario, idTemp, idP[i], preguntas[i], respuestas[i])
            await res.saveAns();
        }
        console.log('success?')
        response.redirect('/empleados/evaluaciones');

    } catch(error) {
        console.log(error)
    }
}

exports.main = (request, response, next) => {
    let roles = [1, 2]; // roles autorizados
    response.render('index', { // mandamos su informacion al sidenav
        email: request.session.email ? request.session.email : '',
        rol: request.session.idRol ? request.session.idRol : '',
        roles_autorizados: roles,
        idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
        nivel_P: request.session.nPeople ? request.session.nPeople : '',
        nivel_C: request.session.nCraft ? request.session.nCraft : '',
        nivel_B: request.session.nBusiness ? request.session.nBusiness : '',
        nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
        apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',

    });
};
