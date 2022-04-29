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

<<<<<<< HEAD
exports.postPregunta = async (request, response, next) => {

    const idP = await BancoPreguntas.getNewIdPreg();
=======
exports.post_preguntas = async (request, response, next) => {
    console.log('obtiene el método POST');
    console.log(request.params.idTemplate);
    console.log(request.body);
    console.log(request.body.nuevapregunta);
    const idP = await BancoPreguntas.getNewIdPreg();
    console.log(idP)
    console.log(request.body.tipoPregunta)
>>>>>>> a040aa970b39f7b3ed75f4332eadc21f9b32756f

    if (request.body.nuevapregunta == '') {
        request.flash('warning', 'La pregunta debe de llevar un encabezado!')
        response.redirect('/templates/listaTemplates');
    } else {
        let newBP = new BancoPreguntas (request.params.idTemplate, idP, request.body.nuevapregunta, request.body.tipoPregunta);
    
        await newBP.save2();

        request.flash('success', 'Se ha añadido la pregunta con éxito')
        response.redirect('/templates/listaTemplates');
    }
}

<<<<<<< HEAD
exports.deletePregunta = async (request, response, next) => {
=======
exports.delete_pregunta = async (request, response, next) => {
    console.log('DELETE');
    console.log(request.body.idTemplate)
    console.log(request.params.idPregunta);
>>>>>>> a040aa970b39f7b3ed75f4332eadc21f9b32756f

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
<<<<<<< HEAD
=======
    console.log(request.params.idPregunta);
    console.log(request.body.descPregunta);
    console.log(request.body.tipoPregunta)
>>>>>>> a040aa970b39f7b3ed75f4332eadc21f9b32756f

    if (request.body.descPregunta == '') {
        request.flash('warning', 'La pregunta debe de llevar un encabezado!')
        response.redirect('/templates/listaTemplates');
    } else {
        await Preguntas.updatePregunta(request.body.descPregunta, request.params.idPregunta, request.body.tipoPregunta);

        request.flash('success', 'Se ha actualizado la pregunta con éxito')
        response.redirect('/templates/listaTemplates');
    }
}

// Para edición:

exports.getEditTemplate = (request, response, next) => {
<<<<<<< HEAD

=======
    console.log(request.params.idTemplate);
    console.log(request.cookies);
>>>>>>> a040aa970b39f7b3ed75f4332eadc21f9b32756f
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
<<<<<<< HEAD

=======
    console.log('obtiene el método GET');
    console.log(request.params.idTemplate);
    console.log(request.cookies);
>>>>>>> a040aa970b39f7b3ed75f4332eadc21f9b32756f
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
                    })
            })
        }).catch(err => {
            console.log(err);
        }); 
}


// Para guardar las preguntas en la Template:

exports.writePreguntas = async (request, response, next) => {

<<<<<<< HEAD
    let preguntas = request.session.preguntas;
    var total = preguntas.length;
=======
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

>>>>>>> a040aa970b39f7b3ed75f4332eadc21f9b32756f
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