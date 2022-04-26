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
            })
        })
        .catch(err => console.log(err));
};

exports.get_nueva_template = (request, response, next) => {
    console.log('obtiene el método GET')
        Preguntas.fetchAllPreguntas().then(([rows]) => {
            response.render('nuevaTemplate', {
                preguntas: rows,
                email: request.session.email ? request.session.email : '',
                })
            })
        .catch(err => console.log(err));
};

exports.post_nueva_template = (request, response, next) => {    
    const templates = new Template(request.body.NombreTemplate);
    console.log('obtiene el método POST');
    templates.save().then(() => {
            response.render();
        }).catch(err => console.log(err));
};

exports.post_preguntas = (request, response, next) => {
    const templates = new Template(request.body.NombreTemplate);
    const bancoP = new BancoPreguntas(request.body.fk_idTemplate, request.body.fk_idPregunta);
    console.log('obtiene el método POST');
    res = 0;
    templates.getTemplateId().then(([rows])=> {
        console.log(rows[0].idTemplate);
        const templateId = rows[0].idTemplate;
        bancoP.fk_idTemplate = templateId;
        bancoP.save().then(() => {
            response.render();
        }).catch(err => console.log(err));
    });
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
