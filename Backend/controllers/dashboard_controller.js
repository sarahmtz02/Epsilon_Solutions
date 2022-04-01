const path = require('path');

exports.dashboard = (request, response, next) => {
    console.log('Ruta /dashboard');
    //console.log(request.get('Cookie').split('=')[1]);
    response.render('index', {
        email: request.session.email ? request.session.email : '',
    }); 
}