const path = require('path');
const moment = require("moment-timezone"); // Para fechas

// --- MAIN --- //

const Mentee = require('../models/mentee');
const Observacion = require('../models/observacion');

// MENTEES //

// Método para inserción de mentee
exports.insertMentee = async (request, response, next) => {    
    const mentorId = await Mentee.getIdEmpleado(request.body.nomMentor);
    const mentoradoId = await Mentee.getIdEmpleado(request.body.nomMentorado)
    const periodo = await Mentee.getPeriodo();
    const checkExists = await Mentee.checkIfExists(mentorId, mentoradoId);
    console.log(checkExists);

    if (checkExists == null || checkExists == 0) {
        const mentee = new Mentee(mentorId, mentoradoId, request.body.descAsignacion, periodo, request.body.fechaAsig);
        mentee.save().then(() => {
            request.flash('success', 'Se ha asignado al empleado exitosamente')
            response.redirect('/mentees/panelMentees')
        }).catch(err => console.log(err));
    } else {
        request.flash('warning', 'Ya existe esa asignación')
        response.redirect('/mentees/panelMentees')
    }
};

// Método para obtener datos de la tablas Mentees
exports.fetchMentees = async (request, response, next) => {
    const periodo = await Mentee.getPeriodo();
    const date = new Date();
    const currentDate = new Date(date.toDateString());

    //Obtiene los mentores
    Mentee.getMentores().then(([mentores, fielData]) => {
        //Obtiene los mentorados
        Mentee.getEmpleados(request.session.idEmpleado).then(([empleados, fieldData]) => {
                //Obtiene los datos generales de la tabla
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

// Método para obtener los mentorados de un mentee
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

// Método para obtener las evaluaciones del mentorado
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

// Método para obtener las respuestas de las evaluaciones del mentorado
exports.getResCuest = async (request, response, next) => {
    const idEvaluador = await Mentee.getIdEvaluador(request.params.idCuestionario);
    const idEvaluado = await Mentee.getIdEvaluado(request.params.idCuestionario);

    // Ojo que este método selecciona el periodo más reciente (en el que se está evaluando)
    const periodo = await Mentee.getPeriodo();

    // Para el nombre del evaluador
    Mentee.getNombreEmpleado(idEvaluador).then(([nombreEs, fieldData]) => {

        Mentee.getNombreEmpleado(idEvaluado).then(([nombreMs, fieldData]) => {

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

// Método para insertar una nueva observación
exports.nuevaObservacion = async (request, response, next) => {
    let newObv = new Observacion (request.body.fk_idEvaluado, request.session.idEmpleado, 
        request.body.fk_idPeriodo, request.body.descObservacion);

    await newObv.nuevaObservacion().then(() => {
        request.flash('success', 'Se ha registrado la observación exitosamente')
        response.redirect('/mentees/misMentorados')
    })
    
}

// Método para obtener las observaciones del mentee en sesión
exports.misObservaciones = async (request, response, next) => {

    Observacion.getObservaciones(request.session.idEmpleado, request.params.idMentorado).then(([observaciones, fieldData]) => {
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

// Método para eliminar una observación
exports.deleteObservacion = async (request, response, next) => {

    await Observacion.deleteObservacion(request.body.idObservacion);

    request.flash('success', 'Se ha eliminado la observación exitosamente')
    response.redirect('/mentees/misMentorados')
}

// Método para selecciona una observación (para editarla)
exports.getOneObservacion = async (request, response, next) => {

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

// Método para modificar una observación
exports.updateObservacion = async (request, response, next) => {

    await Observacion.updateObservacion(request.body.descObservacion, request.params.idObservacion).then(() => {
        request.flash('success', 'Se ha actualizado la observación exitosamente')
        response.redirect('/mentees/misMentorados')
    })
}

// Método para eliminar una asignación de mentorado
exports.deleteAsig = async (request, response, next) => {

    await Mentee.deleteAsig(request.params.idMentees).then(() => {
        request.flash('success', 'Se ha eliminado la asignación exitosamente')
        response.redirect('/mentees/panelMentees')
    })
}
