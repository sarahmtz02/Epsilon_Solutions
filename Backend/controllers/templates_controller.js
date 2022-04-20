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

exports.getEditTemplate = (request, response, next) => {
    console.log(request.params.idTemplate);
    console.log(request.cookies);
    Template.fetchOneTemplate(request.params.idTemplate)
        .then(([rows, fieldData]) => {
            console.log(rows);
            const templates = rows;
            console.log(templates);
            Preguntas.fetchAllPreguntas().then(([rows])=> {
                response.render('editarTemplate', {
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

exports.getTemplate = (request, response, next) => {
    console.log(request.params.idTemplate);
    console.log(request.cookies);
    Template.fetchOneTemplate(request.params.idTemplate)  // Por cada clase (lo verde) le pasas lo que arroja la función
        .then(([templates, fieldData]) => {
            request.session.templates = templates;        // Aquí pasamos los datos del template como variable de sesión
            console.log(templates);

            Preguntas.fetchAllPreguntas().then(([preguntas, fieldData]) => {
                request.session.preguntas = preguntas;    // Aquí los de preguntas
                console.log(preguntas);

                BancoPreguntas.fetchPreguntasBanco(request.params.idTemplate).then(([bancopreguntas, fieldData])=> {
                    response.render('editarTemplate', { // En la clases donde haces render pasas las variables de sesión, así ya se puede acceder a ellas en el .ejs
                        
                        bancopreguntas: bancopreguntas,
                        templates: templates,
                        preguntas: preguntas,
                        email: request.session.email ? request.session.email : '',

                    })
                }).catch(err => {
                    console.log(err);
                }); 
            })
        }).catch(err => {
            console.log(err);
        }); 
}


// Para guardar las preguntas en la Template:

exports.writePreguntas = async (request, response, next) => {

    console.log('Guardar preguntas en Template');
    console.log(request.body);

    let preguntas = request.session.preguntas;
    console.log(request.params.idTemplate)
    console.log('Prueba')
    console.log(request.session.preguntas);
    var total = preguntas.length;
    console.log(preguntas.length);

    //Para obtener los ids de cada pregunta
    /* Recorro cada cuestinario para obtener sus ids preguntas y los guardo en 
        un array
    */

    var idP = [];

    for (i = 0; i < preguntas.length; i++ ) {
        idP.push(preguntas[i].idPregunta);
    }

    console.log(idP);

    try {
        //Ciclo for para realizar insert de preguntas y respuestas
        for (i = 0; i < total; i++ ) {
            let res = new BancoPreguntas (request.params.idTemplate, idP[i])
            await res.save();
        }
        response.redirect('/listaTemplates');

    } catch(error) {
        console.log(error)
    }
}  