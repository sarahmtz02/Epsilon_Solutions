const path = require('path');
const moment = require("moment-timezone"); // Para fechas

// --- MAIN --- //

const Empleado = require('../models/empleados');

exports.get_nuevo_empleado = (request, response, next) => {
    console.log('obtiene el método GET')
    const date = new Date();
    const currentDate = new Date(date.toDateString());
    Empleado.fetchAllEmpleados()
        .then(([rows, fieldData]) => {
            response.render('nuevoEmpleado', {
                currentDate: currentDate,
                moment: moment,
                empleados: rows,
                rol: request.session.idRol ? request.session.idRol : '',
                idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
                nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
                apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
                email: request.session.email ? request.session.email : '',
            })
        })
        .catch(err => console.log(err));
};

exports.post_nuevo_empleado = (request, response, next) => {    
    const empleado =
    new Empleado(request.body.fechaIng, request.body.nombre, request.body.apellidoP, request.body.apellidoM, request.body.antiguedad, request.body.nivPeople, 
        request.body.nivCraft, request.body.nivBusiness, request.body.nivOverall, request.body.puesto, request.body.equipo, 
        request.body.email, request.body.password, request.body.fk_idChapter, request.body.fk_idRolJer, request.body.isActive);
        console.log('obtiene el método POST')

    if (request.body.password == '') {
        request.flash('warning', 'Un empleado requiere de al menos un password y un email!');
        response.redirect('/lista');
    } else if (request.body.email == '') {
        request.flash('warning', 'Un empleado requiere de al menos un password y un email!');
        response.redirect('/lista');
    } else {
        empleado.save().then(() => {
            request.flash('success', 'Se ha creado el nuevo empleado exitosamente');
            response.redirect('/lista');
        }).catch(err => console.log(err));
    }
};

// Editar empleado:

exports.getEmpleado = (request, response, next) => {
    const date = new Date();
    Empleado.fetchOneEmpleado(request.params.idEmpleado)
        .then(([rows, fieldData]) => {
            //console.log(rows);
            response.render('empleado', {
                empleados: rows,
                currentDate: date,
                rol: request.session.idRol ? request.session.idRol : '',
                idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
                nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
                apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
                email: request.session.email ? request.session.email : '',
                ultimo_empleado: request.cookies.ultimo_empleado ? request.cookies.ultimo_empleado : '',
                moment: moment,
                warning : request.flash('warning'),
                success : request.flash('success'),
            }); 
        })
        .catch(err => {
            console.log(err);
        }); 
}

exports.updateEmpleado = async (request, response, next) => {

    await Empleado.updateEmpleado(request.params.idEmpleado, request.body.nombre, request.body.apellidoP, request.body.apellidoM, request.body.antiguedad, request.body.nivPeople, 
        request.body.nivCraft, request.body.nivBusiness, request.body.nivOverall, request.body.puesto, request.body.equipo, 
        request.body.email, request.body.fk_idChapter, request.body.fk_idRolJer);

    request.flash('success', 'Se han actualizado los datos del empleado exitosamente');
    response.redirect('/lista');
}

exports.bajaEmpleado = async (request, response, next) => {
    console.log(request.params.idEmpleado)
    await Empleado.bajaEmpleado(request.params.idEmpleado)
        request.flash('success', 'Se ha dado de baja al empleado exitosamente');
        response.redirect('/lista');
}

exports.getChangePassword = (request,response, next) => {
    const date = new Date();
    Empleado.fetchOneEmpleado(request.params.idEmpleado)
        .then(([rows, fieldData]) => {
            //console.log(rows);
            response.render('changePw', {
                empleados: rows,
                currentDate: date,
                rol: request.session.idRol ? request.session.idRol : '',
                idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
                nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
                apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
                email: request.session.email ? request.session.email : '',
                ultimo_empleado: request.cookies.ultimo_empleado ? request.cookies.ultimo_empleado : '',
                moment: moment
            }); 
        })
        .catch(err => {
            console.log(err);
        }); 
}

exports.postChangePassword = async (request, response, next) => {
    console.log(request.params.idEmpleado);
    await Empleado.changePassword(request.body.password, request.params.idEmpleado);
        request.flash('success', 'Se ha actualizado el password del empleado exitosamente');
        response.redirect('/id-empleado=' + request.params.idEmpleado);
}

//Listado

exports.listado = (request, response, next) => {
    Empleado.fetchAllEmpleados()
        .then(([rows, fieldData]) => {
            response.render('listaEmpleados', {
                empleados: rows,
                rol: request.session.idRol ? request.session.idRol : '',
                idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
                nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
                apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
                email: request.session.email ? request.session.email : '',
                warning : request.flash('warning'),
                success : request.flash('success'),
            })
        })
        .catch(err => console.log(err));
};