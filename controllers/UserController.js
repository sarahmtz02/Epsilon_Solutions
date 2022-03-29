const User = require('../models/Users');

exports.get_login =  (request, response, next) => {
    const user = request.session.usuario ? request.session.usuario : '';
    console.log(request.session.usuario);
    response.render('login', {
        user: user
    });
};

exports.login =  (request, response, next) => {
    if (User.login(request.body.nombre, request.body.passwd)) {
        request.session.usuario = request.body.nombre;
        response.redirect('/Home');
    } else {
        response.redirect('/login');
    }
};
exports.logout =  (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/login'); //Este código se ejecuta cuando la sesión se elimina.
    });
};
