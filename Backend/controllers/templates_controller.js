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
                warning : request.flash('warning'),
                success : request.flash('success'),
            })
        })
        .catch(err => console.log(err));
};

exports.postPregunta = async (request, response, next) => {

    const idP = await BancoPreguntas.getNewIdPreg();

    if (request.body.nuevapregunta == '') {
        request.flash('warning', 'La pregunta debe de llevar un encabezado!')
        response.redirect('/templates/template=' + request.params.idTemplate);
    } else {
        let newBP = new BancoPreguntas (request.params.idTemplate, idP, request.body.nuevapregunta, request.body.tipoPregunta);
    
        await newBP.save2();

        request.flash('success', 'Se ha añadido la pregunta con éxito')
        response.redirect('/templates/template=' + request.params.idTemplate);
    }
}

exports.deletePregunta = async (request, response, next) => {

    await BancoPreguntas.deletePregunta(request.params.idPregunta, request.body.idTemplate);

    request.flash('success', 'Se ha eliminado la pregunta con éxito')
    response.redirect('/templates/template=' + request.body.idTemplate);
}

exports.getEditPregunta = async (request, response, next) => {
    const tipoP = await BancoPreguntas.getTipoPregunta(request.params.idPregunta);
    console.log(tipoP[0].tipoPregunta);
    Preguntas.fetchOnePregunta(request.params.idPregunta).then(([preguntas, fieldData])=> {
        response.render('editPregunta', {
            tipoPregunta: tipoP[0].tipoPregunta,
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

    if (request.body.descPregunta == '') {
        request.flash('warning', 'La pregunta debe de llevar un encabezado!')
        response.redirect('/templates/template=' + idTemp);
    } else {
        await Preguntas.updatePregunta(request.body.descPregunta, request.params.idPregunta, request.body.tipoPregunta);

        request.flash('success', 'Se ha actualizado la pregunta con éxito')
        response.redirect('/templates/template=' + idTemp);
    }
}

// Para edición:

exports.getEditTemplate = (request, response, next) => {

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

exports.getTemplate = async (request, response, next) => {

    const templatePreguntas = await BancoPreguntas.fetchPreguntasBanco(request.params.idTemplate);
    console.log(templatePreguntas);
    Template.fetchOneTemplate(request.params.idTemplate)  // Por cada clase (lo verde) le pasas lo que arroja la función
        .then(([templates, fieldData]) => {
            request.session.templates = templates;        // Aquí pasamos los datos del template como variable de sesión
            console.log(templates);

            Preguntas.fetchAllPreguntas().then(([preguntas, fieldData]) => {
                request.session.preguntas = preguntas;    // Aquí los de preguntas
                console.log(preguntas);
                    response.render('currentTemplate', { // En la clases donde haces render pasas las variables de sesión, así ya se puede acceder a ellas en el .ejs
                        
                        templatePreguntas: templatePreguntas,
                        templates: templates,
                        preguntas: preguntas,
                        email: request.session.email ? request.session.email : '',
                        rol: request.session.idRol ? request.session.idRol : '',
                        idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
                        nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
                        apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
                        warning : request.flash('warning'),
                        success : request.flash('success'),
                    })
            })
        }).catch(err => {
            console.log(err);
        }); 
}


// Para guardar las preguntas en la Template:

exports.writePreguntas = async (request, response, next) => {

    let preguntas = request.session.preguntas;
    var total = preguntas.length;
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