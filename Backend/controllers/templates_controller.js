const path = require('path');

// --- MAIN --- //

const Template = require('../models/templates');
const Preguntas = require('../models/pregunta');
const BancoPreguntas = require('../models/bancopreguntas');

// TEMPLATES //

exports.listado = (request, response, next) => {
    Template.fetchAllTemplates()
        .then(([rows, fieldData]) => {
            response.render('listaTemplates', {
                templates: rows,
                email: request.session.email ? request.session.email : '',
                rol: request.session.idRol ? request.session.idRol : '',
                idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
                nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
                apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
                success : request.flash('success'),
            })
        })
        .catch(err => console.log(err));
};

exports.post_preguntas = async (request, response, next) => {
    console.log('obtiene el método POST');
    console.log(request.params.idTemplate);
    console.log(request.body);
    console.log(request.body.nuevapregunta);
    const idP = await BancoPreguntas.getNewIdPreg();
    console.log(idP)
    console.log(request.body.tipoPregunta)
    let newBP = new BancoPreguntas (request.params.idTemplate, idP, request.body.nuevapregunta, request.body.tipoPregunta);
    await newBP.save2();

    request.flash('success', 'Se ha añadido la pregunta con éxito')
    response.redirect('/templates/listaTemplates');
}

exports.delete_pregunta = async (request, response, next) => {
    console.log('DELETE');
    console.log(request.body.idTemplate)
    console.log(request.params.idPregunta);

    await BancoPreguntas.deletePregunta(request.params.idPregunta, request.body.idTemplate);

    request.flash('success', 'Se ha eliminado la pregunta con éxito')
    response.redirect('/templates/listaTemplates');
}

exports.getEditPregunta = async (request, response, next) => {
    const tipoP = BancoPreguntas.getTipoPregunta(request.params.idPregunta);
    Preguntas.fetchOnePregunta(request.params.idPregunta).then(([preguntas, fieldData])=> {
        response.render('editPregunta', {
            tipoPregunta: tipoP,
            preguntas: preguntas,
            email: request.session.email ? request.session.email : '',
            rol: request.session.idRol ? request.session.idRol : '',
            idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
            nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
            apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
            email: request.session.email ? request.session.email : '',
        });
    })
}

exports.updatePregunta = async (request, response) => {
    console.log(request.params.idPregunta);
    console.log(request.body.descPregunta);
    console.log(request.body.tipoPregunta)
    await Preguntas.updatePregunta(request.body.descPregunta, request.params.idPregunta, request.body.tipoPregunta);

    request.flash('success', 'Se ha actualizado la pregunta con éxito')
    response.redirect('/templates/listaTemplates');
}

// Para edición:

exports.getTemplate = (request, response, next) => {
    console.log(request.params.idTemplate);
    console.log(request.cookies);
    Template.fetchOneTemplate(request.params.idTemplate)
        .then(([rows, fieldData]) => {
            console.log(rows);
            const templates = rows;
            console.log(templates);
            Preguntas.fetchAllPreguntas().then(([rows])=> {
                response.render('template', {
                    preguntas: rows,
                    templates: templates,
                    email: request.session.email ? request.session.email : '',
                });
            })
        })
        .catch(err => {
            console.log(err);
        }); 
}
