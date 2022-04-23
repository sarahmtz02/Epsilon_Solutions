const path = require('path');

// --- MAIN --- //

const Mentee = require('../models/mentee');


// MENTEES //

exports.get_nuevo_mentee = async (request, response, next) => {
    console.log('obtiene el método GET')
    const leadAsistants = await Mentee.getEmpleadosCLA()
    console.log(leadAsistants);
    const leadMember = await Mentee.getEmpleadosM()
    console.log(leadMember);
    response.render('nuevoMentee', {
        rol: request.session.idRol ? request.session.idRol : '',
        idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
        nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
        apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
        empleadosCLA: leadAsistants,
        empleadosM: leadMember,
        email: request.session.email ? request.session.email : '',
        }); 
    };
    



exports.post_nuevo_mentee = async (request, response, next) => { 
    let mentor = request.body.nombreCLA;
    let mentees = request.body.nombreM
    console.log(mentor);
    console.log(mentees);
    let idmentor = await Mentee.getIdEmpleado(mentor);
    let idmentee = await Mentee.getIdEmpleado(mentees);
    console.log(idmentor);
    console.log(idmentee);
    console.log(idmentor[0].idEmpleado);
    console.log(idmentee[0].idEmpleado);
    const id1 = String(idmentor[0].idEmpleado);
    const id2 = String(idmentee[0].idEmpleado);
    console.log(id1);
    console.log(id2);
    //let isArray = Array.isArray(mentor);
    const mentee = new Mentee(id1, id2, request.body.descAsignacion);
    console.log('obtiene el método POST')
    mentee.save().then(() => {
        response.setHeader('Set-Cookie', 'ultimo_mentee='+mentee.nombre+'; HttpOnly', 'utf8');
        response.redirect('/dashboard')
    })
};