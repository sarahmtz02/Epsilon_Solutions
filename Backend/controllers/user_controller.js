const User = require('../models/user');
const bcrypt = require('bcryptjs');
const Mentees = require('../models/mentees');
const Evaluador = require('../models/evaluador');

exports.get_login = (request, response, next) => {
    console.log('Datos jalados')
    response.render('login', {
        email: request.session.email ? request.session.email : '',
        info: ''
    }); 
};

exports.dashboard = (request, response, next) => {
    console.log('dashboard');
    response.render('index', {
        email: request.session.email ? request.session.email : '',
        info: ''
    }); 
};

exports.login = (request, response, next) => {
    console.log('Enviados')
    User.findOne(request.body.email)
        .then(([rows, fielData])=>{
            
            //Si no existe el usuario, redirige a la pantalla de login
            if (rows.length < 1) {
                return response.redirect('/users/login');
            }

            const user = new User(rows[0].nombre, rows[0].email, rows[0].password);
            bcrypt.compare(request.body.password, user.password).then(doMatch => {
                    if (doMatch) {
                        request.session.isLoggedIn = true;
                        request.session.user = user;
                        request.session.email = user.email;
                        console.log('success')
                        return request.session.save(err => {
                            response.redirect('./dashboard');
                            console.log('success redirect')
                        });
                    }
                    console.log('no match')
                    response.redirect('/users/login');
                }).catch(err => {
                    response.redirect('/users/login');
                });
        }).catch((error)=>{
            console.log(error)
        });
    
};

exports.logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/users/login'); //Este código se ejecuta cuando la sesión se elimina.
    });
};

exports.root = (request, response, next) => {
    response.redirect('/users/login'); 
};


exports.registrarMentees = (request, response, next) => {
    const mentees = new Mentees();
    mentees.save().then(() => {
        console.log('Datos enviados')
        
    }).catch((err) => {
        console.log(err);
    });
};

exports.registrarAsignacion = (request, response, next) => {
    const evaluador = new Evaluador();
    evaluador.save().then(() => {
        console.log('Datos enviados')
        
    }).catch((err) => {
        console.log(err);
    });
};