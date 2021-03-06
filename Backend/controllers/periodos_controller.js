const path = require('path');
const moment = require("moment-timezone"); // Para fechas

// --- MAIN --- //

const Periodo = require('../models/periodo');
moment.locale('es-mx');
// PERIODO EVALUACION //

exports.root = (request, response, next) => {
    const date = new Date();
    const currentDate = new Date(date.toDateString());
    Periodo.fetchAllPeriodos()
        .then(([rows, fieldData]) => {
            response.render('periodos', {
                periodos: rows,
                moment: moment,
                fecha: currentDate,
                email: request.session.email ? request.session.email : '',
                rol: request.session.idRol ? request.session.idRol : '',
                idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
                nivel_P: request.session.nPeople ? request.session.nPeople : '',
                nivel_C: request.session.nCraft ? request.session.nCraft : '',
                nivel_B: request.session.nBusiness ? request.session.nBusiness : '',
                nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
                apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
                warning_empalme : request.flash('warningE'),
                success : request.flash('success'),
            })
        })
        .catch(err => console.log(err));
};

exports.getEditPeriodo = async (request, response, next) => {
    const date = new Date();
    const currentDate = new Date(date.toDateString());
    Periodo.fetchOnePeriodo(request.params.idPeriodo)
        .then(([periodos, fieldData]) => {
            response.render('editPeriodo', {
                periodos: periodos,
                moment: moment,
                fecha: currentDate,
                email: request.session.email ? request.session.email : '',
                rol: request.session.idRol ? request.session.idRol : '',
                idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
                nivel_P: request.session.nPeople ? request.session.nPeople : '',
                nivel_C: request.session.nCraft ? request.session.nCraft : '',
                nivel_B: request.session.nBusiness ? request.session.nBusiness : '',
                nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
                apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
                warning_empalme : request.flash('warningE'),
            })
        })
        .catch(err => console.log(err));
}

exports.updatePeriodo = async (request, response, next) => {
    const fechaI = request.body.FechaInicio;
    const fechaF = request.body.FechaFin;
    const checkOlap = await Periodo.checkOverlapEdit(request.body.FechaInicio, request.body.FechaFin, request.params.idPeriodo);
    console.log(checkOlap);
    if (fechaF < fechaI) {
        request.flash('warningE', 'No se pudo modificar el periodo, la fecha final es menor a la inicial')
        console.log('true en fecha menor')
        response.redirect('/periodos')
    } else if (checkOlap == 0 || checkOlap == '') {
        await Periodo.editPeriodo(request.body.FechaInicio, request.body.FechaFin, request.params.idPeriodo).then(() => {
            request.flash('success', 'Se ha actualizado el periodo exitosamente')
            response.redirect('/periodos')
        })
    } else {
        request.flash('warningE', 'No se pudo modificar el periodo, existe un empalme')
        console.log('true en overlap')
        response.redirect('/periodos')
    }
}

exports.get_nuevo_periodo = (request, response, next) => {
    console.log('obtiene el m??todo GET')
    const date = new Date();
    const currentDate = new Date(date.toDateString());
    const currentPeriodo = Periodo.getPeriodo();
    console.log(currentDate);
    Periodo.fetchAllPeriodos()
        .then(([rows, fieldData]) => {
            response.render('nuevoPeriodo', {
                periodos: rows,
                fecha: currentDate,
                currentPeriodos: currentPeriodo,
                moment: moment,
                email: request.session.email ? request.session.email : '',
                rol: request.session.idRol ? request.session.idRol : '',
                idEmpleado: request.session.idEmpleado ? request.session.idEmpleado : '',
                nombreSesion: request.session.nombreSesion ? request.session.nombreSesion : '',
                apellidoPSesion: request.session.apellidoPSesion ? request.session.apellidoPSesion : '',
            })
        })
        .catch(err => console.log(err));
};

exports.post_nuevo_periodo = async (request, response, next) => {
    const fechaI = request.body.FechaInicio;
    const fechaF = request.body.FechaFin;
    const checkOlap = await Periodo.checkOverlapNew(request.body.FechaInicio, request.body.FechaFin);
    console.log(checkOlap);
    if (fechaF < fechaI) {
        request.flash('warningE', 'No se pudo crear el periodo, la fecha final es menor a la inicial')
        console.log('true en fecha menor')
        response.redirect('/periodos')
    } else if (checkOlap == 0 || checkOlap == '') {
        const periodo = new Periodo(request.body.FechaInicio, request.body.FechaFin);
        console.log('obtiene el m??todo POST')
        periodo.save().then(() => {
            request.flash('success', 'Se ha creado el periodo exitosamente')
            response.redirect('/periodos')
        }).catch(err => console.log(err));
    } else {
        request.flash('warningE', 'No se pudo agregar el periodo, existe un empalme')
        response.redirect('/periodos')
    }
};