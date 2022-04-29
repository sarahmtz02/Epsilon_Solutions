const path = require('path');
const moment = require("moment-timezone"); // Para fechas

// --- MAIN --- //

const Mentee = require('../models/mentee');
const Observacion = require('../models/observacion');

// MENTEES //

<<<<<<< HEAD
// Método para inserción de mentee
exports.insertMentee = async (request, response, next) => {    
    const mentorId = await Mentee.getIdEmpleado(request.body.nomMentor);
    const mentoradoId = await Mentee.getIdEmpleado(request.body.nomMentorado)
    const periodo = await Mentee.getPeriodo();
=======
exports.insertMentee = async (request, response, next) => {    
    const mentorId = await Mentee.getIdEmpleado(request.body.nomMentor);
    console.log(mentorId);
    const mentoradoId = await Mentee.getIdEmpleado(request.body.nomMentorado)
    console.log(mentoradoId);
    const periodo = await Mentee.getPeriodo();
    console.log(periodo);
    console.log(request.body.descAsignacion)
>>>>>>> a040aa970b39f7b3ed75f4332eadc21f9b32756f
    const mentee = new Mentee(mentorId, mentoradoId, request.body.descAsignacion, periodo, request.body.fechaAsig);
    mentee.save().then(() => {
        request.flash('success', 'Se ha asignado al empleado exitosamente')
        response.redirect('/mentees/panelMentees')

    }).catch(err => console.log(err));
};

<<<<<<< HEAD
// Método para obtener datos de la tablas Mentees
=======
>>>>>>> a040aa970b39f7b3ed75f4332eadc21f9b32756f
exports.fetchMentees = async (request, response, next) => {
    const periodo = await Mentee.getPeriodo();
    const date = new Date();
    const currentDate = new Date(date.toDateString());

<<<<<<< HEAD
    //Obtiene los mentores
    Mentee.getMentores(request.session.idEmpleado).then(([mentores, fielData]) => {
        //Obtiene los mentorados
        Mentee.getEmpleados(request.session.idEmpleado).then(([empleados, fieldData]) => {
                //Obtiene los datos generales de la tabla
=======
    Mentee.getMentores(request.session.idEmpleado).then(([mentores, fielData]) => {
        
        Mentee.getEmpleados(request.session.idEmpleado).then(([empleados, fieldData]) => {
            
>>>>>>> a040aa970b39f7b3ed75f4332eadc21f9b32756f
                Mentee.fetchAllMentees().then(([dataMentees, fielData]) => {
                    
                    response.render('panelMentees', {
                        periodo: periodo,
                        fecha: currentDate, 
                        mentores: mentores,
                        empleados: empleados,
                        dataMentees: dataMentees,
                        rol: request.session.idRol ? request.session.idRol : '',
                        idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
                        nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
                        apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
                        email: request.session.email ? request.session.email : '',
                        moment: moment,
                        warning : request.flash('warning'),
                        success : request.flash('success'),
                    })
                }).catch(err => {
                    console.log(err);
                }); 
        })
    })
}

<<<<<<< HEAD
// Método para obtener los mentorados de un mentee
=======
>>>>>>> a040aa970b39f7b3ed75f4332eadc21f9b32756f
exports.getMentorados = async (request, response, next) => {
    const periodo = await Mentee.getPeriodo();

    Mentee.getMentorados(request.session.idEmpleado).then(([mentorados, fieldData]) => {

        response.render('misMentorados', {
            periodo: periodo,
            mentorados: mentorados,
            rol: request.session.idRol ? request.session.idRol : '',
            idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
            nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
            apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
            email: request.session.email ? request.session.email : '',
            moment: moment,
            warning : request.flash('warning'),
            success : request.flash('success'),
        })
    }).catch(err => {
        console.log(err);
    }); 
}

<<<<<<< HEAD
// Método para obtener las evaluaciones del mentorado
=======
>>>>>>> a040aa970b39f7b3ed75f4332eadc21f9b32756f
exports.getEvalMentorado = async (request, response, next) => {
    const periodo = await Mentee.getPeriodo();
    
    Mentee.getCuestMentorado(request.params.idMentorado, periodo).then(([cuestMentees, fieldData]) => {

        response.render('mentee', {
            periodo: periodo,
            cuestMentees: cuestMentees,
            rol: request.session.idRol ? request.session.idRol : '',
            idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
            nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
            apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
            email: request.session.email ? request.session.email : '',
            moment: moment,
        })
    }).catch(err => {
        console.log(err);
    }); 
}

<<<<<<< HEAD
// Método para obtener las respuestas de las evaluaciones del mentorado
=======
>>>>>>> a040aa970b39f7b3ed75f4332eadc21f9b32756f
exports.getResCuest = async (request, response, next) => {
    const idEvaluador = await Mentee.getIdEvaluador(request.params.idCuestionario);
    const idEvaluado = await Mentee.getIdEvaluado(request.params.idCuestionario);

    // Ojo que este método selecciona el periodo más reciente (en el que se está evaluando)
    const periodo = await Mentee.getPeriodo();

    // Para el nombre del evaluador
    Mentee.getNombreEmpleado(idEvaluador).then(([nombreEs, fieldData]) => {

        Mentee.getNombreEmpleado(idEvaluado).then(([nombreMs, fieldData]) => {
<<<<<<< HEAD

=======
            console.log(request.params.idCuestionario)
>>>>>>> a040aa970b39f7b3ed75f4332eadc21f9b32756f
            Mentee.getAnsCuest(request.params.idCuestionario).then(([answers, fieldData]) => {
                console.log(answers);
                response.render('evalMentee', {
                    answers: answers,
                    idEvaluador: idEvaluador,
                    idEvaluado: idEvaluado,
                    periodo: periodo,
                    nombreEs: nombreEs,
                    nombreMs: nombreMs,
                    rol: request.session.idRol ? request.session.idRol : '',
                    idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
                    nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
                    apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
                    email: request.session.email ? request.session.email : '',
                    moment: moment,
                })
            })
        }).catch(err => {
            console.log(err);
        }); 
    })
}

<<<<<<< HEAD
// Método para insertar una nueva observación
=======
>>>>>>> a040aa970b39f7b3ed75f4332eadc21f9b32756f
exports.nuevaObservacion = async (request, response, next) => {
    let newObv = new Observacion (request.body.fk_idEvaluado, request.session.idEmpleado, 
        request.body.fk_idPeriodo, request.body.descObservacion);

    await newObv.nuevaObservacion().then(() => {
        request.flash('success', 'Se ha registrado la observación exitosamente')
        response.redirect('/mentees/misMentorados')
    })
    
}

<<<<<<< HEAD
// Método para obtener las observaciones del mentee en sesión
exports.misObservaciones = async (request, response, next) => {

    Observacion.getObservaciones(request.session.idEmpleado, request.params.idMentorado).then(([observaciones, fieldData]) => {
=======
exports.misObservaciones = async (request, response, next) => {

    Observacion.getObservaciones(request.session.idEmpleado, request.params.idMentorado).then(([observaciones, fieldData]) => {
        console.log(observaciones);
>>>>>>> a040aa970b39f7b3ed75f4332eadc21f9b32756f
        response.render('misObservaciones', {
            observaciones: observaciones,
            rol: request.session.idRol ? request.session.idRol : '',
            idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
            nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
            apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
            email: request.session.email ? request.session.email : '',
            moment: moment,
        })
    }).catch(err => {
        console.log(err);
    }); 
}

<<<<<<< HEAD
// Método para eliminar una observación
exports.deleteObservacion = async (request, response, next) => {
=======
exports.deleteObservacion = async (request, response, next) => {
    console.log('DELETE');
>>>>>>> a040aa970b39f7b3ed75f4332eadc21f9b32756f

    await Observacion.deleteObservacion(request.body.idObservacion);

    request.flash('success', 'Se ha eliminado la observación exitosamente')
    response.redirect('/mentees/misMentorados')
}

<<<<<<< HEAD
// Método para selecciona una observación (para editarla)
exports.getOneObservacion = async (request, response, next) => {
=======
exports.getOneObservacion = async (request, response, next) => {
    console.log('GET FOR EDIT');
>>>>>>> a040aa970b39f7b3ed75f4332eadc21f9b32756f

    Observacion.getOneObservacion(request.params.idObservacion).then(([observaciones, fieldData]) => {
        response.render('editObservacion', {
            observaciones: observaciones,
            rol: request.session.idRol ? request.session.idRol : '',
            idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
            nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
            apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
            email: request.session.email ? request.session.email : '',
            moment: moment,
        })
    }).catch(err => {
        console.log(err);
    }); 
}

<<<<<<< HEAD
// Método para modificar una observación
exports.updateObservacion = async (request, response, next) => {
=======
exports.updateObservacion = async (request, response, next) => {
    console.log(request.params.idObservacion);
    console.log(request.body.descObservacion)
>>>>>>> a040aa970b39f7b3ed75f4332eadc21f9b32756f

    await Observacion.updateObservacion(request.body.descObservacion, request.params.idObservacion).then(() => {
        request.flash('success', 'Se ha actualizado la observación exitosamente')
        response.redirect('/mentees/misMentorados')
    })
}

<<<<<<< HEAD
// Método para eliminar una asignación de mentorado
=======
>>>>>>> a040aa970b39f7b3ed75f4332eadc21f9b32756f
exports.deleteAsig = async (request, response, next) => {

    await Mentee.deleteAsig(request.params.idMentees).then(() => {
        request.flash('success', 'Se ha eliminado la asignación exitosamente')
        response.redirect('/mentees/panelMentees')
    })
}