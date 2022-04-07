const path = require('path');

// --- MAIN --- //

const Templates = require('../models/templates');

// TEMPLATES //

exports.templates = (request, response, next) => {
    Templates.fetchAllTemplates()
        .then(([rows, fieldData]) => {
            response.render('templates', {
                templates: rows,
                email: request.session.email ? request.session.email : '',
            })
        })
        .catch(err => console.log(err));
};

exports.get_nueva_template = (request, response, next) => {
    console.log('obtiene el método GET')
    Templates.fetchAllTemplates()
        .then(([rows, fieldData]) => {
            response.render('nuevaTemplate', {
                templates: rows,
                email: request.session.email ? request.session.email : '',
            })
        })
        .catch(err => console.log(err));
};

exports.post_nueva_template = (request, response, next) => {    
    const templates = new Templates(request.body.NombreTemplate);
    console.log('obtiene el método POST')
    templates.save().then(() => {
        response.setHeader('Set-Cookie', 'ultimo_periodo='+templates.nombre+'; HttpOnly', 'utf8');
        response.render()
    }).catch(err => console.log(err));
};