const path = require('path');

exports.dashboard = (request, response, next) => {
    console.log('Ruta /dashboard');
    //console.log(request.get('Cookie').split('=')[1]);
    response.render('index', {
        email: request.session.email ? request.session.email : '',
        nPeople: request.session.nPeople ? request.session.nPeople : '',
        nCraft: request.session.nCraft ? request.session.nCraft : '',
        nBusiness: request.session.nBusiness ? request.session.nBusiness : '',
        nOverall: request.session.nOverall ? request.session.nOverall : '',
    });
}