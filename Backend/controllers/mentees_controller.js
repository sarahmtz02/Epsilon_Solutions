const path = require('path');
const moment = require("moment-timezone"); // Para fechas

// --- MAIN --- //

const Mentee = require('../models/mentee');

// MENTEES //

exports.get_nuevo_mentee = (request, response, next) => {
    console.log('obtiene el método GET')
    Mentee.fetchAllMentees()
        .then(([rows, fieldData]) => {
            response.render('nuevoMentee', {
                empleados: rows,
                email: request.session.email ? request.session.email : '',
            })
        })
        .catch(err => console.log(err));
};

exports.insertMentee = async (request, response, next) => {    
    const mentorId = await Mentee.getIdMentor(request.body.nomMentor);
    console.log(mentorId);
    const mentoradoId = await Mentee.getIdMentorado(request.body.nomMentorado)
    console.log(mentoradoId);
    const periodo = await Mentee.getPeriodo();
    console.log(periodo);
    console.log(request.body.descAsignacion)
    const mentee = new Mentee(mentorId, mentoradoId, request.body.descAsignacion, periodo);
    mentee.save().then(() => {
        request.flash('success', 'Se ha asignado al empleado exitosamente')
        response.redirect('/mentees/panelMentees')

    }).catch(err => console.log(err));
};

exports.fetchMentees = async (request, response, next) => {
    const periodo = await Mentee.getPeriodo();

    Mentee.getMentores(request.session.idEmpleado).then(([mentores, fielData]) => {
        

        Mentee.getEmpleados(request.session.idEmpleado).then(([empleados, fieldData]) => {
            

            Mentee.fetchAllMentees().then(([dataMentees, fielData]) => {
                
                response.render('panelMentees', {
                    periodo: periodo, 
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