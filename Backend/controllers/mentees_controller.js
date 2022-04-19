const path = require('path');

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

exports.post_nuevo_mentee = (request, response, next) => {    
    const mentee = new Mentee(request.body.fk_idLead, request.body.idMentee, request.body.descAsignacion);
    console.log('obtiene el método POST')
    mentee.save().then(() => {
        response.setHeader('Set-Cookie', 'ultimo_mentee='+mentee.nombre+'; HttpOnly', 'utf8');
        response.redirect("/empleados/dashboard")
    }).catch(err => console.log(err));
};